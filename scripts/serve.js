const execa = require('execa');
const chalk = require('chalk');

console.log(chalk.blue.bold('Serving tests/fixtures'));

execa('serve', ['tests/fixtures'], {
  stdio: 'inherit',
});
