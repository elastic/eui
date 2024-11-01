const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const path = require('path');
let { execSync } = require('child_process');

const cwd = path.resolve(__dirname, '..');
const stdio = 'inherit';
const execOptions = { cwd, stdio };

const updateTokenChangelog = require('./update-token-changelog');
const {
  collateChangelogFiles,
  updateChangelog,
} = require('./update-changelog');
const {
  getUpcomingVersion,
  updateDocsVersionSwitcher,
} = require('./update-versions-log');

const TYPE_MAJOR = 'major';
const TYPE_MINOR = 'minor';
const TYPE_PATCH = 'patch';
const TYPE_BACKPORT = 'backport';
const TYPE_PRERELEASE = 'prerelease';

// NOTE: Because this script has to be run with `npm`, args must be passed after an extra `--`
// e.g. `npm run release -- --dry-run`, `npm run release -- --steps=build,version`
const args = yargs(hideBin(process.argv))
  .parserConfiguration({
    'camel-case-expansion': false,
    'halt-at-non-option': true,
  })
  .describe('Tag and publish a new version of EUI')
  .options({
    'dry-run': {
      type: 'boolean',
      default: false,
      describe: 'Dry run mode; no changes are made',
    },
    type: {
      type: 'string',
      choices: [
        TYPE_MAJOR,
        TYPE_MINOR,
        TYPE_PATCH,
        TYPE_BACKPORT,
        TYPE_PRERELEASE,
      ],
      describe:
        'Version type; For normal releases, can be "major", "minor" or "patch". Special releases: "backport" and "prerelease". If not passed, will be automatically prompted for based on the upcoming changelogs.',
    },
    steps: {
      type: 'string',
      describe:
        'Which release steps to run; a comma-separated list of values that can include "test", "build", "version", "tag", and "publish". If no value is given, all steps are run. Example: --steps=test,build,version,tag',
      coerce: (value) => {
        if (value) {
          const allSteps = ['test', 'build', 'version', 'tag', 'publish'];
          const steps = value.split(',').map((step) => step.trim());
          const invalidSteps = steps.filter((step) => !allSteps.includes(step));
          if (invalidSteps.length > 0) {
            console.error(`Invalid --step(s): ${invalidSteps.join(', ')}`);
            process.exit(1);
          }
        }
        return value;
      },
    },
  }).argv;

const isSpecialRelease =
  args.type === TYPE_BACKPORT || args.type === TYPE_PRERELEASE;

const isDryRun = args['dry-run'] === true;

const hasStep = (step) => {
  if (!args.steps) return true; // If no steps were passed, run them all
  return args.steps.includes(step);
};

/**
 * Main script
 */
