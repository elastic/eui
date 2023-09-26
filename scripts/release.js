const argparse = require('argparse');
const chalk = require('chalk');
const path = require('path');
let { execSync } = require('child_process');

const cwd = path.resolve(__dirname, '..');
const stdio = 'inherit';
const execOptions = { cwd, stdio };

const {
  collateChangelogFiles,
  updateChangelog,
} = require('./update-changelog');

const TYPE_MAJOR = 0;
const TYPE_MINOR = 1;
const TYPE_PATCH = 2;
const humanReadableTypes = {
  [TYPE_MAJOR]: 'major',
  [TYPE_MINOR]: 'minor',
  [TYPE_PATCH]: 'patch',
};

const args = parseArguments();

if (args.dry_run) {
  console.warn(
    chalk.yellow('Dry run mode: no changes will be pushed to npm or Github')
  );
  execSync = function () {
    console.log.apply(null, arguments);
  };
}

(async function () {
  // make sure the release script is being run by npm (required for `npm publish` step)
  // https://github.com/yarnpkg/yarn/issues/5063
  const packageManagerScript = path.basename(process.env.npm_execpath || '');
  if (packageManagerScript !== 'npm-cli.js') {
    console.error('The release script must be run with npm: npm run release');
    process.exit(1);
  }

  // ensure git and local setup is at latest
  await ensureCorrectSetup();

  // run lint, unit, and e2e tests
  if (args.steps.indexOf('test') > -1) {
    execSync('npm run test-ci', execOptions);
  }

  // (trans|com)pile `src` into `lib` and `dist`
  if (args.steps.indexOf('build') > -1) {
    execSync('npm run build', execOptions);
  }

  let versionTarget;

  if (args.steps.indexOf('version') > -1) {
    // Fetch latest tags and clear any local ones
    execSync('git fetch upstream --tags --prune --prune-tags --force');

    const { changelogMap, changelog } = collateChangelogFiles();

    // prompt user for what type of version bump to make (major|minor|patch)
    versionTarget = await getVersionTypeFromChangelog(changelogMap);

    // build may have generated a new i18ntokens.json file, dirtying the git workspace
    // it's important to track those changes with this release, so determine the changes and write them
    // to i18ntokens_changelog.json, committing both to the workspace before running `npm version`
    execSync(`npm run update-token-changelog -- ${versionTarget}`, execOptions);

    // Update CHANGELOG.md
    updateChangelog(changelog, versionTarget);

    // update package.json & package-lock.json version, git commit, git tag
    execSync(`npm version ${versionTarget}`, execOptions);
  }

  if (args.steps.indexOf('tag') > -1) {
    // push the version commit & tag to upstream
    execSync('git push upstream --follow-tags', execOptions);
  }

  if (args.steps.indexOf('publish') > -1) {
    // prompt user for npm 2FA
    const otp = await getOneTimePassword(versionTarget);

    // publish new version to npm
    execSync(`npm publish --otp=${otp}`, execOptions);
  }
})().catch((e) => console.error(e));

function parseArguments() {
  const parser = new argparse.ArgumentParser({
    add_help: true,
    description: 'Tag and publish a new version of EUI',
  });

  parser.add_argument('--type', {
    help: 'Version type; can be "major", "minor" or "patch"',
    choices: Object.values(humanReadableTypes),
  });

  parser.add_argument('--dry-run', {
    action: 'store_true',
    default: false,
    help: 'Dry run mode; no changes are made',
  });

  const allSteps = ['test', 'build', 'version', 'tag', 'publish'];
  parser.add_argument('--steps', {
    help: 'Which release steps to run; a comma-separated list of values that can include "test", "build", "version", "tag", and "publish". If no value is given, all steps are run. Example: --steps=test,build,version,tag',
    default: allSteps.join(','),
  });

  const args = parser.parse_args();

  // validate --steps argument
  const steps = args.steps.split(',').map((step) => step.trim());
  const diff = steps.filter((x) => allSteps.indexOf(x) === -1);
  if (diff.length > 0) {
    console.error(`Invalid --step value(s): ${diff.join(', ')}`);
    process.exit(1);
  }

  return {
    ...args,
    steps,
  };
}

