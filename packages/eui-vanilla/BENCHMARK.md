# Benchmark

**Measured 7 Sep 2026.**

This document serves the purpose of comparing vanilla EUI vs full `@elastic/eui` on the button example.

tl;dr; **Vanilla is 82× smaller gzip** (4.0 kB vs 329 kB).

## Results

| | Vanilla | React only | EUI |
| --- | --- | --- | --- |
| JS raw | 2.0 kB | 139.2 kB | 1,079 kB |
| JS gzip | 1.0 kB | 44.6 kB | 329 kB |
| JS brotli | 0.9 kB | 39.1 kB | 242 kB |
| CSS raw | 32.2 kB | - | in JS |
| CSS gzip | 3.0 kB | - | in JS |
| Payload gzip | 4.0 kB | 44.6 kB | 329 kB |
| Payload brotli | 3.3 kB | 39.1 kB | 242 kB |
| Modules | 4 | 8 | 1,452 |
| JS parse (median) | 0.03 ms | 1.6 ms | 14.1 ms |

Vanilla payload = JS + generated CSS.

React-only and EUI have no separate CSS file. Emotion emits CSS from JS at runtime.

Vanilla gzip is mostly CSS (3.0 kB of 4.0 kB). The mount script is 1.0 kB gzip.

React alone, with a native `<button>` and no EUI, is already 45 kB gzip.

## What is in the EUI bundle

Deep-importing `EuiButton` + `EuiProvider` produced the same 1.08 MB as `import { EuiButton, EuiProvider } from '@elastic/eui'`.

Tree-shaking dropped unused files (1,452 vs 2,604 modules). It did not shrink the minified output.

Source graph before minify (4.2 MB):

| Share | Package |
| --- | --- |
| 55% | EUI source |
| 24% | `@elastic/eui-theme-common` + `@elastic/eui-theme-borealis` |
| 4% | React + ReactDOM |
| 4% | moment |
| 3% | lodash |
| 3% | chroma-js |
| 2% | Emotion |
| 6% | other (focus-lock, uuid, numeral...) |

## Methodology

Three bundles. Same tool. Same target.

1. **Vanilla** - `mountButton` with `{ label: 'Button', display: 'fill' }`, plus `generated/base.css` and `generated/button.css`.
2. **EUI** - `createRoot` + `EuiProvider` + `<EuiButton fill>Button</EuiButton>`. Source is `packages/eui/src`, not the published `es/` build.
3. **React only** - `createRoot` rendering a native `<button>`. Floor for any React iframe.

esbuild: bundle, minify, IIFE, `es2020`. `process.env.NODE_ENV` is `"production"`.

Sizes: raw bytes, gzip `-9`, Node brotli.

Parse: `new Function` in Node (V8). Compile only. Do not execute. Median of 25 runs.

Fonts are not in any payload. The host is expected to load Inter.

Vanilla CSS includes the base reset and every button size, color and display. It is not fill-only.

## Not measured

- First paint, layout or runtime CPU.
- Download over a real network.
- A production Kibana or Cloud UI webpack split.
- The published `@elastic/eui` `es/` build.

## Reproduce

```bash
yarn workspace @elastic/eui-vanilla generate
yarn workspace @elastic/eui-vanilla bench
```

Defaults to `button`. Pass another fixture after `--` (`yarn workspace @elastic/eui-vanilla bench -- badge`). Add fixtures in `scripts/bench/components.mjs`.

Writes JSON to stdout. `--out path.json` also writes a file.
