import * as esbuild from 'esbuild';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

import { components } from './components.mjs';

const vanillaRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const euiRoot = join(vanillaRoot, '../eui');

const args = process.argv.slice(2).filter((a) => a !== '--');
const outIdx = args.indexOf('--out');
const outFile = outIdx >= 0 ? args[outIdx + 1] : undefined;
const id =
  args.find((a, i) => !a.startsWith('-') && i !== outIdx + 1) ?? 'button';

const spec = components[id];

if (!spec) {
  const known = Object.keys(components).join(', ') || '(none)';

  throw new Error(
    `Unknown component "${id}". Known: ${known}. Add a fixture in scripts/bench/components.mjs.`
  );
}

const emptyAsset = {
  name: 'empty-asset',
  setup(build) {
    build.onResolve({ filter: /\.(scss|css|svg)$/ }, (args) => ({
      path: args.path,
      namespace: 'empty-asset',
    }));
    build.onResolve({ filter: /^pegjs-inline-precompile$/ }, (args) => ({
      path: args.path,
      namespace: 'empty-asset',
    }));
    build.onLoad({ filter: /.*/, namespace: 'empty-asset' }, () => ({
      contents: 'export default ""',
      loader: 'js',
    }));
  },
};

const sizes = (buf) => ({
  raw: buf.length,
  gzip: gzipSync(buf, { level: 9 }).length,
  brotli: brotliCompressSync(buf).length,
});

const parseMs = (js, runs = 25) => {
  const times = [];

  for (let i = 0; i < runs; i++) {
    const t0 = performance.now();
    new Function(`/* ${i} ${Math.random()} */\n${js}`);
    times.push(performance.now() - t0);
  }

  times.sort((a, b) => a - b);

  return {
    min: times[0],
    median: times[Math.floor(times.length / 2)],
    max: times[times.length - 1],
  };
};

const bucketOf = (p) => {
  const n = p.replace(/\\/g, '/');
  if (n.includes('node_modules/react-dom')) return 'react-dom';
  if (n.includes('node_modules/react/')) return 'react';
  if (n.includes('node_modules/@emotion/')) return 'emotion';
  if (n.includes('node_modules/stylis')) return 'stylis';
  if (n.includes('node_modules/scheduler')) return 'scheduler';
  if (n.includes('eui-theme-borealis')) return 'eui-theme-borealis';
  if (n.includes('eui-theme-common')) return 'eui-theme-common';
  if (n.startsWith('src/') || n.includes('/packages/eui/src/')) return 'eui';
  if (n.includes('node_modules/')) {
    const m = n.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
    return m ? m[1] : 'other-dep';
  }

  return 'other';
};

const breakdown = (meta) =>
  Object.entries(
    Object.entries(meta.inputs).reduce((acc, [path, info]) => {
      const b = bucketOf(path);

      acc[b] = (acc[b] ?? 0) + info.bytes;

      return acc;
    }, {})
  )
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes);

const loadCss = (files) => {
  const parts = files.map((file) => {
    const path = join(vanillaRoot, 'generated', file);

    if (!existsSync(path))
      throw new Error(`Missing ${path}. Run yarn generate first.`);

    return readFileSync(path);
  });

  return Buffer.concat(parts);
};

const shared = {
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  metafile: true,
  logLevel: 'warning',
  platform: 'browser',
  define: { 'process.env.NODE_ENV': '"production"' },
};

const bundle = async ({
  absWorkingDir,
  contents,
  sourcefile,
  loader,
  extra = {},
}) => {
  const result = await esbuild.build({
    ...shared,
    absWorkingDir,
    stdin: { contents, resolveDir: absWorkingDir, sourcefile, loader },
    ...extra,
  });

  return {
    js: Buffer.from(result.outputFiles[0].contents),
    metafile: result.metafile,
  };
};

const euiAlias = {
  jsx: 'automatic',
  alias: {
    '@elastic/eui-theme-common': join(
      vanillaRoot,
      '../eui-theme-common/src/index.ts'
    ),
    '@elastic/eui-theme-borealis': join(
      vanillaRoot,
      '../eui-theme-borealis/src/index.ts'
    ),
  },
  plugins: [emptyAsset],
};

const vanillaEntry = `import { ${spec.vanilla.mount} } from ${JSON.stringify(`./${spec.vanilla.from}`)};
${spec.vanilla.mount}(document.getElementById('root'), ${JSON.stringify(spec.vanilla.props)});
`;

const euiDeepEntry = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ${spec.eui.name} } from ${JSON.stringify(`./${spec.eui.from}`)};
import { EuiProvider } from './src/components/provider';

createRoot(document.getElementById('root')).render(
  <EuiProvider>
    ${spec.eui.jsx}
  </EuiProvider>
);
`;

const label = spec.vanilla.props.label ?? id;
const reactEntry = `import React from 'react';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<button>${label}</button>);
`;

const [vanillaBuild, euiDeepBuild, reactBuild] = await Promise.all([
    bundle({
      absWorkingDir: vanillaRoot,
      contents: vanillaEntry,
      sourcefile: `${id}-vanilla.js`,
      loader: 'js',
    }),
    bundle({
      absWorkingDir: euiRoot,
      contents: euiDeepEntry,
      sourcefile: `${id}-eui.tsx`,
      loader: 'tsx',
      extra: euiAlias,
    }),
    bundle({
      absWorkingDir: euiRoot,
      contents: reactEntry,
      sourcefile: `${id}-react.tsx`,
      loader: 'tsx',
    }),
  ]);

const cssBuf = loadCss(spec.css);

const emptySizes = { raw: 0, gzip: 0, brotli: 0 };

const pack = (built, extraCss) => {
  const payload = extraCss ? Buffer.concat([built.js, extraCss]) : built.js;

  return {
    js: sizes(built.js),
    css: extraCss ? sizes(extraCss) : emptySizes,
    payload: sizes(payload),
    modules: Object.keys(built.metafile.inputs).length,
    parseMs: parseMs(built.js.toString('utf8')),
  };
};

const result = {
  component: id,
  date: new Date().toISOString(),
  target: 'es2020',
  format: 'iife',
  vanilla: pack(vanillaBuild, cssBuf),
  eui: {
    ...pack(euiDeepBuild),
    breakdown: breakdown(euiDeepBuild.metafile),
  },
  reactOnly: pack(reactBuild),
};

const json = `${JSON.stringify(result, null, 2)}\n`;
process.stdout.write(json);

if (outFile) writeFileSync(outFile, json);
