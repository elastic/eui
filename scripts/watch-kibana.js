const { spawn } = require('child_process');
const net = require('net');
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
    name: 'Elasticsearch',
    port: 9200,
    command: 'pnpm',
    args: ['es', 'snapshot', '--license', 'trial'],
    cwd: KIBANA_ROOT,
  },
  {
    name: 'Kibana',
    port: 5601,
    command: 'pnpm',
    args: ['start', '--no-cache'],
    cwd: KIBANA_ROOT,
  },
];

const children = new Set();
let exitCode = 0;
let stopping = false;

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port });

    socket.setTimeout(500);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

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

async function startKibanaProcesses() {
  for (const command of kibanaCommands) {
    if (command.port && (await isPortInUse(command.port))) {
      console.log(
        `${command.name} is already running on port ${command.port}, not starting it`
      );
    } else {
      startChild(command);
    }
  }
}

const euiWatcher = startChild(euiCommand, [
  'inherit',
  'inherit',
  'inherit',
  'ipc',
]);
euiWatcher.once('message', (message) => {
  if (message === 'ready' && !stopping) {
    startKibanaProcesses();
  }
});

process.once('SIGINT', () => stop());
process.once('SIGTERM', () => stop());
