const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs/promises');
const { parseArgs } = require('util');
const chokidar = require('chokidar');
const chalk = require('chalk');
const minimatch = require('minimatch');
const {
  IGNORE_BUILD,
  IGNORE_TESTS,
  IGNORE_TESTENV,
  IGNORE_PACKAGES,
} = require('./constants');
const kibanaWatch = require('./watch-eui-kibana');

const { values: args } = parseArgs({
  options: {
    package: { type: 'string', short: 'p' },
    kibana: { type: 'boolean', short: 'k' },
    'kibana-dir': { type: 'string', short: 'd' },
  },
  strict: false,
});

const EUI_ROOT = path.resolve(__dirname, '..');
const KIBANA_ROOT = args['kibana-dir']
  ? path.resolve(process.cwd(), args['kibana-dir'])
  : // fallback to a sibling directory
    path.resolve(EUI_ROOT, '../kibana');
const USE_KIBANA_SYNC = Boolean(args.kibana || args['kibana-dir']);
const DEBOUNCE_TIME = 300;
const RESTART_DELAY = 500;
const SHUTDOWN_TIMEOUT = 1000;

let workspaceMap;

try {
  const workspaces = execSync('yarn workspaces list --json', {
    cwd: EUI_ROOT,
    encoding: 'utf-8',
  });

  workspaceMap = workspaces
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line))
    .reduce((acc, ws) => {
      acc[ws.name] = path.join(EUI_ROOT, ws.location);
      return acc;
    }, {});
} catch (err) {
  console.error(chalk.red(`Failed to list workspaces: ${err.message}`));
  process.exit(1);
}

const PACKAGES = [
  '@elastic/eui-theme-common',
  '@elastic/eui-theme-borealis',
  '@elastic/eui',
];

const selection = args.package ? [args.package] : PACKAGES;

const activePackages = selection.map((name) => {
  const pkgPath = workspaceMap[name];
  if (!pkgPath) {
    console.error(chalk.red(`Unknown package: ${name}`));
    process.exit(1);
  }

  const kibanaEui = USE_KIBANA_SYNC && name === '@elastic/eui';

  return {
    name,
    path: pkgPath,
    src: path.join(pkgPath, 'src'),
    kibanaEui,
    cmd: 'yarn',
    args: kibanaEui
      ? ['workspace', name, 'run', 'build:optimize-es']
      : [
          'workspace',
          name,
          'build',
          ...(name === '@elastic/eui' &&
          process.argv.includes('--no-declarations')
            ? ['--no-declarations']
            : []),
        ],
    dirtyFiles: new Set(),
    unlinkedFiles: new Set(),
    status: {
      activeProcess: null,
      abortPending: false,
      resolvePromise: null,
      building: false,
      queued: false,
      isInitial: true,
    },
    timer: null,
  };
});

async function syncToKibana(pkg) {
  if (!USE_KIBANA_SYNC) return;
  try {
    // `files` array from `package.json` that defines build artifacts
    const pkgJson = JSON.parse(
      await fs.readFile(path.join(pkg.path, 'package.json'), 'utf-8')
    );
    const destDir = path.join(KIBANA_ROOT, 'node_modules', pkgJson.name);

    await fs.access(path.join(KIBANA_ROOT, 'node_modules'));

    const syncItems = [
      ...new Set([
        'package.json',
        ...(pkgJson.files || []).filter(
          (f) => !f.includes('*') && !f.startsWith('!')
        ),
      ]),
    ];

    for (const item of syncItems) {
      if (!item) continue;
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

    console.log(
      chalk.green(
        `✔ Propagated ${pkgJson.name} to ${destDir}. Check Kibana output.`
      )
    );
  } catch (err) {
    console.error(chalk.red(`Sync failed: ${err.message}`));
  }
}

function spawnPackageBuild(pkg) {
  return new Promise((resolve, reject) => {
    pkg.status.activeProcess = spawn(pkg.cmd, pkg.args, {
      cwd: EUI_ROOT,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: 'true' },
    });

    pkg.status.activeProcess.on('close', (code) => {
      pkg.status.activeProcess = null;
      if (pkg.status.abortPending) {
        pkg.status.abortPending = false;
        resolve({ aborted: true });
        return;
      }
      if (code === 0) {
        resolve({ aborted: false });
        return;
      }
      reject(new Error(`exit ${code}`));
    });
  });
}

