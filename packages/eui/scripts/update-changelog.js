/**
 * This script collates all files in the `changelogs/upcoming/` directory
 * into the latest year's changelog file under the latest release version
 */

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const rimraf = require('rimraf');
const { execSync } = require('child_process');

// Helpers
const rootDir = path.resolve(__dirname, '..');
const changelogDir = rootDir + '/changelogs';

const throwError = (error) => {
  console.error(chalk.red(error));
  process.exit(1);
};

/**
 * Convert individual changelog files into a single changelog string
 */
const collateChangelogFiles = () => {
  const upcomingChangelogsDir = path.resolve(changelogDir, 'upcoming');
  const upcomingChangelogFiles = glob.sync('**.md', {
    cwd: upcomingChangelogsDir,
    realpath: true,
    ignore: ['_template.md'],
  });
  if (!upcomingChangelogFiles.length) {
    throwError('Cannot update changelog - No upcoming changelog files exist');
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
        let items = text.split(/\r?\n/).map((item) =>
          // Skip indented changelog items - they're presumably a child item providing more info, and don't need individual links
          item.startsWith('  -') ? item : `${item} ${pullRequestLink}`
        );

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
 * Write to latest year's changelog file, delete individual upcoming changelog files, & stage changes
 */
const updateChangelog = (upcomingChangelog, version) => {
  if (!upcomingChangelog) {
    throwError('Cannot update changelog - no changes found');
  }

  const year = new Date().getUTCFullYear();
  const pathToChangelog = path.resolve(changelogDir, `CHANGELOG_${year}.md`);

  let changelogArchive = '';
  try {
    changelogArchive = fs.readFileSync(pathToChangelog).toString();
  } catch {}

  let latestVersionHeading = `## [\`v${version}\`](https://github.com/elastic/eui/releases/v${version})`;
  if (version.includes('-backport')) {
    latestVersionHeading +=
      '\n\n**This is a backport release only intended for use by Kibana.**';
  } else if (version.includes('-rc')) {
    latestVersionHeading +=
      '\n\n**This is a prerelease candidate not intended for public use.**';
  }

  if (changelogArchive.startsWith(latestVersionHeading)) {
    throwError('Cannot update changelog - already on latest version');
  }

  const updatedChangelog = `${latestVersionHeading}\n\n${upcomingChangelog}\n\n${changelogArchive}`;
  fs.writeFileSync(pathToChangelog, updatedChangelog);

  // Delete upcoming changelogs
  rimraf.sync('changelogs/upcoming/!(_template).md');

  execSync('git add changelogs/');
};

module.exports = {
  collateChangelogFiles,
  updateChangelog,
};
