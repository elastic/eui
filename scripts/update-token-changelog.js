const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { execSync } = require('child_process');

const repoDir = path.resolve(__dirname, '..');
const packagePath = path.resolve(repoDir, 'package.json');
const tokensPath = path.resolve(repoDir, 'i18ntokens.json');
const tokensChangelogPath = path.resolve(repoDir, 'i18ntokens_changelog.json');

const validVersionTypes = new Set(['patch', 'minor', 'major']);
const [, , versionIncrementType] = process.argv;

if (validVersionTypes.has(versionIncrementType) === false) {
  console.error(`Invalid version increment "${versionIncrementType}" passed`);
  process.exit(1);
}

const { version: oldPackageVersion } = require(packagePath);
const newPackageVersion = semver.inc(oldPackageVersion, versionIncrementType);

function getTokenMap(tokenInstances) {
  // tokenInstances is the total set of tokens across all files
  // reduce those down to a mapping of token -> defString
  const tokenMap = new Map();

  for (let i = 0; i < tokenInstances.length; i++) {
    const { token, defString } = tokenInstances[i];
    // we're assurred that overriding any `token` already encountered
    // has an identical `defString` as the token generation script otherwise fails
    tokenMap.set(token, defString);
  }

  return tokenMap;
}

function getTokenChanges(oldTokenInstances, newTokenInstances) {
  // we're interested in added, modified, or deleted tokens
  // addition or removal of a token in a single file is uninteresting unless that instance represents the whole usage of the token
  const oldTokens = getTokenMap(oldTokenInstances);
  const newTokens = getTokenMap(newTokenInstances);

  const changes = [];

  // check for token removals or modifications
  oldTokens.forEach((value, key) => {
    if (newTokens.has(key)) {
      // check if definition has changed
      const newValue = newTokens.get(key);
      if (newValue !== value) {
        // token has changed
        changes.push({
          token: key,
          changeType: 'modified',
          value: newValue,
        });
      }
    } else {
      // token has been removed
      changes.push({
        token: key,
        changeType: 'deleted',
      });
    }
  });

  // check for new tokens
  newTokens.forEach((value, key) => {
    if (oldTokens.has(key) === false) {
      // token is new
      changes.push({
        token: key,
        changeType: 'added',
        value,
      });
    }
  });

  return changes;
}

async function commitTokenChanges() {
  try {
    execSync('git add ./i18ntokens.json ./i18ntokens_changelog.json');
    execSync('git commit -m "update i18ntokens" -n');
    console.log('i18n token changes committed');
  } catch {
    const staging = execSync('git status').toString().trim();
    if (staging.includes('i18ntokens')) {
      console.error(
        'i18n tokens updates changed, but nothing was committed. Staging is still dirty'
      );
      process.exit(1);
    } else {
      console.log('No i18n token changes found to commit');
    }
  }
}

async function getPreviousI18nTokens() {
  const commitID = execSync(`git rev-parse v${oldPackageVersion}`)
    .toString()
    .trim();
  const fileContents = execSync(`git cat-file blob ${commitID}:i18ntokens.json`)
    .toString()
    .trim();
  return JSON.parse(fileContents);
}

async function main() {
  // check for i18n token differences between the current file & the most recent EUI version
  const originalTokens = await getPreviousI18nTokens();
  const newTokens = require(tokensPath);

  const changes = getTokenChanges(originalTokens, newTokens);

  // it's possible that no meaningful changes occurred
  if (changes.length > 0) {
    const changeLog = require(tokensChangelogPath);
    changeLog.unshift({
      version: newPackageVersion,
      changes,
    });
    fs.writeFileSync(tokensChangelogPath, JSON.stringify(changeLog, null, 2));
  }

  // commit pending changes to i18ntokens.json or i18ntokens_changelog.json
  await commitTokenChanges();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
