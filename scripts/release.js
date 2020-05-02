// Borrowed and slightly adjusted from https://github.com/vuejs/vue-next/blob/master/scripts/release.js 💚

const args = require('minimist')(process.argv.slice(2));
const { readdirSync, writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const semver = require('semver');
const currentVersion = require('../package.json').version;
const { prompt } = require('enquirer');
const execa = require('execa');

const pre = semver.prerelease(currentVersion);
const preId = args.preid || pre ? pre[0] : 'alpha';
const isDryRun = args.dry;
const skipTests = args.skipTests;
const skipBuild = args.skipBuild;
const replaceScope = (n) => n.replace(/^@marvinrudolph\//, '');

const packageFolders = readdirSync(resolve(__dirname, '../packages')).filter(
  (p) => !p.endsWith('.ts') && !p.startsWith('.'),
);

const packageNames = packageFolders.map((p) => {
  const pkg = require(resolve(__dirname, `../packages/${p}/package.json`));
  return replaceScope(pkg.name);
});

const skippedPackages = [];

const versionIncrements = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease',
];

const inc = (i) => semver.inc(currentVersion, i, preId);
const bin = (name) => resolve(__dirname, '../node_modules/.bin/' + name);
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;
const getPkgRoot = (pkg) => resolve(__dirname, '../packages/' + pkg);
const step = (msg) => console.log(chalk.cyan(msg));

async function main() {
  let targetVersion = args._[0];

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements
        .map((i) => `${i} (${inc(i)})`)
        .concat(['custom']),
    });

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion,
        })
      ).version;
    } else {
      targetVersion = release.match(/\((.*)\)/)[1];
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(chalk.red(`invalid target version: ${targetVersion}`));
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  // run tests before release
  step('\nRunning tests...');
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache']);
    await run('yarn', ['test', '--runInBand']);
  } else {
    console.log(`(skipped)`);
  }

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...');
  updateVersions(targetVersion);

  // build all packages with types
  step('\nBuilding all packages...');
  /* if (!skipBuild && !isDryRun) {
    await run('yarn', ['build', '--release']);
    // test generated dts files
    step('\nVerifying type declarations...');
    await run(bin('tsd'));
  } else {
    console.log(`(skipped)`);
  } d*/

  // generate changelog
  await run(`yarn`, ['changelog']);

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
  if (stdout) {
    step('\nCommitting changes...');
    await runIfNotDry('git', ['add', '-A']);
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`]);
  } else {
    console.log('No changes to commit.');
  }

  // publish packages
  step('\nPublishing packages...');
  for (const pkg of packageFolders) {
    await publishPackage(pkg, targetVersion, runIfNotDry);
  }

  // push to GitHub
  step('\nPushing to GitHub...');
  await runIfNotDry('git', ['tag', `v${targetVersion}`]);
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await runIfNotDry('git', ['push']);

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`);
  }

  if (skippedPackages.length) {
    console.log(
      chalk.yellow(
        `The following packages are skipped and NOT published:\n- ${skippedPackages.join(
          '\n- ',
        )}`,
      ),
    );
  }
  console.log();
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(resolve(__dirname, '..'), version);
  // 2. update all packages
  packageFolders.forEach((p) => updatePackage(getPkgRoot(p), version));
}

function updatePackage(pkgRoot, version) {
  const pkgPath = resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  pkg.version = version;
  updateDeps(pkg, 'dependencies', version);
  updateDeps(pkg, 'peerDependencies', version);
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function updateDeps(pkg, depType, version) {
  const deps = pkg[depType];
  console.log(deps);
  if (!deps) return;

  Object.keys(deps).forEach((dep) => {
    if (
      dep === 'marvinrudolph' ||
      (dep.startsWith('@marvinrudolph') &&
        packageNames.includes(replaceScope(dep)))
    ) {
      console.log(
        chalk.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`),
      );
      deps[dep] = version;
    }
  });
}

async function publishPackage(pkgName, version) {
  if (skippedPackages.includes(pkgName)) {
    return;
  }
  const pkgRoot = getPkgRoot(pkgName);
  const pkgPath = resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  if (pkg.private) {
    return;
  }

  // for now (alpha/beta phase), every package except "vue" can be published as
  // `latest`, whereas "vue" will be published under the "next" tag.
  const releaseTag = pre ? pre[0] : null;

  // TODO use inferred release channel after official 3.0 release
  // const releaseTag = semver.prerelease(version)[0] || null

  step(`Publishing ${pkgName}...`);
  try {
    await runIfNotDry(
      'yarn',
      [
        'publish',
        '--new-version',
        version,
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ],
      {
        cwd: pkgRoot,
        stdio: 'pipe',
      },
    );
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`));
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`));
    } else {
      throw e;
    }
  }
}

main().catch((err) => {
  console.error(err);
});
