/**
 * This script collates all files in the `upcoming_changelogs/` directory
 * into the CHANGELOG.md file under the latest release version
 */

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Helpers
const rootDir = path.resolve(__dirname, '..');

const throwError = (error) => {
  console.error(chalk.red(error));
  process.exit(1);
};

/**
 * Convert individual changelog files into a single changelog string
 */
const collateChangelogFiles = () => {
  const upcomingChangelogsDir = path.resolve(rootDir, 'upcoming_changelogs');
  const upcomingChangelogFiles = glob.sync('**.md', {
    cwd: upcomingChangelogsDir,
    realpath: true,
    ignore: ['_template.md'],
  });
  if (!upcomingChangelogFiles.length) {
    throwError(
      'Cannot update CHANGELOG.md - No upcoming changelog files exist'
    );
  }

  /**
   * Iterate through each changelog file, split it out by subheadings,
   * and then append each subheading type to the changelog map
   */
  const upcomingChangelogMap = {
    Features: [], // No heading, top of the changelog
    'Bug fixes': [],
    Deprecations: [],
    'Breaking changes': [],
  };

  upcomingChangelogFiles.forEach((filePath) => {
    // Automatically generate the pull request link based on the filename
    const pullRequestId = path.basename(filePath, '.md');
    const pullRequestLink = `([#${pullRequestId}](https://github.com/elastic/eui/pull/${pullRequestId}))`;

    const changelog = fs.readFileSync(filePath).toString();
    const sections = changelog.split(/\r?\n\*\*/);
    sections.forEach((section) => {
      let heading = '';
      let text = '';

      const hasHeading = section.match(/\*\*\r?\n/);
      if (hasHeading) {
        [heading, text] = section.split(/\*\*\r?\n/);
      } else {
        text = section;
      }
      // Cleanup
      heading = heading.replace('**', '').trim();
      text = text.trim();

      if (text) {
        // Split changelog text into discrete log items (if there are multiple) and append a PR link for each
        let items = text
          .split(/\r?\n/)
          .map((item) => `${item} ${pullRequestLink}`);

        if (!heading) {
          // No heading, so must be new features/enhancements only
          upcomingChangelogMap['Features'].push(...items);
        } else {
          // If this is a custom heading, create the heading key
          if (!upcomingChangelogMap.hasOwnProperty(heading)) {
            upcomingChangelogMap[heading] = [];
          }
          upcomingChangelogMap[heading].push(...items);
        }
      }
    });
  });

  /**
   * Combine the changelog map into text
   */
  let upcomingChangelog = '';
  let changelogSections = [];

  Object.entries(upcomingChangelogMap).forEach(([section, items]) => {
    if (!items.length) return; // Nothing to add

    let changelog = '';
    if (section !== 'Features') changelog += `**${section}**\n\n`;
    changelog += items.join('\n');

    changelogSections.push(changelog);
  });
  upcomingChangelog = changelogSections.join('\n\n');

  return { changelogMap: upcomingChangelogMap, changelog: upcomingChangelog };
};

/**
 * Write to CHANGELOG.md and commit the file
 */
const updateChangelog = (upcomingChangelog) => {
  if (!upcomingChangelog) {
    throwError('Cannot update CHANGELOG.md - no changes found');
  }

  const pathToChangelog = path.resolve(rootDir, 'CHANGELOG.md');
  const changelogArchive = fs.readFileSync(pathToChangelog).toString();

  const pathToPackage = path.resolve(rootDir, 'package.json');
  const { version } = require(pathToPackage);
  const latestVersionHeading = `## [\`${version}\`](https://github.com/elastic/eui/tree/v${version})`;

  if (changelogArchive.startsWith(latestVersionHeading)) {
    throwError('Cannot update CHANGELOG.md - already on latest version');
  }

  const updatedChangelog = `${latestVersionHeading}\n\n${upcomingChangelog}\n\n${changelogArchive}`;
  fs.writeFileSync(pathToChangelog, updatedChangelog);

  execSync('git add CHANGELOG.md');
  execSync('git commit -m "Updated changelog." -n');
  execSync('git push upstream');
};

module.exports = { collateChangelogFiles, updateChangelog };
