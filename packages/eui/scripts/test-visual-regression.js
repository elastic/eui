const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function findRepoRoot(start) {
  let dir = start;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.git'))) return dir;
    dir = path.dirname(dir);
  }
  return start;
}

const { argv } = yargs(hideBin(process.argv))
  .parserConfiguration({
    // @see https://github.com/yargs/yargs-parser#configuration
    'camel-case-expansion': false,
    'unknown-options-as-args': true,
    'halt-at-non-option': true,
  })
  .option('url', {
    type: 'string',
    description:
      'Storybook URL to run tests against. Defaults to the local dev server (http://localhost:6006).',
  })
  .option('docker', {
    type: 'boolean',
    description:
      'Run tests inside a Linux Docker container (matching CI) to generate Linux-compatible screenshots. Defaults to true locally, false in CI. Use --no-docker to disable.',
  });

const isUpdate = argv._.includes('update');
const extraArgs = argv._.filter((arg) => arg !== 'update');
const isCI = Boolean(process.env.CI || process.env.BUILDKITE);
const useDocker = argv.docker !== undefined ? argv.docker : !isCI;

if (useDocker) {
  let playwrightVersion;
  try {
    playwrightVersion = require('@playwright/test/package.json').version;
  } catch {
    playwrightVersion = require('playwright-core/package.json').version;
  }

  const dockerImage = `mcr.microsoft.com/playwright:v${playwrightVersion}-noble`;

  // On macOS, Docker containers can't reach the host via localhost; use `host.docker.internal` instead.
  // If no URL is provided, inject the default port with the correct hostname so the container can
  // reach the Storybook dev server running on the host.
  let url = argv.url;
  if (process.platform === 'darwin') {
    url = (url || 'http://localhost:6006')
      .replace(/\blocalhost\b/g, 'host.docker.internal')
      .replace(/127\.0\.0\.1/g, 'host.docker.internal');
  }

  const testStorybookArgs = [
    isUpdate && '--updateSnapshot',
    url && `--url ${url}`,
    ...extraArgs,
  ].filter(Boolean);

  // Mount the full monorepo root so yarn can resolve workspace:* dependencies
  // across sibling packages (e.g. @elastic/eui-theme-common).
  const repoRoot = findRepoRoot(__dirname);
  const workspaceDir = path.relative(repoRoot, process.cwd());
  const nodeVersion = fs.readFileSync(path.join(repoRoot, '.nvmrc'), 'utf8').trim();

  const innerCmd = [
    `npm install -g n && n ${nodeVersion} && hash -r`,
    'corepack enable',
    'yarn',
    `cd ${workspaceDir}`,
    'yarn playwright install chromium',
    `yarn test-storybook${
      testStorybookArgs.length ? ' ' + testStorybookArgs.join(' ') : ''
    }`,
  ].join(' && ');

  // `--network=host` lets containers reach host services on Linux;
  // Docker Desktop on macOS handles `host.docker.internal` automatically
  const networkFlag = process.platform === 'linux' ? '--network=host ' : '';

  console.log(`Running visual regression tests in Docker (${dockerImage})`);
  execSync(
    `docker run --rm -i ${networkFlag}-v "${repoRoot}:/work" -w /work ${dockerImage} bash -c ${JSON.stringify(
      innerCmd
    )}`,
    { stdio: 'inherit' }
  );
  process.exit(0);
}

// Safe-guard to ensure the browser is installed before running the tests
execSync('yarn playwright install chromium', { stdio: 'inherit' });

console.log('Running visual regression tests');

const cmd = [
  'yarn test-storybook',
  isUpdate && '--updateSnapshot',
  argv.url && `--url ${argv.url}`,
  ...extraArgs,
];

execSync(cmd.filter(Boolean).join(' '), { stdio: 'inherit' });
