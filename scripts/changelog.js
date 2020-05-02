const execa = require('execa');
const chalk = require('chalk');

const groupBy = require('lodash/groupBy');
const sortBy = require('lodash/sortBy');
const uniq = require('lodash/uniq');
const { writeFile } = require('fs-extra');

const types = {
  fix: { title: '🐛 Bug Fixes' },
  feat: { title: '🚀 Features' },
  refactor: { title: '💅 Refactors' },
  perf: { title: '🔥 Performance' },
  examples: { title: '📝 Examples' },
  chore: { title: '🏡 Chore' },
  test: { title: '👓 Tests' },
};

// Exclude from changelog
const knownAuthors = ['marvin rudolph'];

const isKnownAuthor = (name) =>
  Boolean(knownAuthors.find((n) => name.toLowerCase().includes(n)));

const allowedTypes = Object.keys(types);

async function main() {
  // Get current branch
  const currentGitBranch = await getCurrentGitBranch();

  // Get last git tag// Get last git tag
  const lastGitTag = await getLastGitTag();

  // Get all commits from last release to current branch
  console.log();
  console.log(
    chalk.bold(
      `${chalk.yellow(currentGitBranch)}${chalk.gray('...')}${chalk.cyan(
        lastGitTag,
      )}`,
    ),
  );
  console.log();

  let commits = await getGitDiff(currentGitBranch, lastGitTag);

  // Parse commits as conventional commits
  commits = parseCommits(commits);

  // Filter commits
  commits = commits.filter(
    (c) => allowedTypes.includes(c.type) && c.scope !== 'deps',
  );

  // Generate markdown
  const markdown = generateMarkDown(commits);

  // process.stdout.write('\n\n' + markdown + '\n\n');
  await writeFile('CHANGELOG.md', markdown, 'utf-8');
}

function execCommand(cmd, args) {
  return execa(cmd, args).then((r) => r.stdout);
}

async function getLastGitTag() {
  const r = await execCommand('git', [
    '--no-pager',
    'tag',
    '-l',
    '--sort=taggerdate',
  ]).then((r) => r.split('\n'));

  return r[r.length - 1];
}

async function getCurrentGitBranch() {
  const r = await execCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  return r;
}

async function getGitDiff(from, to) {
  // # https://git-scm.com/docs/pretty-formats
  const r = await execCommand('git', [
    '--no-pager',
    'log',
    `${from}...${to}`,
    '--pretty=%s|%h|%an|%ae',
  ]);

  return r.split('\n').map((line) => {
    const [message, commit, authorName, authorEmail] = line.split('|');
    return { message, commit, authorName, authorEmail };
  });
}

function parseCommits(commits) {
  return commits
    .filter((c) => c.message.includes(':'))
    .map((commit) => {
      let [type, ...message] = commit.message.split(':');
      message = message.join(':');

      // Extract references from message
      message = message.replace(/\((fixes) #\d+\)/g, '');
      const references = [];
      const referencesRegex = /#[0-9]+/g;
      let m;
      while ((m = referencesRegex.exec(message))) {
        // eslint-disable-line no-cond-assign
        references.push(m[0]);
      }

      // Remove references and normalize
      message = message
        .replace(referencesRegex, '')
        .replace(/\(\)/g, '')
        .trim();

      // Extract scope from type
      let scope = type.match(/\((.*)\)/);
      if (scope) {
        scope = scope[1];
      }
      if (!scope) {
        scope = 'general';
      }
      type = type.split('(')[0];

      return {
        ...commit,
        message,
        type,
        scope,
        references,
      };
    });
}

function generateMarkDown(commits) {
  const typeGroups = groupBy(commits, 'type');

  let markdown = '';

  for (const type of allowedTypes) {
    const group = typeGroups[type];
    if (!group || !group.length) {
      continue;
    }

    const { title } = types[type];
    markdown += '\n\n' + '### ' + title + '\n\n';

    const scopeGroups = groupBy(group, 'scope');
    for (const scopeName in scopeGroups) {
      markdown += '- `' + scopeName + '`' + '\n';
      for (const commit of scopeGroups[scopeName]) {
        markdown +=
          '  - ' +
          commit.references.join(', ') +
          (commit.references.length ? ' ' : '') +
          commit.message.replace(/^(.)/, (v) => v.toUpperCase()) +
          '\n';
      }
    }
  }

  const authors = sortBy(
    uniq(
      commits
        .map((commit) => commit.authorName)
        .filter((an) => {
          return !isKnownAuthor(an);
        }),
    ),
  );

  if (authors.length) {
    markdown += '\n\n' + '### ' + '💖 Thanks to' + '\n\n';
    markdown += authors.map((name) => '- ' + name).join('\n');
  }

  return markdown.trim();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
