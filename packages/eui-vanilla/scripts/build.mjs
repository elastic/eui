/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as esbuild from 'esbuild';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = join(pkgRoot, '..');
const cssOnly = process.argv.includes('--css-only');
const generatedDir = join(pkgRoot, 'generated');
const distDir = join(pkgRoot, 'dist');

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

const generateOut = join(pkgRoot, 'tmp/generate.mjs');
mkdirSync(join(pkgRoot, 'tmp'), { recursive: true });

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

let css = '';
for (const file of readdirSync(generatedDir)
  .filter((name) => name.endsWith('.css'))
  .sort()) {
  const path = join(generatedDir, file);
  const { code } = await esbuild.transform(readFileSync(path, 'utf8'), {
    loader: 'css',
    minify: true,
  });

  writeFileSync(path, code);

  css += code;
  console.log(`minified generated/${file} (${code.length} bytes)`);
}

if (cssOnly) process.exit(0);

mkdirSync(distDir, { recursive: true });

const jsOut = join(distDir, 'eui-vanilla.js');
await esbuild.build({
  absWorkingDir: pkgRoot,
  entryPoints: [join(pkgRoot, 'src/index.ts')],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'EuiVanilla',
  outfile: jsOut,
  target: 'es2020',
});

const js = readFileSync(jsOut, 'utf8');
const html = `<!DOCTYPE html>
<html lang="en" data-color-mode="LIGHT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EUI Vanilla</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
${js}
    </script>
  </body>
</html>
`;

writeFileSync(join(distDir, 'index.html'), html);
console.log(`wrote dist/index.html (${html.length} bytes)`);
console.log(`wrote dist/eui-vanilla.js`);