(async function () {
  // make sure the release script is being run by npm (required for `npm publish` step)
  // https://github.com/yarnpkg/yarn/issues/5063
  const packageManagerScript = path.basename(process.env.npm_execpath || '');
  if (packageManagerScript !== 'npm-cli.js') {
    console.error('The release script must be run with npm: npm run release');
    process.exit(1);
  }

  if (isDryRun) {
    console.warn(
      chalk.yellow('Dry run mode: no changes will be pushed to npm or Github')
    );
  } else {
    // ensure git and local setup is at latest
    await ensureCorrectSetup();
  }

  // run lint, unit, and e2e tests
  if (hasStep('test')) {
    execSync('npm run test-ci', execOptions);
  }

  // (trans|com)pile `src` into `lib` and `dist`
  if (hasStep('build')) {
    execSync('npm run build', execOptions);
  }

  let versionTarget;

  if (hasStep('version')) {
    // Fetch latest tags and clear any local ones
    execSync('git fetch upstream --tags --prune --prune-tags --force');

    // Prompt user for what type of version bump to make (major|minor|patch) based on the upcoming changelogs
    const { changelogMap, changelog } = collateChangelogFiles();
    const versionType = await getVersionTypeFromChangelog(changelogMap);

    // Get the upcoming version target
    versionTarget = getUpcomingVersion(versionType);

    // build may have generated a new i18ntokens.json file, dirtying the git workspace
    // it's important to track those changes with this release, so determine the changes and write them
    // to i18ntokens_changelog.json, committing both to the workspace before running `npm version`
    await updateTokenChangelog(versionTarget);

    // Update version switcher data and changelog
    if (!isSpecialRelease) {
      updateDocsVersionSwitcher(versionTarget);

      // TODO: Remove this once EUI is fully on the new website and src-docs has been removed
      const oldEuiDocsVersions = cwd + '/src-docs/src/components/guide_page/versions.json';
      updateDocsVersionSwitcher(versionTarget, oldEuiDocsVersions);
    }
    updateChangelog(changelog, versionTarget);
    execSync('git commit -m "Updated changelog" -n');

    // Update version number
    execSync(`yarn version ${versionTarget}`, execOptions);
    // `yarn version` sometimes has a bug with the suffixed releases (e.g. `-backport.*`)
    // where it doesn't properly set the version target. Running the command twice in a row
    // appears to fix the issue for some reason ¯\_(ツ)_/¯
    if (isSpecialRelease) {
      execSync(`yarn version ${versionTarget}`, execOptions);
    }

    // Commit version number update
    execSync('git add package.json', execOptions);
    execSync(`git commit --no-verify -m "${versionTarget}"`, execOptions);
  }

  if (hasStep('tag') && !isDryRun) {
    // Create a tag
    execSync(`git tag -a -m "v${versionTarget}" "v${versionTarget}"`, execOptions);

    // Skip prepush test hook on all pushes - we should have already tested previously,
    // or we skipped the test step for a reason
    if (isSpecialRelease) {
      // Only push the tag, not the branch
      execSync(`git push upstream v${versionTarget} --no-verify`, execOptions);
    } else {
      // Push commits as well as tag
      execSync(`git push upstream --follow-tags --no-verify`, execOptions);
    }
  }

  if (hasStep('publish') && !isDryRun) {
    // prompt user for npm 2FA
    const otp = await getOneTimePassword(versionTarget);

    // publish new version to npm
    if (isSpecialRelease) {
      execSync(`npm publish --tag=${args.type} --otp=${otp}`, execOptions);
    } else {
      execSync(`npm publish --otp=${otp}`, execOptions);
    }
  }
})().catch((e) => console.error(e));

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
    // Backports and prereleases do not need to be made from main branch
    if (!isSpecialRelease) {
      console.error(
        'Your branch is not pointed at "upstream/main". Please ensure your `main` branch is pointed at the correct remote first before proceeding.'
      );
      process.exit(1);
    }
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
  if (!isSpecialRelease) execSync('git pull');
  execSync('yarn');
}

async function getVersionTypeFromChangelog(changelogMap) {
  // Special releases don't need to check recommended semver
  if (isSpecialRelease) {
    console.log(
      `${chalk.magenta('--type set to')} ${chalk.blue(
        args.type
      )}. Creating a special release`
    );
    return args.type;
  }

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

  console.log(chalk.magenta('Detected the following upcoming changelogs:'));
  console.log('');
  Object.entries(changelogMap).forEach(([section, items]) => {
    console.log(chalk.gray(`${section}: ${items.length}`));
  });
  console.log('');
  console.log(
    `${chalk.magenta(
      'The recommended version update for these changes is'
    )} ${chalk.blue(recommendedType)}`
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

    if (versionType !== recommendedType) {
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

    return await promptUserForVersionType(recommendedType);
  }
}

async function promptUserForVersionType(recommendedType) {
  const inquirer = await import('inquirer');
  const { versionType } = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'versionType',
      message: 'Your choice must be major, minor, or patch',
      choices: [TYPE_MAJOR, TYPE_MINOR, TYPE_PATCH],
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
