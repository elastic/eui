const chokidar = require('chokidar');
const chalk = require('chalk');
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs/promises');

// Constants for Kibana local testing
const SHOULD_SYNC_TO_KIBANA = process.argv.includes('--kibana');
const EUI_ROOT = execSync('git rev-parse --show-toplevel', {
  encoding: 'utf-8',
}).trim();
const KIBANA_ROOT = path.resolve(EUI_ROOT, '../kibana');
const KIBANA_NODE_MODULES = path.join(KIBANA_ROOT, 'node_modules');
const KIBANA_NODE_MODULES_EUI = path.join(
  KIBANA_NODE_MODULES,
  '@elastic',
  'eui'
);

// Constants for EUI watch mode
const EUI_WORKSPACE = path.join(
  EUI_ROOT,
  execSync(
    `yarn workspaces list --json | jq -r 'select(.name == "@elastic/eui") | .location'`,
    { encoding: 'utf-8', cwd: EUI_ROOT }
  ).trim()
);
const EUI_WORKSPACE_SRC = path.join(EUI_WORKSPACE, 'src');
const COMPILE_EUI_SCRIPT = path.join(__dirname, 'compile-eui.js');

let isCompiling = false;
let queuedCompile = false;
let isInitialCompile = true;

function runCompile() {
  if (isCompiling) {
    queuedCompile = true;
    return;
  }

  isCompiling = true;

  if (isInitialCompile) {
    console.log('Initial compilation...');
    isInitialCompile = false;
  } else {
    console.log('Change detected, running compile...');
  }

  const child = spawn('node', [COMPILE_EUI_SCRIPT, ...process.argv.slice(2)], {
    stdio: 'inherit',
  });

  child.on('close', async (code) => {
    isCompiling = false;

    if (code === 0) {
      console.log(chalk.green('✔ Finished watching compile'));

      await moveToKibana();

      if (queuedCompile) {
        queuedCompile = false;
        runCompile();
      }
    } else {
      console.log(chalk.red('Watch compile failed. Waiting for changes...'));

      // Don't re-run a failed compile automatically
      queuedCompile = false;
    }
  });
}

const watcher = chokidar.watch(EUI_WORKSPACE_SRC, {
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../, // ignore dotfiles
});

console.log('Watching for changes in `src/`...');

watcher.on('add', () => runCompile());
watcher.on('change', () => runCompile());
watcher.on('unlink', () => runCompile());
watcher.on('addDir', () => runCompile());
watcher.on('unlinkDir', () => runCompile());

async function moveToKibana() {
  if (!SHOULD_SYNC_TO_KIBANA) return;

  try {
    try {
      await fs.access(KIBANA_ROOT);
    } catch {
      console.log(
        chalk.yellow(`Kibana directory not found at ${KIBANA_ROOT}. Skipping.`)
      );
      return;
    }

    await fs.mkdir(KIBANA_NODE_MODULES_EUI, { recursive: true });

    const tarballName = 'eui-watch.tgz';
    const tarballPath = path.join(EUI_WORKSPACE, tarballName);

    try {
      console.log(`Generating tarball...`);

      execSync(`yarn pack --filename "${tarballPath}"`, {
        cwd: EUI_WORKSPACE,
        stdio: 'ignore',
      });

      console.log(`Extracting tarball into ${KIBANA_NODE_MODULES_EUI}...`);

      execSync(
        `tar -xzf "${tarballPath}" -C "${KIBANA_NODE_MODULES_EUI}" --strip-components=1`
      );

      // Touch `package.json` to update the modified time
      const now = new Date();
      await fs.utimes(
        path.join(KIBANA_NODE_MODULES_EUI, 'package.json'),
        now,
        now
      );

      console.log(chalk.green('✔ Successfully updated EUI in Kibana'));
    } finally {
      // Clean up the tarball
      await fs.rm(tarballPath, { force: true });
    }
  } catch (e) {
    console.log(chalk.red('Failed to extract in Kibana:', e));
  }
}

runCompile();
