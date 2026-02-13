const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs/promises');
const { parseArgs } = require('util');
const chokidar = require('chokidar');
const chalk = require('chalk');

const { values } = parseArgs({
  options: {
    package: { type: 'string', short: 'p' },
    kibana: { type: 'boolean', short: 'k' },
    'kibana-dir': { type: 'string', short: 'd' },
  },
  strict: false,
});

const EUI_ROOT = path.resolve(__dirname, '..');
const KIBANA_ROOT = values['kibana-dir']
  ? path.resolve(process.cwd(), values['kibana-dir'])
  : path.resolve(EUI_ROOT, '../kibana');
const DEBOUNCE_TIME = 300;

const PACKAGE_DEFS = {
  common: {
    dir: 'eui-theme-common',
    cmd: 'yarn',
    args: ['workspace', '@elastic/eui-theme-common', 'build'],
  },
  borealis: {
    dir: 'eui-theme-borealis',
    cmd: 'yarn',
    args: ['workspace', '@elastic/eui-theme-borealis', 'build'],
  },
  eui: {
    dir: 'eui',
    cmd: 'yarn',
    args: [
      'workspace',
      '@elastic/eui',
      'node',
      './scripts/compile-eui.js',
      ...process.argv.slice(2),
    ],
  },
};

const selection = values.package
  ? [values.package]
  : ['common', 'borealis', 'eui'];

const activePackages = selection.map((key) => {
  const def = PACKAGE_DEFS[key];

  if (!def) {
    console.error(chalk.red(`Unknown package: ${key}`));
    process.exit(1);
  }

  return {
    key,
    ...def,
    path: path.join(EUI_ROOT, 'packages', def.dir),
    src: path.join(EUI_ROOT, 'packages', def.dir, 'src'),
    status: { activeProcess: null, abortPending: false, resolvePromise: null },
  };
});

async function syncToKibana(pkg) {
  if (!values.kibana && !values['kibana-dir']) return;
  try {
    /** `files` array from `package.json` that defines build artifacts */
    const pkgJson = JSON.parse(
      await fs.readFile(path.join(pkg.path, 'package.json'), 'utf-8')
    );
    const destDir = path.join(KIBANA_ROOT, 'node_modules', pkgJson.name);

    await fs.access(KIBANA_ROOT);

    const syncItems = [
      ...new Set([
        'package.json',
        // strip globs so that e.g. dist/* becomes dist/
        ...(pkgJson.files || []).map((f) => f.split('*')[0]),
      ]),
    ];

    for (const item of syncItems) {
      if (item.startsWith('!') || !item) continue;
      await fs.cp(path.join(pkg.path, item), path.join(destDir, item), {
        recursive: true,
        force: true,
        dereference: true,
      });
    }

    // update `package.json` file modify timestamp
    await fs
      .utimes(path.join(destDir, 'package.json'), new Date(), new Date())
      .catch(() => {});

    console.log(chalk.green(`✔ Synced ${pkgJson.name}`));
  } catch (err) {
    console.error(chalk.red(`Sync failed: ${err.message}`));
  }
}

function runBuild(pkg) {
  if (pkg.status.activeProcess) {
    pkg.status.abortPending = true;
    pkg.status.activeProcess.kill('SIGTERM');
    return;
  }

  console.log(chalk.blue(`\nBuilding ${pkg.key}...`));

  const start = Date.now();

  pkg.status.activeProcess = spawn(pkg.cmd, pkg.args, {
    cwd: EUI_ROOT,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: 'true' },
  });

  pkg.status.activeProcess.on('close', async (code) => {
    const wasAborted = pkg.status.abortPending;
    const resolveInitial = pkg.status.resolvePromise;

    pkg.status.activeProcess = null;
    pkg.status.abortPending = false;
    pkg.status.resolvePromise = null;

    if (wasAborted) {
      console.log(
        chalk.yellow(`⚡ Build for ${pkg.key} cancelled. Restarting...`)
      );
      runBuild(pkg);
      return;
    }

    if (code === 0) {
      console.log(chalk.green(`✔ Built ${pkg.key} (${Date.now() - start}ms)`));
      await syncToKibana(pkg);
    } else {
      console.log(chalk.red(`✘ Build failed [${pkg.key}]`));
    }

    if (resolveInitial) resolveInitial();
  });
}

// kill all processes on exit signal
process.on('SIGINT', () => {
  console.log(chalk.bold.yellow('\nShutting down...'));

  activePackages.forEach((pkg) => {
    if (pkg.status.activeProcess) pkg.status.activeProcess.kill('SIGKILL');
  });

  process.exit(0);
});

const IGNORED_FILES = /(^|[\/\\])\../;

(async () => {
  console.log(chalk.bold.cyan('Starting EUI watcher...'));

  for (const pkg of activePackages) {
    chokidar
      .watch(pkg.src, { ignoreInitial: true, ignored: IGNORED_FILES })
      .on('all', () => {
        clearTimeout(pkg.timer);
        pkg.timer = setTimeout(() => runBuild(pkg), DEBOUNCE_TIME);
      });

    await new Promise((resolve) => {
      pkg.status.resolvePromise = resolve;
      runBuild(pkg);
    });
  }

  console.log(
    chalk.bold.green('\nWatcher is ready and listening for changes...')
  );
})();
