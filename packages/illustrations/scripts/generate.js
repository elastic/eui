#!/usr/bin/env node

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Generates typed illustration modules from raw SVGs.
 *
 * Authoring workflow for designers:
 *   1. Export the illustration from Figma for both color modes.
 *   2. Drop the two files into `src/svgs` as:
 *        <name>.light.svg
 *        <name>.dark.svg
 *   3. Run `yarn generate` (build/test scripts run it automatically).
 *
 * Everything under `src/generated` is produced by this script (do not edit).
 */

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

const svgsDir = path.resolve(__dirname, '../src/svgs');
const outputDir = path.resolve(__dirname, '../src/generated');
const svgOutputDir = path.join(outputDir, 'svgs');

const SVG_FILE = /^(.+)\.(light|dark)\.svg$/;

const svgoConfig = {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    'removeDimensions',
  ],
};

/**
 * SVGO can rewrite `light-dark()` inline styles (via `minifyStyles`/csso), so it
 * is disabled for the adaptive pass. The rest of `preset-default` still runs.
 */
const adaptiveSvgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: { overrides: { removeViewBox: false, minifyStyles: false } },
    },
    'removeDimensions',
  ],
};

/** CSS color-bearing properties paired between the light and dark variants. */
const COLOR_PROPS = [
  'fill',
  'stroke',
  'stop-color',
  'flood-color',
  'lighting-color',
  'color',
];

/** `data-viz`/`data_viz` -> `dataViz` for a valid JS identifier. */
const toCamelCase = (name) =>
  name.replace(/[-_](.)/g, (_, char) => char.toUpperCase());

/**
 * A generated export must be a valid JS identifier, otherwise the generated
 * modules won't compile. Catches leading digits (`3d-map` -> `3dMap`), spaces
 * and any other stray characters the file name may contain.
 */
const isValidIdentifier = (identifier) => /^[A-Za-z_$][\w$]*$/.test(identifier);

/** `data-viz` -> `Data viz` for a human-readable title. */
const toTitle = (name) => {
  const words = name.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const optimizeSvg = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = optimize(raw, { ...svgoConfig, path: filePath });
  return data;
};

/** Parse an SVG into SVGO's XAST without applying any transforms. */
const parseSvg = (raw) => {
  let root;
  optimize(raw, {
    plugins: [{ name: 'capture-ast', fn: (parsed) => ((root = parsed), {}) }],
  });
  return root;
};

/** Depth-first, pre-order list of element nodes. */
const collectElements = (node, acc = []) => {
  if (node.type === 'element') acc.push(node);
  for (const child of node.children ?? []) collectElements(child, acc);
  return acc;
};

const parseStyle = (value) => {
  const declarations = new Map();
  for (const declaration of (value ?? '').split(';')) {
    const separator = declaration.indexOf(':');
    if (separator === -1) continue;
    const prop = declaration.slice(0, separator).trim();
    if (prop) declarations.set(prop, declaration.slice(separator + 1).trim());
  }
  return declarations;
};

const serializeStyle = (declarations) =>
  Array.from(declarations, ([prop, value]) => `${prop}:${value}`).join(';');

const normalizeColor = (value) =>
  value == null ? value : value.trim().toLowerCase();

/**
 * Pairs light elements to dark elements positionally. Same-artwork exports keep
 * a stable element order, so a matching tag-name sequence is a reliable signal
 * that colors can be paired 1:1 (coordinates may drift between re-exports).
 * Returns `null` when the trees diverge (different element count or tag
 * sequence) — the signal that the pair cannot be safely auto-merged and
 * adaptive output should be skipped in favor of the discrete light/dark pair.
 */
const pairElements = (lightElements, darkElements) => {
  if (lightElements.length !== darkElements.length) return null;

  const pairs = [];
  for (let index = 0; index < lightElements.length; index++) {
    const lightNode = lightElements[index];
    const darkNode = darkElements[index];
    if (lightNode.name !== darkNode.name) return null;
    pairs.push([lightNode, darkNode]);
  }
  return pairs;
};

const colorValue = (node, prop, style) =>
  node.attributes[prop] ?? style.get(prop);

/**
 * Rewrites every color that differs between the light and dark variants into a
 * `light-dark(light, dark)` inline style on the light tree, leaving shared
 * colors untouched. Mutates `lightRoot`. Returns `false` (leaving the tree
 * untouched) when the pair cannot be safely merged.
 */
