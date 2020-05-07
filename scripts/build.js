const execa = require('execa');
const chalk = require('chalk');
const { remove, exists, readFile, readdir, writeFile } = require('fs-extra');
const { resolve } = require('path');
const args = require('minimist')(process.argv.slice(2));
const isRelease = args.release;
const buildTypes = args.t || args.types || isRelease;
const {
  packagesDir,
  targets,
  step,
  removeDistFolderOfTargets,
} = require('./utils');

run();

async function run() {
  await build();
}

async function build() {
  console.log();
  console.log(chalk.cyan.bold(`Building following packages:`));

  for (const target of targets) {
    const pkgDir = resolve(packagesDir, target);
    const pkg = require(`${pkgDir}/package.json`);

    console.log(chalk.gray(`- ${pkg.name}`));
  }

  await removeDistFolderOfTargets(targets);

  step('Starting building...');
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `NODE_ENV:production`,
        `TARGETS:${targets.join(' ')}`,
        buildTypes ? `TYPES:true` : ``,
      ]
        .filter(Boolean)
        .join(','),
    ],
    {
      stdio: 'inherit',
    },
  );

  if (buildTypes) {
    step('Extracting API...');

    for (const target of targets) {
      console.log();

      const pkgDir = resolve(packagesDir, target);
      const pkg = require(`${pkgDir}/package.json`);

      const {
        Extractor,
        ExtractorConfig,
      } = require('@microsoft/api-extractor');

      const extractorConfigPath = resolve(pkgDir, `api-extractor.json`);
      const extractorConfig = ExtractorConfig.loadFileAndPrepare(
        extractorConfigPath,
      );
      const extractorResult = Extractor.invoke(extractorConfig, {
        localBuild: true,
        showVerboseMessages: true,
      });

      if (extractorResult.succeeded) {
        // concat additional d.ts to rolled-up dts
        const typesDir = resolve(pkgDir, 'types');

        if (await exists(typesDir)) {
          const dtsPath = resolve(pkgDir, pkg.types);
          const existing = await readFile(dtsPath, 'utf-8');
          const typeFiles = await readdir(typesDir);
          const toAdd = await Promise.all(
            typeFiles.map((file) => {
              return readFile(resolve(typesDir, file), 'utf-8');
            }),
          );
          await writeFile(dtsPath, existing + '\n' + toAdd.join('\n'));
        }
        console.log(
          chalk.bold(chalk.green(`API Extractor completed successfully.`)),
        );
      } else {
        console.error(
          `API Extractor completed with ${extractorResult.errorCount} errors` +
            ` and ${extractorResult.warningCount} warnings`,
        );
        process.exitCode = 1;
      }

      await remove(`${pkgDir}/dist/packages`);
    }
  }

  // @TODO Check sizes

  console.log();
  console.log(chalk.green.bold('Building completed. Ready for deploy!'));
  console.log();
}
