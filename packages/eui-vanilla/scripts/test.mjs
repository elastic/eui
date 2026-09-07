import { globSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = globSync('src/**/*.test.ts', { cwd: root });

if (!files.length) {
  console.log('no tests');
  process.exit(0);
}

const result = spawnSync(
  process.execPath,
  ['--import', 'tsx', '--test', ...files],
  { cwd: root, stdio: 'inherit' }
);

process.exit(result.status ?? 1);
