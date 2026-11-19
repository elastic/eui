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

test('hints to build workspaces when a plugin fails to load', async (t) => {
  const dir = fs.mkdtempSync(path.join(__dirname, 'tmp-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(
    path.join(dir, '.eslintrc.json'),
    JSON.stringify({ root: true, plugins: ['not-built'] })
  );

  await assert.rejects(eslintTask(dir)([path.join(dir, 'index.js')]), {
    message:
      /^Failed to load plugin 'not-built'.*\nRun `yarn workspace @elastic\/eui build:workspaces` first\.$/,
  });
});

test('passes arguments before workspace-relative file paths', async () => {
  const task = eslintTask(themeCommonDir, ['--max-warnings 0']);
  const file = path.join(themeCommonDir, 'src/index.ts');

  assert.equal(
    await task([file]),
    'eslint --fix --max-warnings 0 "src/index.ts"'
  );
});
