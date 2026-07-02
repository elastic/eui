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

/**
 * The test-runner is invoked once per variant.
 * These names must match the keys of the `VARIANTS` map in `.storybook/vrt.ts`.
 */
const VARIANTS = ['desktop', 'mobile'];

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
      'Run tests inside a Linux Docker container (matching CI) to generate Linux-compatible screenshots. Defaults to true locally, false in CI.',
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

  const dockerImage = `mcr.microsoft.com/playwright:v${playwrightVersion}-jammy`;

  // On macOS, Docker containers can't reach the host through localhost; use `host.docker.internal` instead.
  // If no URL is provided, inject the default port with the correct hostname so the container can reach the
  // Storybook dev server running on the host.
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

  // Mount the full monorepo root so yarn can resolve `workspace:*` dependencies
  // across sibling packages (e.g. `@elastic/eui-theme-common`).
  const repoRoot = findRepoRoot(__dirname);
  const workspaceDir = path.relative(repoRoot, process.cwd());
  const nodeVersion = fs
    .readFileSync(path.join(repoRoot, '.nvmrc'), 'utf8')
    .trim();

  const argsSuffix = testStorybookArgs.length
    ? ' ' + testStorybookArgs.join(' ')
    : '';

  const setup = [
    `npm install -g n`,
    `n ${nodeVersion}`,
    `hash -r`,
    'corepack enable',
    'yarn',
    `cd ${workspaceDir}`,
    'yarn playwright install chromium',
  ].join(' && ');

  // `--network=host` lets containers reach host services on Linux;
  // Docker Desktop on macOS handles `host.docker.internal` automatically
  const networkFlag = process.platform === 'linux' ? '--network=host ' : '';

  const dockerRun = (innerCmd) =>
    `docker run --rm -i --platform linux/amd64 ${networkFlag}-v "${repoRoot}:/work" -w /work ${dockerImage} bash -c ${JSON.stringify(
      innerCmd
    )}`;

  console.log(`Running visual regression tests in Docker (${dockerImage})`);

  // Run each variant in its OWN container. Sharing a single container let the
  // first variant leak Chromium processes/memory that starve the next one under
  // amd64 emulation, tripping the per-test timeout on the second variant.
  // `--testTimeout` adds headroom for the slower emulated environment. All
  // variants run even if an earlier one fails, so we still generate every
  // baseline/diff; a non-zero exit is propagated if any variant reported diffs.

  let failed = false;

  for (const variant of VARIANTS) {
    console.log(`\n--- Variant: ${variant}`);
    const innerCmd = `set -e; ${setup}; VRT_VARIANT=${variant} yarn test-storybook --testTimeout=30000${argsSuffix}`;

    try {
      execSync(dockerRun(innerCmd), { stdio: 'inherit' });
    } catch {
      failed = true;
    }
  }
  process.exit(failed ? 1 : 0);
}

// Safe-guard to ensure the browser is installed before running the tests
execSync('yarn playwright install chromium', { stdio: 'inherit' });

console.log('Running visual regression tests');

const baseCmd = [
  'yarn test-storybook',
  isUpdate && '--updateSnapshot',
  argv.url && `--url ${argv.url}`,
  ...extraArgs,
]
  .filter(Boolean)
  .join(' ');

// Run each variant in its own test-runner process (clean slate per variant).
// Run all variants even if one fails, then exit non-zero if any reported diffs.
let failed = false;

for (const variant of VARIANTS) {
  console.log(`\n--- Variant: ${variant}`);

  try {
    execSync(baseCmd, {
      stdio: 'inherit',
      env: { ...process.env, VRT_VARIANT: variant },
    });
  } catch {
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
