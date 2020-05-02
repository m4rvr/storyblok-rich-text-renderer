const execa = require('execa');
const chalk = require('chalk');
const { remove } = require('fs-extra');
const { resolve } = require('path');
const args = require('minimist')(process.argv.slice(2));
const { targets } = require('./utils');

const isDev = args.dev || args.d;
const env = isDev ? 'development' : 'production';

run();

async function run() {
  await removeDistFolders();
  await build();
}

async function build() {
  console.log(chalk.yellow.bold(`Building for ${chalk.cyan(env)} mode ...`));

  await execa(
    'rollup',
    [
      `-c${isDev ? 'w' : ''}`,
      '--environment',
      [`TARGETS:${targets.join(' ')}`, `NODE_ENV:${env}`]
        .filter(Boolean)
        .join(','),
    ],
    {
      stdio: 'inherit',
    },
  );
}

async function removeDistFolders() {
  for (const target of targets) {
    console.log(
      chalk.yellow.bold(
        `Removing ${chalk.underline('dist')} from package ${chalk.cyan(
          target,
        )} ...`,
      ),
    );

    const pkgDir = resolve(__dirname, `packages/${target}`);
    remove(`${pkgDir}/dist`);
  }
}
