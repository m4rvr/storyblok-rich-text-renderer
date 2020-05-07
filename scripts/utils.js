const { readdirSync, remove } = require('fs-extra');
const { resolve } = require('path');
const chalk = require('chalk');

const packagesDir = resolve(__dirname, '../packages');
exports.packagesDir = packagesDir;

exports.targets = readdirSync(packagesDir);

const step = (message) => {
  console.log();
  console.log(chalk.cyan.bold(message));
};

exports.step = step;

exports.removeDistFolderOfTargets = async (targets) => {
  step(`Removing ${chalk.yellow.bold('dist')} directory of each target ...`);

  for (const target of targets) {
    const pkgDir = resolve(packagesDir, target);
    await remove(`${pkgDir}/dist`);
  }
};
