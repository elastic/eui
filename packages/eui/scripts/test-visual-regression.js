const { execFileSync, execSync, spawn, spawnSync } = require('child_process');
const fs = require('fs');
const net = require('net');
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

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = findRepoRoot(PACKAGE_ROOT);

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
  })
  .option('static', {
    type: 'boolean',
    description:
      'Serve a static Storybook build (like CI) instead of the dev server, avoiding the networkidle stalls that make `waitForPageReady` time out locally under emulation. Defaults on locally; use `--no-static` for the dev server. Ignored when `--url` is set.',
  })
  .option('build', {
    type: 'boolean',
    description:
      'Rebuild the static Storybook before running (default in `--static` mode, so runs reflect story changes). Use `--no-build` to reuse an existing `storybook-static` directory.',
  });

const isUpdate = argv._.includes('update');
const extraArgs = argv._.filter((arg) => arg !== 'update');
const isCI = Boolean(process.env.CI || process.env.BUILDKITE);
const useDocker = argv.docker !== undefined ? argv.docker : !isCI;
const useStatic =
  !argv.url && (argv.static !== undefined ? argv.static : !isCI);
const forceBuild = argv.build !== undefined ? argv.build : true;
const STATIC_DIR = 'storybook-static';
const STATIC_PORT = 6006;

const staticBuildExists = () =>
  fs.existsSync(path.join(PACKAGE_ROOT, STATIC_DIR));

const isPortOpen = (port) =>
  new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port });
    const finish = (isOpen) => {
      socket.destroy();
      resolve(isOpen);
    };

    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
  });

