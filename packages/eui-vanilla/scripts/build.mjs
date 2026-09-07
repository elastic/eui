/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as esbuild from 'esbuild';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = join(pkgRoot, '..');
const cssOnly = process.argv.includes('--css-only');
const generatedDir = join(pkgRoot, 'generated');
const distDir = join(pkgRoot, 'dist');
const sheetsDir = join(pkgRoot, 'scripts/css/sheets');

const camel = (id) => id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const sheetIds = readdirSync(sheetsDir)
  .filter((name) => name.endsWith('.ts'))
  .map((name) => name.slice(0, -3))
  .sort();

const componentIds = readdirSync(join(pkgRoot, 'src'), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      existsSync(join(pkgRoot, 'src', entry.name, 'mount.ts'))
  )
  .map((entry) => entry.name)
  .sort();

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

const sheetImports = sheetIds
  .map((id) =>
    id === 'base'
      ? `import { baseReset, baseSheet } from './scripts/css/sheets/base.ts';`
      : `import { ${camel(id)}Sheet } from './scripts/css/sheets/${id}.ts';`
  )
  .join('\n');

const sheetOutputs = `{\n${sheetIds
  .map((id) =>
    id === 'base'
      ? '  base: { reset: baseReset, sheets: [baseSheet] }'
      : `  ${JSON.stringify(id)}: { sheets: [${camel(id)}Sheet] }`
  )
  .join(',\n')}\n}`;

mkdirSync(join(pkgRoot, 'tmp'), { recursive: true });
const generateOut = join(pkgRoot, 'tmp/generate.mjs');

await esbuild.build({
  absWorkingDir: pkgRoot,
  stdin: {
    contents: `${sheetImports}
import { writeGenerated } from './scripts/generate-css.ts';
writeGenerated(${sheetOutputs});
`,
    resolveDir: pkgRoot,
    sourcefile: 'css-entry.ts',
    loader: 'ts',
  },
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

if (cssOnly) process.exit(0);

mkdirSync(distDir, { recursive: true });

const page = (title, css, js) => `<!DOCTYPE html>
<html lang="en" data-color-mode="LIGHT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
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

for (const id of componentIds) {
  const jsOut = join(distDir, `${id}.js`);
  await esbuild.build({
    absWorkingDir: pkgRoot,
    entryPoints: [join(pkgRoot, 'src', id, 'mount.ts')],
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'EuiVanilla',
    outfile: jsOut,
    target: 'es2020',
  });

  const css = `${minifiedCss['base.css'] ?? ''}${minifiedCss[`${id}.css`] ?? ''}`;
  const js = readFileSync(jsOut, 'utf8');
  const htmlPath = join(distDir, `${id}.html`);
  writeFileSync(htmlPath, page(`EUI Vanilla — ${id}`, css, js));
  console.log(`wrote dist/${id}.html (${css.length + js.length} bytes css+js)`);
}

const listing = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>EUI Vanilla</title>
  </head>
  <body>
    <p>One HTML file per component. Use these as iframe resources.</p>
    <ul>
${componentIds.map((id) => `      <li><a href="./${id}.html">${id}</a></li>`).join('\n')}
    </ul>
  </body>
</html>
`;
writeFileSync(join(distDir, 'index.html'), listing);
console.log(`wrote dist/index.html (listing)`);