async function ensureCorrectSetup() {
  if (process.env.CI === 'true') {
    return;
  }

  /**
   * Ensure remote upstream is set to the correct repo
   */
  try {
    const upstreamRemote = execSync('git config --get remote.upstream.url')
      .toString()
      .trim();
    if (
      !(
        upstreamRemote.endsWith(':elastic/eui.git') || // : for SSH, / for HTTPS
        upstreamRemote.endsWith('/elastic/eui.git')
      )
    ) {
      console.error(
        'Your `upstream` remote must be pointed to https://github.com/elastic/eui.\nPlease run `git remote -v` to ensure you have an `upstream` remote pointed at the correct repo.\n'
      );
      process.exit(1);
    }
  } catch {
    console.error(
      'No `upstream` remote found.\nPlease run: `git remote add upstream git@github.com:elastic/eui.git`\n'
    );
    process.exit(1);
  }

  /**
   * Ensure the current branch is clean and pointed at upstream/main
   */
  const branchStatus = execSync('git status -v').toString().trim();
  if (
    !branchStatus.includes("Your branch is up to date with 'upstream/main'.")
  ) {
    console.error(
      'Your branch is not pointed at "upstream/main". Please ensure your `main` branch is pointed at the correct remote first before proceeding.'
    );
    process.exit(1);
  }
  if (!branchStatus.endsWith('nothing to commit, working tree clean')) {
    console.error(
      'Your staging is not clean. Please stash or check out your local changes before proceeding.'
    );
    process.exit(1);
  }

  /**
   * Ensure latest has been pulled and dependencies are up to date
   */
  execSync('git pull');
  execSync('yarn');
}

async function getVersionTypeFromChangelog(changelogMap) {
  // @see update-changelog.js
  const hasFeatures = changelogMap['Features'].length > 0;
  const hasBugFixes = changelogMap['Bug fixes'].length > 0;
  const hasBreakingChanges = changelogMap['Breaking changes'].length > 0;

  // default to a MINOR bump (new features, may have bug fixes, no breaking changes)
  let recommendedType = TYPE_MINOR;

  if (hasBugFixes && !hasFeatures) {
    // there are bug fixes with no minor features
    recommendedType = TYPE_PATCH;
  }

  if (hasBreakingChanges) {
    // detected breaking changes
    recommendedType = TYPE_MAJOR;
  }

  const humanReadableRecommendation = humanReadableTypes[recommendedType];
  console.log(chalk.magenta('Detected the following upcoming changelogs:'));
  console.log('');
  Object.entries(changelogMap).forEach(([section, items]) => {
    console.log(chalk.gray(`${section}: ${items.length}`));
  });
  console.log('');
  console.log(
    `${chalk.magenta(
      'The recommended version update for these changes is'
    )} ${chalk.blue(humanReadableRecommendation)}`
  );

  // checking for --type argument value; used by CI to automate releases
  const versionType = args.type;
  if (versionType) {
    // detected version type preference set
    console.log(
      `${chalk.magenta('--type argument identifed, set to')} ${chalk.blue(
        versionType
      )}`
    );

    if (versionType !== humanReadableRecommendation) {
      console.warn(
        `${chalk.yellow(
          'WARNING: --type argument does not match recommended version update'
        )}`
      );
    }

    return versionType;
  } else {
    console.log(
      `${chalk.magenta(
        'What part of the package version do you want to bump?'
      )} ${chalk.gray('(major, minor, patch)')}`
    );

    return await promptUserForVersionType(humanReadableRecommendation);
  }
}

async function promptUserForVersionType(recommendedType) {
  const inquirer = await import('inquirer');
  const { versionType } = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'versionType',
      message: 'Your choice must be major, minor, or patch',
      choices: ['major', 'minor', 'patch'],
      default: recommendedType || '',
    },
  ]);
  return versionType;
}

async function getOneTimePassword(versionTarget) {
  console.log(
    chalk.magenta(
      `Preparing to publish @elastic/eui@${versionTarget} to npm registry`
    )
  );
  console.log('');
  console.log(
    chalk.magenta(
      'The @elastic organization requires membership and 2FA to publish'
    )
  );

  if (process.env.NPM_OTP) {
    console.log(
      chalk.magenta('2FA code provided by NPM_OTP environment variable')
    );
    return process.env.NPM_OTP;
  }

  console.log(chalk.magenta('What is your one-time password?'));

  const inquirer = await import('inquirer');
  const { otp } = await inquirer.default.prompt([
    {
      name: 'otp',
      message: 'Enter password:',
      validate: (input) => {
        if (input && !isNaN(input) && input.toString().length >= 6) {
          return true;
        } else {
          return 'Please enter a six-digit numerical 2FA code';
        }
      },
    },
  ]);
  return otp;
}
