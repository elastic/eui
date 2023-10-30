const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const versionsLogFile =
  rootDir + '/src-docs/src/components/guide_page/versions.json';

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

/**
 * Get the current EUI version and increment it based on the
 * user-input versionTarget (major/minor/patch)
 */
const getUpcomingVersion = (versionTarget) => {
  const pathToPackage = rootDir + '/package.json';
  const { version } = require(pathToPackage);
  let [major, minor, patch] = version.split('.').map(Number);
  switch (versionTarget) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
  }
  return [major, minor, patch].join('.');
};

module.exports = {
  getUpcomingVersion,
  updateDocsVersionSwitcher,
};