async function runKibanaEuiBuild(pkg) {
  if (pkg.status.building) {
    pkg.status.queued = true;
    return;
  }

  pkg.status.building = true;

  const dirty = [...pkg.dirtyFiles];
  const unlinked = [...pkg.unlinkedFiles];
  pkg.dirtyFiles.clear();
  pkg.unlinkedFiles.clear();

  const doFull =
    pkg.status.isInitial ||
    dirty.length >= kibanaWatch.FULL_REBUILD_THRESHOLD;

  const start = Date.now();
  console.log(
    chalk.blue(
      `\nBuilding ${pkg.name} (${doFull ? 'optimize/es' : `incremental ${dirty.length} file(s)`})...`
    )
  );

  try {
    if (doFull) {
      const { aborted } = await spawnPackageBuild(pkg);
      if (aborted) {
        console.log(
          chalk.yellow(`⚡ Build for ${pkg.name} cancelled. Restarting...`)
        );
        pkg.status.queued = true;
      } else {
        await kibanaWatch.syncOptimizeEsTree(
          KIBANA_ROOT,
          pkg.name,
          pkg.path
        );
        console.log(
          chalk.green(
            `✔ Propagated ${pkg.name} optimize/ to Kibana. Check Kibana output.`
          )
        );
        pkg.status.isInitial = false;
      }
    } else {
      const outputs = [];
      for (const file of dirty) {
        outputs.push(
          await kibanaWatch.compileFile(pkg.path, EUI_ROOT, file)
        );
      }

      const removed = [];
      for (const file of unlinked) {
        removed.push(await kibanaWatch.unlinkOutput(pkg.path, file));
      }

      await kibanaWatch.unlinkDests(
        KIBANA_ROOT,
        pkg.name,
        pkg.path,
        removed
      );
      await kibanaWatch.syncOutputs(
        KIBANA_ROOT,
        pkg.name,
        pkg.path,
        outputs
      );
      console.log(
        chalk.green(
          `✔ Propagated ${outputs.filter(Boolean).length} file(s) to Kibana. Check Kibana output.`
        )
      );
    }

    console.log(chalk.green(`✔ Built ${pkg.name} (${Date.now() - start}ms)`));
  } catch (err) {
    console.log(chalk.red(`✘ Build failed [${pkg.name}] ${err.message}`));
  } finally {
    const resolveInitial = pkg.status.resolvePromise;
    pkg.status.resolvePromise = null;
    pkg.status.building = false;
    if (resolveInitial) resolveInitial();

    if (pkg.status.queued || pkg.dirtyFiles.size || pkg.unlinkedFiles.size) {
      pkg.status.queued = false;
      setTimeout(() => runKibanaEuiBuild(pkg), RESTART_DELAY);
    }
  }
}

function runBuild(pkg) {
  if (pkg.kibanaEui) {
    runKibanaEuiBuild(pkg);
    return;
  }

  if (pkg.status.activeProcess) {
    pkg.status.abortPending = true;
    pkg.status.activeProcess.kill('SIGTERM');
    return;
  }

  console.log(chalk.blue(`\nBuilding ${pkg.name}...`));

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
        chalk.yellow(`⚡ Build for ${pkg.name} cancelled. Restarting...`)
      );

      setTimeout(() => runBuild(pkg), RESTART_DELAY);
      return;
    }

    if (code === 0) {
      console.log(chalk.green(`✔ Built ${pkg.name} (${Date.now() - start}ms)`));
      await syncToKibana(pkg);
    } else {
      console.log(chalk.red(`✘ Build failed [${pkg.name}]`));
    }

    if (resolveInitial) resolveInitial();
  });
}

// kill all processes on exit signal
process.on('SIGINT', () => {
  console.log(chalk.bold.yellow('\nShutting down...'));

  activePackages.forEach((pkg) => {
    clearTimeout(pkg.timer);
    if (pkg.status.activeProcess) {
      pkg.status.activeProcess.kill('SIGTERM');
    }
  });

  setTimeout(() => process.exit(0), SHUTDOWN_TIMEOUT);
});

const IGNORE_DOTFILES = ['**/.*', '**/.*/**'];
const IGNORED_FILES = [
  ...IGNORE_DOTFILES,
  ...IGNORE_BUILD,
  ...IGNORE_TESTS,
  ...IGNORE_TESTENV,
  ...IGNORE_PACKAGES,
];

(async () => {
  console.log(chalk.bold.cyan('Starting EUI watcher...'));
  if (USE_KIBANA_SYNC) {
    console.log(
      chalk.cyan(
        `Kibana sync → ${KIBANA_ROOT} (@elastic/eui: optimize/es incremental)`
      )
    );
  }

  for (const pkg of activePackages) {
    chokidar
      .watch(pkg.src, {
        ignoreInitial: true,
        ignored: (filePath) => {
          return IGNORED_FILES.some((pattern) =>
            minimatch(filePath, pattern, { matchBase: true })
          );
        },
      })
      .on('all', (event, filePath) => {
        if (pkg.kibanaEui && filePath) {
          if (event === 'unlink') {
            pkg.unlinkedFiles.add(filePath);
            pkg.dirtyFiles.delete(filePath);
          } else if (event === 'add' || event === 'change') {
            pkg.dirtyFiles.add(filePath);
          }
        }
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
