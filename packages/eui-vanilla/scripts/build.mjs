/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as esbuild from 'esbuild';
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { assertComponentIds } from './ids.mjs';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = join(pkgRoot, '..');
const generatedDir = join(pkgRoot, 'generated');

const componentIds = assertComponentIds(pkgRoot);
const sheetIds = ['base', ...componentIds];

const emptyAsset = {
  name: 'empty-asset',
  setup(build) {
    build.onResolve({ filter: /\.(scss|css|svg)$/ }, (args) => ({
      path: args.path,
      namespace: 'empty-asset',
    }));
    build.onLoad({ filter: /.*/, namespace: 'empty-asset' }, () => ({
      contents: 'export default ""',
      loader: 'js',
    }));
  },
};

mkdirSync(join(pkgRoot, 'tmp'), { recursive: true });
const generateOut = join(pkgRoot, 'tmp/generate.mjs');

await esbuild.build({
  absWorkingDir: pkgRoot,
  entryPoints: [join(pkgRoot, 'scripts/generate-css.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: generateOut,
  jsx: 'automatic',
  alias: {
    '@elastic/eui-theme-common': join(
      packagesRoot,
      'eui-theme-common/src/index.ts'
    ),
    '@elastic/eui-theme-borealis': join(
      packagesRoot,
      'eui-theme-borealis/src/index.ts'
    ),
  },
  plugins: [emptyAsset],
});

const generated = spawnSync(process.execPath, [generateOut], {
  cwd: pkgRoot,
  stdio: 'inherit',
});

if (generated.status !== 0) process.exit(generated.status ?? 1);

const minifiedCss = {};
for (const file of readdirSync(generatedDir)
  .filter((name) => name.endsWith('.css'))
  .sort()) {
  const path = join(generatedDir, file);
  const { code } = await esbuild.transform(readFileSync(path, 'utf8'), {
    loader: 'css',
    minify: true,
  });
  writeFileSync(path, code);
  minifiedCss[file] = code;
  console.log(`minified generated/${file} (${code.length} bytes)`);
}

for (const id of sheetIds) {
  const file = `${id}.css`;

  if (!minifiedCss[file]) {
    throw new Error(`Missing generated/${file} after generate`);
  }
}