const mergeColorModes = (lightRoot, darkRoot) => {
  const pairs = pairElements(
    collectElements(lightRoot),
    collectElements(darkRoot)
  );
  if (!pairs) return false;

  for (const [lightNode, darkNode] of pairs) {
    const lightStyle = parseStyle(lightNode.attributes.style);
    const darkStyle = parseStyle(darkNode.attributes.style);
    let changed = false;

    for (const prop of COLOR_PROPS) {
      const lightValue = colorValue(lightNode, prop, lightStyle);
      const darkValue = colorValue(darkNode, prop, darkStyle);
      if (lightValue == null || darkValue == null) continue;
      // Idempotent: never re-wrap an already-merged value into `light-dark()`.
      if (/^light-dark\(/i.test(lightValue.trim())) continue;
      if (normalizeColor(lightValue) === normalizeColor(darkValue)) continue;

      lightStyle.set(prop, `light-dark(${lightValue}, ${darkValue})`);
      delete lightNode.attributes[prop];
      changed = true;
    }

    if (changed) lightNode.attributes.style = serializeStyle(lightStyle);
  }
  return true;
};

/**
 * Merges a light/dark pair into a single optimized SVG whose colors respond to
 * the active `color-scheme` via `light-dark()`. Returns `null` when the pair
 * cannot be safely merged (see {@link pairElements}).
 *
 * The inline flavor omits `color-scheme` so the container controls it (e.g.
 * `EuiIllustration` from the EUI theme). The file flavor pins
 * `color-scheme: light dark` on the root so `<img>`/CSS-background consumers
 * follow the OS preference, which cannot be reached across an `<img>` boundary.
 */
const buildAdaptiveSvg = (lightPath, darkPath) => {
  const darkRoot = parseSvg(fs.readFileSync(darkPath, 'utf8'));
  let merged = true;

  // Merge colors in a single pass. The merge plugin is not idempotent under
  // SVGO's `multipass`, so it must not run in the optimizing pass below.
  const { data: mergedSvg } = optimize(fs.readFileSync(lightPath, 'utf8'), {
    multipass: false,
    path: lightPath,
    plugins: [
      {
        name: 'merge-color-modes',
        fn: (root) => ((merged = mergeColorModes(root, darkRoot)), {}),
      },
    ],
  });

  if (!merged) return null;

  const { data: inline } = optimize(mergedSvg, {
    ...adaptiveSvgoConfig,
    path: lightPath,
  });

  const file = inline.replace(/^(<svg\b)/, '$1 style="color-scheme:light dark"');
  return { inline, file };
};

/** Illustrations whose light/dark pair could not be safely auto-merged. */
const skippedAdaptive = [];

const collectIllustrations = () => {
  if (!fs.existsSync(svgsDir)) {
    throw new Error(`Missing SVG source directory: ${svgsDir}`);
  }

  const byName = new Map();
  const errors = [];

  for (const fileName of fs.readdirSync(svgsDir).sort()) {
    if (!fileName.endsWith('.svg')) continue;

    const match = fileName.match(SVG_FILE);
    if (!match) {
      errors.push(
        `"${fileName}" is not a recognized name. Use <name>.light.svg / <name>.dark.svg`
      );
      continue;
    }

    const [, name, mode] = match;
    const record = byName.get(name) ?? {};
    record[mode] = path.join(svgsDir, fileName);
    byName.set(name, record);
  }

  const illustrations = [];

  for (const [name, modes] of byName) {
    if (!modes.light) errors.push(`"${name}" is missing ${name}.light.svg`);
    if (!modes.dark) errors.push(`"${name}" is missing ${name}.dark.svg`);
    if (!modes.light || !modes.dark) continue;

    const exportName = toCamelCase(name);
    if (!isValidIdentifier(exportName)) {
      errors.push(
        `"${name}" produces an invalid JS export name "${exportName}". Use a name that starts with a letter and contains only letters, numbers, "-" or "_".`
      );
      continue;
    }

    const adaptive = buildAdaptiveSvg(modes.light, modes.dark);
    if (!adaptive) skippedAdaptive.push(name);

    illustrations.push({
      id: name,
      exportName,
      title: toTitle(name),
      light: optimizeSvg(modes.light),
      dark: optimizeSvg(modes.dark),
      adaptive: adaptive?.inline,
      adaptiveFile: adaptive?.file,
    });
  }

  if (errors.length) {
    throw new Error(`Illustration SVGs are invalid:\n  - ${errors.join('\n  - ')}`);
  }

  return illustrations.sort((a, b) => a.id.localeCompare(b.id));
};

const AUTOGEN_HEADER =
  '// AUTO-GENERATED by scripts/generate.js — do not edit.\n' +
  '// Add SVGs to src/svgs (see the script header for layouts) and run `yarn generate`.\n';

const renderModule = ({ exportName, id, title, light, dark, adaptive }) =>
  `${AUTOGEN_HEADER}
import type { EuiIllustrationSource } from '../types';

export const ${exportName}: EuiIllustrationSource = {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(title)},
  light: ${JSON.stringify(light)},
  dark: ${JSON.stringify(dark)},${
    adaptive ? `\n  adaptive: ${JSON.stringify(adaptive)},` : ''
  }
};
`;

const renderIndex = (illustrations) => {
  const imports = illustrations
    .map(({ exportName, id }) => `import { ${exportName} } from './${id}';`)
    .join('\n');
  const reExports = illustrations
    .map(({ exportName, id }) => `export { ${exportName} } from './${id}';`)
    .join('\n');
  const record = illustrations
    .map(({ exportName }) => `  ${exportName},`)
    .join('\n');

  return `${AUTOGEN_HEADER}
import type { EuiIllustrationSource } from '../types';
${imports}

${reExports}

export const illustrations: Readonly<Record<string, EuiIllustrationSource>> = {
${record}
};
`;
};

const main = () => {
  const illustrations = collectIllustrations();

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(svgOutputDir, { recursive: true });

  for (const illustration of illustrations) {
    fs.writeFileSync(
      path.join(outputDir, `${illustration.id}.ts`),
      renderModule(illustration)
    );
    if (illustration.adaptiveFile) {
      fs.writeFileSync(
        path.join(svgOutputDir, `${illustration.id}.adaptive.svg`),
        illustration.adaptiveFile
      );
    }
  }

  fs.writeFileSync(path.join(outputDir, 'index.ts'), renderIndex(illustrations));

  const adaptiveCount = illustrations.length - skippedAdaptive.length;
  console.log(
    `Generated ${illustrations.length} illustration(s) into src/generated (${adaptiveCount} adaptive).`
  );
  if (skippedAdaptive.length) {
    console.warn(
      `Skipped adaptive output for ${skippedAdaptive.length} illustration(s) whose light/dark files are not structurally identical (they keep light/dark only): ${skippedAdaptive.join(', ')}`
    );
  }
};

main();
