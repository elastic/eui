const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { eslintTask } = require('./eslint');

const euiDir = path.resolve(__dirname, '../../packages/eui');
const themeCommonDir = path.resolve(
  __dirname,
  '../../packages/eui-theme-common'
);

const lintable = path.join(euiDir, 'src/components/button/button.tsx');
const ignored = path.join(euiDir, 'src/components/index.d.ts');

test('lints only files not matched by .eslintignore', async () => {
  const task = eslintTask(euiDir);

  assert.equal(
    await task([lintable, ignored]),
    'eslint --fix "src/components/button/button.tsx"'
  );
});

test('returns no commands when every file is ignored', async () => {
  const task = eslintTask(euiDir);

  assert.deepEqual(await task([ignored]), []);
});

const hint = 'Run `yarn workspace @elastic/eui build:workspaces` first.';

const workspaceWithPlugin = (t, plugin) => {
  const dir = fs.mkdtempSync(path.join(__dirname, 'tmp-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(
    path.join(dir, '.eslintrc.json'),
    JSON.stringify({ root: true, plugins: [plugin] })
  );
  return dir;
};

test('hints to build workspaces when the EUI plugin is not built', async (t) => {
  const dir = workspaceWithPlugin(t, '@elastic/eui');
  const pluginDir = path.join(dir, 'node_modules/@elastic/eslint-plugin-eui');
  fs.mkdirSync(pluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(pluginDir, 'package.json'),
    JSON.stringify({ main: 'lib/cjs/index.js' })
  );

  await assert.rejects(
    eslintTask(dir)([path.join(dir, 'index.js')]),
    (error) => {
      assert.match(error.message, /^Failed to load plugin '@elastic\/eui'/);
      assert.ok(error.message.endsWith(`\n\n${hint}`));
      return true;
    }
  );
});

test('keeps other plugin errors unchanged', async (t) => {
  const dir = workspaceWithPlugin(t, 'not-installed');

  await assert.rejects(
    eslintTask(dir)([path.join(dir, 'index.js')]),
    (error) => {
      assert.match(error.message, /^Failed to load plugin 'not-installed'/);
      assert.ok(!error.message.includes(hint));
      return true;
    }
  );
});

test('passes arguments before workspace-relative file paths', async () => {
  const task = eslintTask(themeCommonDir, ['--max-warnings 0']);
  const file = path.join(themeCommonDir, 'src/index.ts');

  assert.equal(
    await task([file]),
    'eslint --fix --max-warnings 0 "src/index.ts"'
  );
});
