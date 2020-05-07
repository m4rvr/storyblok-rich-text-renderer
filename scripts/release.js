// Borrowed and slightly adjusted from https://github.com/vuejs/vue-next/blob/master/scripts/release.js 💚

const { writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const semver = require('semver');
const execa = require('execa');
const { prompt } = require('enquirer');
const args = require('minimist')(process.argv.slice(2));
const { targets: packages } = require('./utils');

const currentVersion = require('../package.json').version;
const preRelease = semver.prerelease(currentVersion);

const preReleaseId = args.preid || preRelease ? preRelease[0] : 'alpha';
const isDryRun = args.dry;
const skipTests = args.skipTests;
const skipBuild = args.skipBuild;
const skipChangelog = args.skipChangelog;

const incrementVersion = (i) => semver.inc(currentVersion, i, preReleaseId);
const bin = (name) => resolve(__dirname, '../node_modules/.bin/' + name);
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.cyan(`[dryrun] ${bin} ${args.join(' ')}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;
const getPkgRoot = (pkg) => resolve(__dirname, '../packages/' + pkg);
const step = (msg) => console.log(chalk.cyan(`\n${msg}`));

const versionIncrements = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease',
];

async function main() {
  // Get target version from command
  let targetVersion = args._[0];

  if (!targetVersion) {
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements
        .map((i) => `${i} (${incrementVersion(i)})`)
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
    throw new Error(chalk.red.bold(`Invalid target version: ${targetVersion}`));
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  step('Running tests...');
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache']);
    await run('yarn', ['test', '--runInBand']);
  } else {
    console.log(chalk.gray('(skipped)'));
  }

  // Update all package version and inter-dependencies
  step('Updating cross dependencies...');
  updateVersions(targetVersion);

  // Build all packages with types
  step('Building all packages...');
  if (!skipBuild && !isDryRun) {
    await run('yarn', ['build', '--release']);
  } else {
    console.log(chalk.gray('(skipped)'));
  }

  // Generate changelog
  step('Generating changelog...');
  if (!skipChangelog) {
    await run('yarn', ['changelog']);
  } else {
    console.log(chalk.gray('(skipped)'));
  }

  // Committing changes if any
  const { stdout } = await run('git', ['diff'], {
    stdio: 'pipe',
  });
  if (stdout) {
    step('\nCommitting changes...');
    await runIfNotDry('git', ['add', '-A']);
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`]);
  } else {
    console.log('No changes to commit.');
  }

  // Publish packages
  step('\nPublishing packages...');
  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion, runIfNotDry);
  }

  // push to GitHub
  step('Pushing to GitHub...');
  await runIfNotDry('git', ['tag', `v${targetVersion}`]);
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await runIfNotDry('git', ['push']);

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`);
  }
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(resolve(__dirname, '..'), version);
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPkgRoot(p), version));
}

function updatePackage(pkgRoot, version) {
  const pkgPath = resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  pkg.version = version;
  updateDeps(pkg, 'dependencies', version);
  updateDeps(pkg, 'peerDependencies', version);
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + `\n`);
}

function updateDeps(pkg, depType, version) {
  const deps = pkg[depType];
  if (!deps) return;

  Object.keys(deps).forEach((dep) => {
    if (
      dep.startsWith('@marvr') &&
      packages.includes(dep.replace(/^@marvr\//, ''))
    ) {
      console.log(
        chalk.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`),
      );
      deps[dep] = version;
    }
  });
}

async function publishPackage(pkgName, version, runIfNotDry) {
  const pkgRoot = getPkgRoot(pkgName);
  const pkgPath = resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  if (pkg.private) {
    return;
  }

  const releaseTag = preRelease ? preRelease[0] : null;

  step(`Publishing ${pkg.name}...`);
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

    console.log(chalk.green(`Successfully published ${pkg.name}@${version}`));
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkg.name}`));
    } else {
      throw e;
    }
  }
}

main().catch((err) => {
  console.error(err);
});
