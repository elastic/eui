const { spawn } = require('child_process');
const path = require('path');
const { parseArgs } = require('util');

const { values: args } = parseArgs({
  options: {
    'kibana-dir': { type: 'string', short: 'd' },
    package: { type: 'string', short: 'p' },
  },
});

const EUI_ROOT = path.resolve(__dirname, '..');
const KIBANA_ROOT = args['kibana-dir']
  ? path.resolve(process.cwd(), args['kibana-dir'])
  : path.resolve(__dirname, '../../kibana');
const SHUTDOWN_TIMEOUT = 5000;

const euiCommand = {
  command: process.execPath,
  args: [
    path.join(EUI_ROOT, 'scripts/watch-eui.js'),
    '--kibana-dir',
    KIBANA_ROOT,
    ...(args.package ? ['--package', args.package] : []),
  ],
  cwd: EUI_ROOT,
};
const kibanaCommands = [
  {
    command: 'pnpm',
    args: ['es', 'snapshot', '--license', 'trial'],
    cwd: KIBANA_ROOT,
  },
  {
    command: 'pnpm',
    args: ['exec', 'moon', 'run', '@kbn/ui-shared-deps-npm:watch-webpack'],
    cwd: KIBANA_ROOT,
  },
  {
    command: 'pnpm',
    args: ['start', '--no-cache'],
    cwd: KIBANA_ROOT,
  },
];

const children = new Set();
let exitCode = 0;
let stopping = false;

function stopChild(child, signal = 'SIGINT') {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null)
    return;

  if (process.platform === 'win32') {
    child.kill(signal);
    return;
  }

  try {
    process.kill(-child.pid, signal);
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  exitCode = code;

  children.forEach((child) => stopChild(child));

  const timeout = setTimeout(() => {
    children.forEach((child) => stopChild(child, 'SIGKILL'));
    process.exit(exitCode);
  }, SHUTDOWN_TIMEOUT);
  timeout.unref();
}

function startChild({ command, args, cwd }, stdio = 'inherit') {
  const child = spawn(command, args, {
    cwd,
    detached: process.platform !== 'win32',
    stdio,
  });
  children.add(child);

  child.on('error', (error) => {
    console.error(error.message);
    stop(1);
  });

  child.on('close', (code) => {
    children.delete(child);
    if (!stopping) stop(code || 1);
    if (stopping && children.size === 0) process.exit(exitCode);
  });

  return child;
}

const euiWatcher = startChild(euiCommand, [
  'inherit',
  'inherit',
  'inherit',
  'ipc',
]);
euiWatcher.once('message', (message) => {
  if (message === 'ready' && !stopping) {
    kibanaCommands.forEach((command) => startChild(command));
  }
});

process.once('SIGINT', () => stop());
process.once('SIGTERM', () => stop());