const waitForPort = async (port, timeout = 30000) => {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    if (await isPortOpen(port)) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for port ${port}`);
};

const stopStaticServer = (server) => {
  if (!server?.pid) return;

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', server.pid.toString(), '/t', '/f'], {
      stdio: 'ignore',
    });
    return;
  }

  try {
    process.kill(-server.pid);
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
};

const startStaticServer = async () => {
  if (await isPortOpen(STATIC_PORT)) {
    throw new Error(`Port ${STATIC_PORT} is already in use`);
  }

  // `detached` lets cleanup terminate both yarn and http-server.
  const server = spawn('yarn', ['serve-storybook'], {
    stdio: 'inherit',
    detached: true,
    cwd: PACKAGE_ROOT,
  });

  const serverFailed = new Promise((_, reject) => {
    server.once('error', reject);
    server.once('exit', (code) => {
      reject(new Error(`Static Storybook server exited with code ${code}`));
    });
  });

  try {
    await Promise.race([waitForPort(STATIC_PORT), serverFailed]);
    return server;
  } catch (error) {
    stopStaticServer(server);
    throw error;
  }
};

// Run every variant even when an earlier variant fails.
const runVariants = (runVariant) => {
  let failed = false;

  for (const variant of VARIANTS) {
    console.log(`\n--- Variant: ${variant}`);
    try {
      runVariant(variant);
    } catch {
      failed = true;
    }
  }

  return failed;
};

if (useDocker) {
  let playwrightVersion;
  try {
    playwrightVersion = require('@playwright/test/package.json').version;
  } catch {
    playwrightVersion = require('playwright-core/package.json').version;
  }

  const dockerImage = `mcr.microsoft.com/playwright:v${playwrightVersion}-jammy`;

  let url = argv.url;

  // Static mode serves inside the container over localhost, so this only
  // applies to the dev server: Docker Desktop containers can't reach the host
  // through localhost, so rewrite to `host.docker.internal`.
  if (
    !useStatic &&
    (process.platform === 'darwin' || process.platform === 'win32')
  ) {
    url = (url || 'http://localhost:6006')
      .replace(/\blocalhost\b/g, 'host.docker.internal')
      .replace(/127\.0\.0\.1/g, 'host.docker.internal');
  }

  const testStorybookArgs = [
    isUpdate && '--updateSnapshot',
    !useStatic && url && `--url ${url}`,
    ...extraArgs,
  ].filter(Boolean);

  // Mount the full monorepo root so yarn can resolve `workspace:*` dependencies
  // across sibling packages (e.g. `@elastic/eui-theme-common`).
  const workspaceDir = path.relative(REPO_ROOT, PACKAGE_ROOT);
  const nodeVersion = fs
    .readFileSync(path.join(REPO_ROOT, '.nvmrc'), 'utf8')
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

  const runInDocker = (innerCmd) => {
    const dockerArgs = [
      'run',
      '--rm',
      '-i',
      '--platform',
      'linux/amd64',
      process.platform === 'linux' && !useStatic && '--network=host',
      '-v',
      `${REPO_ROOT}:/work`,
      '-w',
      '/work',
      dockerImage,
      'bash',
      '-c',
      innerCmd,
    ].filter(Boolean);

    execFileSync('docker', dockerArgs, { stdio: 'inherit' });
  };

  console.log(`Running visual regression tests in Docker (${dockerImage})`);

  // Build in the container, not on the host: the container's `yarn` swaps
  // mounted `node_modules` binaries to Linux, breaking host builds.
  if (useStatic && (forceBuild || !staticBuildExists())) {
    console.log('Building static Storybook inside the container...');
    runInDocker(`set -e; ${setup}; yarn build-storybook`);
  } else if (useStatic) {
    console.log(`Reusing existing ${STATIC_DIR}/ (--no-build)`);
  }

  // Serve the build over localhost and wait for it to bind before testing;
  // flat files keep `networkidle` settling instantly (unlike the dev server).
  const staticServe = useStatic
    ? `yarn serve-storybook & server_pid=$!; ` +
      `for attempt in $(seq 1 60); do ` +
      `if ! kill -0 "$server_pid" 2>/dev/null; then echo "Static Storybook server exited before startup"; wait "$server_pid"; exit 1; fi; ` +
      `if (echo > /dev/tcp/127.0.0.1/${STATIC_PORT}) 2>/dev/null; then break; fi; ` +
      `sleep 0.5; done; ` +
      `if ! (echo > /dev/tcp/127.0.0.1/${STATIC_PORT}) 2>/dev/null; then echo "Timed out waiting for static Storybook on port ${STATIC_PORT}"; kill "$server_pid"; exit 1; fi; `
    : '';

  // `--maxWorkers`/`--testTimeout` add headroom for the slower emulated env.
  const failed = runVariants((variant) => {
    const innerCmd = `set -e; ${setup}; ${staticServe}VRT_VARIANT=${variant} yarn test-storybook --maxWorkers=2 --testTimeout=60000${argsSuffix}`;
    runInDocker(innerCmd);
  });

  process.exit(failed ? 1 : 0);
}

const runNativeTests = async () => {
  // Safe-guard to ensure the browser is installed before running the tests
  execSync('yarn playwright install chromium', {
    stdio: 'inherit',
    cwd: PACKAGE_ROOT,
  });

  console.log('Running visual regression tests');

  let staticServer;

  if (useStatic) {
    if (forceBuild || !staticBuildExists()) {
      console.log('Building static Storybook (yarn build-storybook)...');
      execSync('yarn build-storybook', {
        stdio: 'inherit',
        cwd: PACKAGE_ROOT,
      });
    } else {
      console.log(`Reusing existing ${STATIC_DIR}/ (--no-build)`);
    }

    staticServer = await startStaticServer();

    const stopStaticServerAndExit = () => {
      stopStaticServer(staticServer);
      process.exit(1);
    };

    process.on('exit', () => stopStaticServer(staticServer));
    process.on('SIGINT', stopStaticServerAndExit);
    process.on('SIGTERM', stopStaticServerAndExit);
  }

  const baseCmd = [
    'yarn test-storybook',
    !isCI && '--maxWorkers=2',
    !isCI && '--testTimeout=60000',
    isUpdate && '--updateSnapshot',
    !useStatic && argv.url && `--url ${argv.url}`,
    ...extraArgs,
  ]
    .filter(Boolean)
    .join(' ');

  const failed = runVariants((variant) => {
    execSync(baseCmd, {
      stdio: 'inherit',
      env: { ...process.env, VRT_VARIANT: variant },
      cwd: PACKAGE_ROOT,
    });
  });

  process.exit(failed ? 1 : 0);
};

runNativeTests().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
