const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const versionsLogFile = path.resolve(
  __dirname,
  '../src-docs/src/components/guide_page/versions.json'
);

/**
 * Writes to the above `versions.json` file (which is what the docs version switcher
 * uses to generate its list of versions) with the latest release
 *
 * To test locally, run `node -e "require('./scripts/update-versions-log')('vX.Y.Z')"`
 */
const updateDocsVersionSwitcher = (versionToAdd, file = versionsLogFile) => {
  if (!versionToAdd) {
    throw new Error('Missing version');
  }

  let fileString = fs.readFileSync(file).toString();
  const split = `"euiVersions": [`;
  const array = fileString.split(split);

  if (array.length <= 1) {
    throw new Error(`Invalid JSON data - missing ${split}`);
  }
  if (array[1].trimStart().startsWith(`"${versionToAdd}`)) {
    throw new Error('Current version has already been logged');
  }

  // Prepend the new version and re-form the file string
  array[1] = `\n    "${versionToAdd}",` + array[1];
  const updatedFileString = array.join(split);

  fs.writeFileSync(file, updatedFileString);
  execSync(`git add ${file}`);
};

module.exports = updateDocsVersionSwitcher;
