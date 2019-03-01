const fs = require('fs');
const path = require('path');
const git = require('nodegit');
const semver = require('semver');

const repoDir = path.resolve(__dirname, '..');
const packagePath = path.resolve(repoDir, 'package.json');
const tokensPath = path.resolve(repoDir, 'src-docs', 'src', 'i18ntokens.json');
const tokensChangelogPath = path.resolve(repoDir, 'src-docs', 'src', 'i18ntokens_changelog.json');

const validVersionTypes = new Set(['patch', 'minor', 'major']);
const [, , versionIncrementType] = process.argv;

if (validVersionTypes.has(versionIncrementType) === false) {
  console.error(`Invalid version increment "${versionIncrementType}" passed`);
  process.exit(1);
}

const { version: oldPackageVersion } = require(packagePath);
const newPackageVersion = semver.inc(oldPackageVersion, versionIncrementType);

async function getFileContentsFromCommit(commit, filePath) {
  // https://github.com/nodegit/nodegit/blob/master/examples/read-file.js
  const entry = await commit.getEntry(filePath);
  const entryBlob = await entry.getBlob();
  return entryBlob.content().toString();
}

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
  // we're interested added, modified, or deleted tokens
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
        changeType: 'deleted'
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

async function commitTokenChanges(repo) {
  // two files to add to git and commit: i18ntokens.json and i18ntokens_changelog.json
  // https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js
  const index = await repo.refreshIndex();
  await index.addByPath('src-docs/src/i18ntokens.json');
  await index.addByPath('src-docs/src/i18ntokens_changelog.json');
  await index.write();
  const oid = await index.writeTree();
  const head = await git.Reference.nameToId(repo, 'HEAD');
  const parent = await repo.getCommit(head);

  const userSignature = await repo.defaultSignature();

  return await repo.createCommit('HEAD', userSignature, userSignature, 'update i18ntokens', oid, [parent]);
}

async function main() {
  const repo = await git.Repository.open(repoDir);
  const head = await repo.getHeadCommit();
  const diff = await git.Diff.indexToWorkdir(repo, null, { FLAGS: git.Diff.OPTION.INCLUDE_UNTRACKED });
  const patches = await diff.patches();

  while (patches.length > 0) {
    const patch = patches.pop();

    // iterate through git workspace changes looking for i18ntokens.json
    if (patch.oldFile().path() === 'src-docs/src/i18ntokens.json') {
      // i18n tokens has changed, load the previous version
      // const commit = await repo.getCommit(head);
      const originalTokens = JSON.parse(await getFileContentsFromCommit(head, 'src-docs/src/i18ntokens.json'));
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

      // always commit changes to i18ntokens.json
      await commitTokenChanges(repo);

      // stop iterating over workspace changes
      return;
    }
  }
}
main();
