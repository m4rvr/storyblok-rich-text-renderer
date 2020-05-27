const execa = require('execa');
const { resolve } = require('path');
const { targets, step, removeDistFolderOfTargets } = require('./utils');

const fixturesDir = resolve(__dirname, '../tests/fixtures');

run();

async function run() {
  await watch();
}

async function watch() {
  await removeDistFolderOfTargets(targets);

  step('Starting development server and watching files ...');

  execa('serve', [fixturesDir], { stdio: 'inherit' });

  console.log();
  execa(
    'rollup',
    [
      '-wc',
      '--environment',
      ['NODE_ENV:development', `TARGETS:${targets.join(' ')}`]
        .filter(Boolean)
        .join(','),
    ],
    {
      stdio: 'inherit',
    },
  );
}
