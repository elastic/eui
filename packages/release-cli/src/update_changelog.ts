/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import * as glob from 'glob';
import { rimraf } from 'rimraf';

const CHANGELOGS_DIR_PATH = 'changelogs';

type ChangelogGroupName =
  | 'Features'
  | 'Bug fixes'
  | 'Deprecations'
  | 'Breaking changes'
  | string;
export type ChangelogMap = Record<ChangelogGroupName, string[]>;

/**
 * Convert individual changelog files into a single changelog string
 */
export const collateChangelogFiles = async (packageRootDir: string) => {
  const upcomingChangelogsDir = path.resolve(
    packageRootDir,
    CHANGELOGS_DIR_PATH,
    'upcoming'
  );

  const upcomingChangelogMap: ChangelogMap = {
    Features: [],
    'Bug fixes': [],
    Deprecations: [],
    'Breaking changes': [],
  };

  const processedChangelogFiles: string[] = [];

  try {
    await fs.stat(upcomingChangelogsDir);
  } catch (err) {
    // Directory doesn't exist
    return {
      changelogMap: upcomingChangelogMap,
      changelog: '',
      hasChanges: false,
      processedChangelogFiles,
    };
  }

  const files = glob.globIterate('**.md', {
    cwd: upcomingChangelogsDir,
    realpath: true,
    ignore: ['_template.md'],
  });

  for await (const fileName of files) {
    const filePath = path.join(upcomingChangelogsDir, fileName);
    const pullRequestId = path.basename(filePath, '.md');
    const pullRequestMarkdownLink = `([#${pullRequestId}](https://github.com/elastic/eui/pull/${pullRequestId}))`;

    processedChangelogFiles.push(filePath);

    const content = await fs.readFile(filePath, 'utf8');
    for (const section of content.split(/\r?\n\*\*/)) {
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
        let items = text.split(/\r?\n/).map((item) => {
          // Skip indented changelog items - they're presumably a child item providing more info, and don't need individual links
          // (depends on indentation: 2 or 4 spaces)
          const isNestedChild = /( ){2,}(-|\*)/.test(item);

          return isNestedChild ? item : `${item} ${pullRequestMarkdownLink}`;
        });

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
    }
  }

  let changelogSections: string[] = [];

  for (const [section, items] of Object.entries(upcomingChangelogMap)) {
    if (!items.length) continue; // Nothing to add

    let changelog = '';
    if (section !== 'Features') changelog += `**${section}**\n\n`;
    changelog += items.join('\n');

    changelogSections.push(changelog);
  }

  const upcomingChangelog = changelogSections.join('\n\n');

  return {
    changelogMap: upcomingChangelogMap,
    changelog: upcomingChangelog,
    hasChanges: !!upcomingChangelog.length,
    processedChangelogFiles,
  };
};

/**
 * Write to latest year's changelog file, delete individual upcoming changelog files, & stage changes
 */
export const updateChangelogContent = async (
  packageRootDir: string,
  upcomingChangelog: string,
  version: string
) => {
  if (!upcomingChangelog) {
    throw new Error('Cannot update changelog - no changes found');
  }

  const year = new Date().getUTCFullYear();
  const pathToChangelog = path.resolve(
    packageRootDir,
    CHANGELOGS_DIR_PATH,
    `CHANGELOG_${year}.md`
  );

  let changelogArchive = '';
  try {
    changelogArchive = await fs.readFile(pathToChangelog, 'utf8');
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
    throw new Error('Cannot update changelog - already on latest version');
  }

  const updatedChangelog = `${latestVersionHeading}\n\n${upcomingChangelog}\n\n${changelogArchive}`;
  await fs.writeFile(pathToChangelog, updatedChangelog);

  return pathToChangelog;
};

export const deleteObsoleteChangelogs = async (changelogFiles: string[]) => {
  return rimraf(changelogFiles);
};
