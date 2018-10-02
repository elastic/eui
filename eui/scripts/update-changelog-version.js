const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cwd = path.resolve(__dirname, '..');

const pathToPackage = path.resolve(cwd, 'package.json');
const { version } = require(pathToPackage);

const pathToChangelog = path.resolve(cwd, 'CHANGELOG.md');
let changelogContents = fs.readFileSync(pathToChangelog).toString();

const masterHeading = '## [`master`](https://github.com/elastic/eui/tree/master)';
// sanity check, changelog should start with master heading
if (changelogContents.indexOf(masterHeading) !== 0) {
  console.error(`Cannot update CHANGELOG.md: does not start with expected heading "${masterHeading}"`);
  process.exit(1);
}

// Insert the changelog template after the master header
changelogContents = changelogContents.replace(
  masterHeading,
  `${masterHeading}

No public interface changes since \`${version}\`.

## [\`${version}\`](https://github.com/elastic/eui/tree/v${version})`
);

// Save the new changelog contents
fs.writeFileSync(pathToChangelog, changelogContents);

// Tell git to track the updated changelog
execSync('git add CHANGELOG.md', { cwd });
