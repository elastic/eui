const chalk = require('chalk');
const fs = require('fs');
const git = require('nodegit');
const path = require('path');
const prompt = require('prompt');
const { execSync } = require('child_process');

const cwd = path.resolve(__dirname, '..');
const stdio = 'inherit';
const execOptions = { cwd, stdio };

const TYPE_MAJOR = 0;
const TYPE_MINOR = 1;
const TYPE_PATCH = 2;
const humanReadableTypes = {
  [TYPE_MAJOR]: 'major',
  [TYPE_MINOR]: 'minor',
  [TYPE_PATCH]: 'patch'
};

(async function () {
  // ensure git is on the master branch
  await ensureMasterBranch();

  // run linting and unit tests
  execSync('npm test', execOptions);

  // (trans|com)pile `src` into `lib` and `dist`
  execSync('npm run build', execOptions);

  // prompt user for what type of version bump to make (major|minor|patch)
  const versionTarget = await getVersionTypeFromChangelog();

  // update package.json & package-lock.json version, git commit, git tag
  execSync(`npm version ${versionTarget}`, execOptions);

  // push the version commit & tag to upstream
  execSync('git push upstream --tags', execOptions);

  // publish new version to npm
  execSync('npm publish', execOptions);

  // update docs, git commit, git push
  execSync('npm run sync-docs', execOptions);
}()).catch(e => console.error(e));

async function getVersionTypeFromChangelog() {
  const pathToChangelog = path.resolve(cwd, 'CHANGELOG.md');

  const changelog = fs.readFileSync(pathToChangelog).toString();

  // get contents between the first two headings
  const [, unreleasedchanges] = changelog.match(/##.+?[\r\n]+(.+?)[\r\n]+##/su);

  const hasBugFixes = unreleasedchanges.toLowerCase().indexOf('**bug fixes**') !== -1;
  const hasFeaturesWithBugFixes = !!unreleasedchanges.match(/.*-.*Bug fixes/isu);

  const hasBreakingChanges = unreleasedchanges.toLowerCase().indexOf('**breaking changes**') !== -1;

  // default to a MINOR bump (new features, maybe bug fixes, no breaking changes)
  let recommendedType = TYPE_MINOR;

  if (hasBugFixes && !hasFeaturesWithBugFixes) {
    // there are bug fixes with no minor features
    recommendedType = TYPE_PATCH;
  }

  if (hasBreakingChanges) {
    // detected breaking changes
    recommendedType = TYPE_MAJOR;
  }

  const humanReadableRecommendation = humanReadableTypes[recommendedType];
  console.log(chalk.magenta('Detected the following unreleased changes from CHANGELOG.md'));
  console.log('');
  console.log(chalk.gray(unreleasedchanges));
  console.log('');
  console.log(`${chalk.magenta('The recommended version update for these changes is')} ${chalk.blue(humanReadableRecommendation)}`);
  console.log(`${chalk.magenta('What part of the package version do you want to bump?')} ${chalk.gray('(major, minor, patch)')}`);

  return await promptUserForVersionType();
}

async function ensureMasterBranch() {
  const repo = await git.Repository.open(cwd);
  const currentBranch = await repo.getCurrentBranch();
  const currentBranchName = currentBranch.shorthand();

  if (currentBranchName !== 'master') {
    console.error(`Unable to release: currently on branch "${currentBranchName}", expected "master"`);
    process.exit(1);
  }
}

async function promptUserForVersionType() {
  return new Promise((resolve, reject) => {
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();
    prompt.get(
      {
        properties: {
          version: {
            description: 'choice:',
            pattern: /^(major|minor|patch)$/,
            message: 'Version must be major, minor, or patch',
            required: true
          },
        }
      },
      (err, { version }) => {
        if (err) {
          reject(err);
        } else {
          resolve(version);
        }
      }
    );
  });
}
