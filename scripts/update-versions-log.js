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
 * user-input versionTarget (major/minor/patch, backport/prerelease)
 */
const getUpcomingVersion = (versionTarget) => {
  const pathToPackage = rootDir + '/package.json';
  const { version } = require(pathToPackage);

  // Normal releases
  let [major, minor, patch] = version.split('.').map(Number);

  // Special releases, e.g. `v1.1.1-backport.0` or `v2.2.2-rc.1`
  const incrementPreId = (preId) => {
    const [versionWithoutPreId, affix] = version.split(`-${preId}`);
    // Releasing from a main release, e.g. `v1.1.1` - add the preId and number automatically
    if (!affix) return `${version}-${preId}.0`;

    const releaseNumber = Number(affix.split('.')[1]);
    // Edge case for odd formats - coerce to the format we want
    if (isNaN(releaseNumber)) return `${versionWithoutPreId}-${preId}.0`;

    // Otherwise, increment the existing release number
    return `${versionWithoutPreId}-${preId}.${releaseNumber + 1}`;
  };

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
    case 'backport':
      return incrementPreId('backport');
    case 'prerelease':
      return incrementPreId('rc');
  }

  return [major, minor, patch].join('.');
};

module.exports = {
  getUpcomingVersion,
  updateDocsVersionSwitcher,
};
