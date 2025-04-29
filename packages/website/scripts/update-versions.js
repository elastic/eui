/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const version = require('@elastic/eui/package.json').version;
const versionsFile = path.join(__dirname, '../static/versions.json');

const isValidVersion = (version) => {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
};

/**
 * Updates the `versions.json` file used by the documentation version switcher.
 *
 * To test locally, run `node ./scripts/update-versions.js`,
 * then verify the contents of `static/versions.json`.
 */

const updateVersions = async () => {
  try {
    const fileContent = fs.readFileSync(versionsFile, 'utf8');
    const jsonData = JSON.parse(fileContent);

    if (!jsonData.euiVersions || !Array.isArray(jsonData.euiVersions)) {
      throw new Error(
        'Invalid JSON structure: Missing or invalid `euiVersions` array'
      );
    }

    if (!isValidVersion(version)) {
      console.warn(
        'Skipping update: Invalid version format or unofficial release'
      );
      return;
    }

    if (jsonData.euiVersions.includes(version)) {
      console.warn('Skipping update: Current version has already been logged');
      return;
    }

    // Prepend the new version
    jsonData.euiVersions.unshift(version);

    // Write the updated JSON back to the file
    fs.writeFileSync(versionsFile, JSON.stringify(jsonData, null, 2));

    // Stage the file for commit
    exec(`git add ${versionsFile}`, (err) => {
      if (err) {
        throw new Error('Error staging the file:', err);
      } else {
        console.log('Version added and file staged successfully');
      }
    });
  } catch (error) {
    throw new Error('Error updating versions:', err);
  }
};

updateVersions();
