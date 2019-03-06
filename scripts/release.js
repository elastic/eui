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
  // make sure the release script is being run by npm (required for `npm publish` step)
  // https://github.com/yarnpkg/yarn/issues/5063
  const packageManagerScript = path.basename(process.env.npm_execpath);
  if (packageManagerScript !== 'npm-cli.js') {
    console.error('The release script must be run with npm: npm run release');
    process.exit(1);
  }

  // ensure git is on the master branch
  await ensureMasterBranch();

  // run linting and unit tests
  execSync('npm test', execOptions);

  // (trans|com)pile `src` into `lib` and `dist`
  execSync('npm run build', execOptions);

  // prompt user for what type of version bump to make (major|minor|patch)
  const versionTarget = await getVersionTypeFromChangelog();

  // build may have generated a new src-docs/src/i18ntokens.json file, dirtying the git workspace
  // it's important to track those changes with this release, so determine the changes and write them
  // to src-docs/src/i18ntokens_changelog.json, comitting both to the workspace before running `npm version`
  execSync(`npm run update-token-changelog -- ${versionTarget}`, execOptions);

  // update package.json & package-lock.json version, git commit, git tag
  execSync(`npm version ${versionTarget}`, execOptions);

  // push the version commit & tag to upstream
  execSync('git push upstream --tags', execOptions);

  // publish new version to npm
  execSync('npm publish', execOptions);

  // update docs, git commit, git push
  execSync('npm run sync-docs', execOptions);
}()).catch(e => console.error(e));

async function ensureMasterBranch() {
  const repo = await git.Repository.open(cwd);
  const currentBranch = await repo.getCurrentBranch();
  const currentBranchName = currentBranch.shorthand();

  if (currentBranchName !== 'master') {
    console.error(`Unable to release: currently on branch "${currentBranchName}", expected "master"`);
    process.exit(1);
  }
}

async function getVersionTypeFromChangelog() {
  const pathToChangelog = path.resolve(cwd, 'CHANGELOG.md');

  const changelog = fs.readFileSync(pathToChangelog).toString();

  // Sanity check, if the changelog contains "No public interface changes"then we shouldn't be releasing
  if (changelog.indexOf('No public interface changes') !== -1) {
    console.error(`Unable to release: CHANGELOG.md indicates "No public interface changes"`);
    process.exit(1);
  }

  // get contents between the first two headings
  // changelog headings always use ##, this matches:
  //
  // "##.+?[\r\n]+" consume the first heading & linebreak(s), which describes the master branch
  // "(.+?)" capture (non-greedy) all changes until the rest of the regex matches
  // "[\r\n]+##" any linebreak(s) leading up to the next ## heading
  //
  // regex flags "su" enable dotAll (s) and unicode-character matching (u)
  //
  // effectively capturing pending changes in the capture group
  // which is stored as the second item in the returned array from `changelog.match()`
  const [, unreleasedchanges] = changelog.match(/##.+?[\r\n]+(.+?)[\r\n]+##/su);

  // these changes contain bug fixes if the string "**bug fixes**" exists
  const hasBugFixes = unreleasedchanges.toLowerCase().indexOf('**bug fixes**') !== -1;

  // by convention, non-bug changes are listed first
  // this checks if a markdown list character "-" exists before the "bug fixes" string,
  // which indicates that there are other changes than bug fixes
  const hasFeaturesWithBugFixes = !!unreleasedchanges.match(/.*-.*bug fixes/isu);

  // breaking changes are described under a "**breaking changes**" string
  const hasBreakingChanges = unreleasedchanges.toLowerCase().indexOf('**breaking changes**') !== -1;

  // default to a MINOR bump (new features, may have bug fixes, no breaking changes)
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
            message: 'Your choice must be major, minor or patch',
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
