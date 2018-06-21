// npm test && npm run build && npm version patch && git push upstream --tags && npm publish && npm run sync-docs
const chalk = require('chalk');
const fs = require('fs');
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
  // execSync('npm test', execOptions);
  //
  // execSync('npm run build', execOptions);

  const versionTarget = await getVersionTypeFromChangelog();
  execSync(`npm version ${versionTarget}`, execOptions);
}()).catch(e => console.error(e));

async function getVersionTypeFromChangelog() {
  const pathToChangelog = path.resolve(cwd, 'CHANGELOG.md');

  let changelog;
  try {
    changelog = fs.readFileSync(pathToChangelog).toString();

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
  } catch (e) {
    console.log(`Unable to read CHANGELOG.md at ${pathToChangelog}`);
    throw e;
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
