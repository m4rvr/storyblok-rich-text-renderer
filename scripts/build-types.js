const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const packages = fs
  .readdirSync('packages')
  .filter((p) => fs.statSync(`packages/${p}`).isDirectory());

main();

async function main() {
  for (const p of packages) {
    const pkgDir = path.resolve(__dirname, '../packages/', p);
    const typesDir = path.resolve(__dirname, '../dist/packages', p, 'src');
    const pkgTypesDir = path.resolve(pkgDir, 'generatedTypes');
    await fs.copy(typesDir, pkgTypesDir);

    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
    const extractorConfig =
      ExtractorConfig.loadFileAndPrepare(extractorConfigPath);

    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true,
    });

    if (extractorResult.succeeded) {
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

    fs.remove(pkgTypesDir);
  }

  fs.remove(path.resolve(__dirname, '../dist'));
}
