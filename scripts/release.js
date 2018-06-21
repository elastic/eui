// npm test && npm run build && npm version patch && git push upstream --tags && npm publish && npm run sync-docs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cwd = path.resolve('..');
const stdio = 'inherit';
const execOptions = { cwd, stdio };

// execSync('npm test', execOptions);
//
// execSync('npm run build', execOptions);

function getVersionTypeFromChangelog() {
  const pathToChangelog = path.resolve('..', '..', 'CHANGELOG.md');

  let changelog;
  try {
    changelog = fs.readFileSync(pathToChangelog).toString();
    // get contents between the first two headings
    const changes = changelog.match();
  } catch (e) {
    console.log(`Unable to read CHANGELOG.md at ${pathToChangelog}`);
  }
}
