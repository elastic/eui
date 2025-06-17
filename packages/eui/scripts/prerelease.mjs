import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execPromise = promisify(exec);

const getGitStatus = async () => {
  // See https://www.kernel.org/pub/software/scm/git/docs/git-status.html#_short_format
  const result = await execPromise('git status --porcelain');
  return result.stdout.trim().split('\n').reduce((files, line) => {
    const x = line[0];
    const y = line[1];
    const path = line.substring(3);

    files[path] = { x, y };
    return files;
  }, []);
};

const isFileModified = (gitStatus, pathFromRepositoryRoot) => {
  if (!Object.hasOwn(gitStatus, pathFromRepositoryRoot)) {
    return false;
  }

  return gitStatus[pathFromRepositoryRoot].y === 'M';
}

const commitI18nTokensChanges = async () => {
  const gitStatus = await getGitStatus();

  if (
    isFileModified(gitStatus, 'packages/eui/i18ntokens.json') ||
    isFileModified(gitStatus, 'packages/eui/i18ntokens_changelog.json')
  ) {
    await execPromise('git add ./i18ntokens.json ./i18ntokens_changelog.json');
    await execPromise('git commit -m "chore(eui): update i18ntokens" --no-verify ./i18ntokens.json ./i18ntokens_changelog.json');
    console.log('Detected and committed i18ntokens changes');
  } else {
    console.log('No i18ntokens changes detected');
  }
};

const main = async () => {
  try {
    await commitI18nTokensChanges();
  } catch (err) {
    console.error('Unable to commit i18ntokens changes');
    console.error(err);
    process.exit(1);
  }
};

await main();
