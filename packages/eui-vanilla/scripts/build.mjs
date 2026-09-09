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
  rmSync,
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
const expectedCssFiles = sheetIds.map((id) => `${id}.css`).sort();

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

rmSync(generatedDir, { recursive: true, force: true });

const generated = spawnSync(process.execPath, [generateOut], {
  cwd: pkgRoot,
  stdio: 'inherit',
});

if (generated.status !== 0) process.exit(generated.status ?? 1);

const generatedCssFiles = readdirSync(generatedDir)
  .filter((name) => name.endsWith('.css'))
  .sort();

if (
  generatedCssFiles.length !== expectedCssFiles.length ||
  generatedCssFiles.some((file, index) => file !== expectedCssFiles[index])
) {
  throw new Error(
    `Generated CSS files do not match the registry.\nExpected: ${expectedCssFiles.join(
      ', '
    )}\nReceived: ${generatedCssFiles.join(', ')}`
  );
}

for (const file of generatedCssFiles) {
  const path = join(generatedDir, file);
  const { code } = await esbuild.transform(readFileSync(path, 'utf8'), {
    loader: 'css',
    minify: true,
  });

  writeFileSync(path, code);
  console.log(`minified generated/${file} (${code.length} bytes)`);
}
