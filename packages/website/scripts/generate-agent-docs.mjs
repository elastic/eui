/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * Converts the website's component, utility and theming MDX pages into plain
 * markdown that coding agents can read from the installed @elastic/eui package.
 *
 * Usage: node scripts/generate-agent-docs.mjs [outDir]
 * Requires @elastic/eui-docgen to be built (its dist/ feeds the prop tables).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import ts from 'typescript';

const websiteDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const docsDir = path.join(websiteDir, 'docs');
// Utilities hold documented components too (EuiProvider, EuiPortal, EuiFocusTrap...).
// Theming and Emotion pages document the tokens, breakpoints and style helpers.
// Patterns and content guidelines cover UX and copy decisions the component
// pages leave out. The order is the index's group order.
const sourceDirs = [
  'components',
  'utilities',
  'getting-started/theming',
  'getting-started/working-with-emotion',
  'patterns',
  'content',
].map((dir) => path.join(docsDir, dir));
const isSourcePage = (file) =>
  sourceDirs.some((dir) => file.startsWith(`${dir}${path.sep}`));
const docgenDir = path.resolve(websiteDir, '../eui-docgen');
const outDir = path.resolve(
  process.argv[2] ?? path.join(websiteDir, '../eui/docs')
);
const siteUrl = 'https://eui.elastic.co';

// Long unions (e.g. every icon name) would bury the rest of the table
const MAX_TYPE_LENGTH = 300;

const parser = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkFrontmatter);
// Stringify without the MDX extension so `<` and `{` in prose aren't escaped
const printer = unified()
  .use(remarkStringify, { bullet: '-', rule: '-', fences: true })
  .use(remarkGfm, { tablePipeAlign: false })
  .use(remarkFrontmatter);

const dropped = new Map();
const recordDrop = (file, what) => {
  const key = `${what}`;
  if (!dropped.has(key)) dropped.set(key, new Set());
  dropped.get(key).add(path.relative(docsDir, file));
};

// Mirror Docusaurus preprocessing: unwrap ```mdx-code-block fences (rendered
// as MDX) and drop `{#custom-id}` heading anchors (not valid MDX expressions)
const preprocess = (source) =>
  source
    .replace(/^```mdx-code-block\n([\s\S]*?)\n```$/gm, '$1')
    .replace(/^(#{1,6} .*?)\s*\{#[\w-]+\}$/gm, '$1');

const parseImports = (esm) => {
  const imports = {};
  const re =
    /import\s+(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"]([^'"]+)['"]/g;
  for (const [, defaultName, named, source] of esm.matchAll(re)) {
    if (defaultName) imports[defaultName] = source;
    for (const name of named?.split(',') ?? []) {
      const local = name
        .split(/\s+as\s+/)
        .pop()
        .trim();
      if (local) imports[local] = source;
    }
  }
  return imports;
};

const docgenCache = new Map();
const loadDocgen = (source) => {
  if (docgenCache.has(source)) return docgenCache.get(source);
  const base = path.join(docgenDir, source.replace('@elastic/eui-docgen/', ''));
  const file = [base, `${base}.json`, path.join(base, 'index.json')].find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
  );
  const data = file ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  docgenCache.set(source, data);
  return data;
};

const getAttribute = (node, name) => {
  const attribute = node.attributes?.find((attr) => attr.name === name);
  if (!attribute) return undefined;
  if (attribute.value && typeof attribute.value === 'object')
    return { expression: attribute.value.value };
  return attribute.value;
};

const escapeCell = (value) =>
  value.replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

// Repeated on nearly every component with no component-specific meaning;
// "Also accepts props from" already names their source.
const COMMON_PROPS = new Set([
  'className',
  'aria-label',
  'data-test-subj',
  'css',
]);
const GENERIC_ARIA_LABEL =
  /^Defines a string value that labels the current element/;

const isCommonProp = (prop) =>
  COMMON_PROPS.has(prop.name) &&
  !prop.isRequired &&
  (!prop.description || GENERIC_ARIA_LABEL.test(prop.description));

const isDeprecated = (prop) => /@deprecated\b/.test(prop.description ?? '');

const renderPropTable = (component) => {
  const props = Object.values(component.props).filter(
    (prop) => !isCommonProp(prop)
  );
  // Deprecated props go last so a scan of the table picks a current prop.
  props.sort((a, b) => isDeprecated(a) - isDeprecated(b));
  const rows = props.map((prop) => {
    let type = prop.type?.raw ?? prop.type?.name ?? '';
    if (type.length > MAX_TYPE_LENGTH)
      type = `${type.slice(0, MAX_TYPE_LENGTH)}… (truncated, see eui.d.ts)`;
    const deprecated = isDeprecated(prop);
    const name = [
      `\`${prop.name}\``,
      prop.isRequired && '(required)',
      deprecated && '**(deprecated)**',
    ]
      .filter(Boolean)
      .join(' ');
    const defaultValue = prop.defaultValue
      ? `\`${escapeCell(prop.defaultValue)}\``
      : '';
    const description = deprecated
      ? `**Deprecated:** ${prop.description
          .replace(/@deprecated\b\s*(-\s*)?/, '')
          .trim()}`
      : prop.description ?? '';
    return `| ${name} | \`${escapeCell(
      type
    )}\` | ${defaultValue} | ${escapeCell(description)} |`;
  });
  const lines = [`### ${component.displayName} props`, ''];
  if (component.extends?.length) {
    lines.push(
      `Also accepts props from: ${component.extends
        .map((e) => e.displayName)
        .join(', ')}.`,
      ''
    );
  }
  if (rows.length) {
    lines.push(
      '| Prop | Type | Default | Description |',
      '| --- | --- | --- | --- |',
      ...rows
    );
  } else {
    lines.push('No own props.');
  }
  return { type: 'html', value: lines.join('\n') };
};

const collectJsxNames = (node, names = new Set()) => {
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    names.add(node.name ?? 'Fragment');
  }
  for (const child of node.children ?? []) collectJsxNames(child, names);
  return names;
};

const hasMarkdownStructure = (node) =>
  (node.children ?? []).some(
    (child) =>
      ['code', 'heading', 'list', 'table', 'blockquote'].includes(child.type) ||
      hasMarkdownStructure(child)
  );

// Only EUI components and HTML elements, so the snippet is copyable usage
const isEuiOnlyJsx = (names) =>
  [...names].every((name) => /^(Eui[A-Z]|[a-z])/.test(name));

const isWebsiteUrl = (url) => !/^[a-z]+:|^#/.test(url);

const pageUrlPath = (file, frontmatter) => {
  const relative = path.relative(docsDir, file).replace(/\.mdx?$/, '');
  const dir = path.dirname(relative);
  const slug = frontmatter?.slug;
  if (slug?.startsWith('/')) return `/docs${slug}`;
  if (slug === '.' || path.basename(relative) === 'index')
    return `/docs/${dir}`;
  return `/docs/${relative}`;
};

// Agents search `components/` for a component, so the website's utilities (EuiTextTruncate,
// EuiPortal...) go there too, and theming loses the getting-started prefix.
const outputDirs = [
  ['utilities', 'components/utilities'],
  ['getting-started/theming', 'theming'],
  ['getting-started/working-with-emotion', 'theming/emotion'],
];

const outputPathFor = (file) => {
  let relative = path.relative(docsDir, file).replace(/\.mdx$/, '.md');
  for (const [from, to] of outputDirs) {
    if (relative.startsWith(`${from}/`)) {
      relative = to + relative.slice(from.length);
      break;
    }
  }
  // Agents guess `components/<name>.md` with the wrong category or without `/index`, so component
  // pages are flat and named after their title.
  const title =
    readFrontmatter(file).title ??
    fs.readFileSync(file, 'utf8').match(/^# (.+)$/m)?.[1];
  if (relative.startsWith('components/') && title) {
    relative = `components/${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}.md`;
  }
  return path.join(outDir, relative);
};

const rewriteLink = (url, fromFile, outFile) => {
  if (!isWebsiteUrl(url)) return url;
  const [target, hash = ''] = url.split('#');
  const suffix = hash ? `#${hash}` : '';
  if (target.startsWith('/')) return `${siteUrl}${target}${suffix}`;
  const resolved = path.resolve(path.dirname(fromFile), target);
  if (
    /\.mdx?$/.test(target) &&
    isSourcePage(resolved) &&
    fs.existsSync(resolved)
  ) {
    return (
      path.relative(path.dirname(outFile), outputPathFor(resolved)) + suffix
    );
  }
  if (/\.mdx?$/.test(target) && fs.existsSync(resolved)) {
    const fm = readFrontmatter(resolved);
    return `${siteUrl}${pageUrlPath(resolved, fm)}${suffix}`;
  }
  return url;
};

const readFrontmatter = (file) => {
  const match = fs.readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  return match ? parseYaml(match[1]) : {};
};

const transformChildren = (children, ctx) =>
  children.flatMap((child) => transformNode(child, ctx));

const transformNode = (node, ctx) => {
  switch (node.type) {
    case 'mdxjsEsm':
    case 'yaml':
      return [];
    case 'mdxFlowExpression':
    case 'mdxTextExpression':
      if (!node.value.trim().startsWith('/*'))
        recordDrop(ctx.file, `{expression}`);
      return [];
    case 'code':
      if (node.meta === 'interactive') node.meta = null;
      return [node];
    case 'link':
    case 'definition':
      node.url = rewriteLink(node.url, ctx.file, ctx.outFile);
      break;
    case 'mdxJsxFlowElement':
    case 'mdxJsxTextElement':
      return transformJsx(node, ctx);
  }
  if (node.children) node.children = transformChildren(node.children, ctx);
  return [node];
};

const transformJsx = (node, ctx) => {
  const name = node.name;
  const isFlow = node.type === 'mdxJsxFlowElement';

  // The sibling <Example.Snippet> carries the same code as a fenced block
  if (name === 'Example.Preview') return [];
  // Website-only embeds with no meaning outside the docs site
  if (name === 'FigmaAsset' || name === 'StorybookLink') return [];

  // Screenshots: the alt text carries what the image shows
  if (name === 'img') {
    const alt = getAttribute(node, 'alt');
    if (typeof alt !== 'string') return [];
    const image = {
      type: 'emphasis',
      children: [{ type: 'text', value: `Image: ${alt}` }],
    };
    return [isFlow ? { type: 'paragraph', children: [image] } : image];
  }

  if (name === 'PropTable') {
    const definition = getAttribute(node, 'definition')?.expression ?? '';
    const [, local, componentName] =
      definition.match(/^(\w+)(?:\.(\w+)|\['(\w+)'\])$/)?.filter(Boolean) ?? [];
    const component = loadDocgen(ctx.imports[local] ?? '')?.[componentName];
    if (!component) {
      recordDrop(
        ctx.file,
        `<PropTable definition={${definition}}> (docgen not found)`
      );
      return [];
    }
    ctx.components.add(component.displayName);
    return [renderPropTable(component)];
  }

  // Content tables (e.g. the selection comparison chart), not usage examples
  if (name === 'EuiTable') {
    const cellsOf = (row) =>
      findJsx(row, /^EuiTable(Header|Row)Cell$/).map((cell) => ({
        type: 'tableCell',
        children: transformChildren(cell.children, ctx).flatMap((child) =>
          child.type === 'paragraph' ? child.children : [child]
        ),
      }));
    const rows = [
      ...findJsx(node, /^EuiTableHeader$/),
      ...findJsx(node, /^EuiTableRow$/),
    ];
    return [
      {
        type: 'table',
        children: rows.map((row) => ({
          type: 'tableRow',
          children: cellsOf(row),
        })),
      },
    ];
  }

  if (name === 'Guideline') {
    const label = getAttribute(node, 'type') === 'dont' ? "Don't" : 'Do';
    const text = getAttribute(node, 'text');
    if (typeof text !== 'string') return [];
    return [
      {
        type: 'paragraph',
        children: [
          { type: 'strong', children: [{ type: 'text', value: `${label}:` }] },
          { type: 'text', value: ` ${text}` },
        ],
      },
    ];
  }

  const importSource = ctx.imports[name];
  if (importSource?.endsWith('.mdx')) {
    const partialFile = path.resolve(path.dirname(ctx.file), importSource);
    return convertTree(partialFile, ctx).children;
  }

  // Demos imported from a co-located file: their source is the example
  const demoFile =
    importSource?.startsWith('.') &&
    resolveScript(path.resolve(path.dirname(ctx.file), importSource));
  if (isFlow && demoFile) {
    return [
      {
        type: 'code',
        lang: path.extname(demoFile).slice(1),
        value: fs.readFileSync(demoFile, 'utf8').trim(),
      },
    ];
  }

  if (!isFlow) {
    if (name === 'EuiCode')
      return [{ type: 'inlineCode', value: toPlainText(node) }];
    if (node.children?.length) return transformChildren(node.children, ctx);
    const label = getAttribute(node, 'label');
    if (typeof label === 'string') return [{ type: 'text', value: label }];
    const tooltip = getAttribute(node, 'content');
    return typeof tooltip === 'string'
      ? [{ type: 'text', value: ` (${tooltip})` }]
      : [];
  }

  const names = collectJsxNames(node);
  if (
    !hasMarkdownStructure(node) &&
    ![...names].some((n) => n === 'Guideline' || n === 'PropTable')
  ) {
    if (isEuiOnlyJsx(names) && node.position) {
      const value = ctx.source.slice(
        node.position.start.offset,
        node.position.end.offset
      );
      return [{ type: 'code', lang: 'tsx', value: dedent(value) }];
    }
    recordDrop(ctx.file, `<${name ?? 'Fragment'}>`);
    return [];
  }

  return transformChildren(node.children ?? [], ctx);
};

const resolveScript = (base) =>
  ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts']
    .map((ext) => base + ext)
    .find(
      (candidate) => /\.[jt]sx?$/.test(candidate) && fs.existsSync(candidate)
    );

const findJsx = (node, pattern) =>
  (node.children ?? []).flatMap((child) =>
    pattern.test(child.name ?? '') ? [child] : findJsx(child, pattern)
  );

const toPlainText = (node) =>
  node.value ?? (node.children ?? []).map(toPlainText).join('');

const dedent = (value) => {
  const lines = value.split('\n');
  const indents = lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => line.match(/^ */)[0].length);
  const indent = Math.min(...indents, Infinity);
  return [
    lines[0],
    ...lines
      .slice(1)
      .map((line) => line.slice(indent === Infinity ? 0 : indent)),
  ].join('\n');
};

const convertTree = (file, parentCtx) => {
  const source = preprocess(fs.readFileSync(file, 'utf8'));
  const tree = parser.parse(source);
  const esm = tree.children
    .filter((node) => node.type === 'mdxjsEsm')
    .map((node) => node.value)
    .join('\n');
  const ctx = {
    file,
    source,
    outFile: parentCtx?.outFile ?? outputPathFor(file),
    imports: parseImports(esm),
    components: parentCtx?.components ?? new Set(),
  };
  tree.children = transformChildren(tree.children, ctx);
  return Object.assign(tree, { ctx });
};

const findPages = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    // `_`-prefixed files and folders are partials included by other pages.
    if (entry.name.startsWith('_')) return [];
    if (entry.isDirectory()) return findPages(full);
    return entry.name.endsWith('.mdx') ? [full] : [];
  });

// Hooks and functions a page documents: the ones it names in inline code,
// e.g. `useEuiBreakpoint(sizes[])` in a heading
const findUtilities = (node, names = new Set()) => {
  const name = node.type === 'inlineCode' && node.value.match(/^[\w$]+/)?.[0];
  if (name && isUtility.has(name)) names.add(name);
  (node.children ?? []).forEach((child) => findUtilities(child, names));
  return names;
};

const convertPage = (file) => {
  const frontmatter = readFrontmatter(file);
  const tree = convertTree(file);
  const keywords = (frontmatter.keywords ?? []).filter((k) =>
    /^Eui[A-Z]/.test(k)
  );
  const components = [...new Set([...keywords, ...tree.ctx.components])];
  const utilities = [
    ...new Set([
      ...(frontmatter.keywords ?? []).filter((k) => isUtility.has(k)),
      ...findUtilities(tree),
    ]),
  ];
  const h1 = tree.children.find(
    (node) => node.type === 'heading' && node.depth === 1
  );
  const header = {
    title:
      frontmatter.title ??
      (h1 && printer.stringify({ type: 'root', children: h1.children }).trim()),
    ...(frontmatter.description && { description: frontmatter.description }),
    ...(components.length && { components }),
    ...(utilities.length && { utilities }),
    url: `${siteUrl}${pageUrlPath(file, frontmatter)}/`,
  };
  const body = printer.stringify(tree);
  const outFile = outputPathFor(file);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, `---\n${stringifyYaml(header)}---\n\n${body}`);
  return {
    file,
    outFile,
    components,
    utilities,
    summary: header.description ?? summarize(tree),
    ...header,
  };
};

// Fallback until pages have a frontmatter `description`: the intro's first
// sentence. Links are flattened since they're relative to the page, not the index.
const summarize = (tree) => {
  let inAdmonition = false;
  let text;
  for (const node of tree.children) {
    if (node.type !== 'paragraph') continue;
    const paragraph = printer
      .stringify({ type: 'root', children: [node] })
      .replace(/\s+/g, ' ')
      .trim();
    if (paragraph.startsWith(':::')) inAdmonition = true;
    if (!inAdmonition) {
      text = paragraph;
      break;
    }
    if (paragraph.endsWith(':::')) inAdmonition = false;
  }
  if (!text) return '';
  const plain = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const sentence = plain.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? plain;
  return sentence.length > 200 ? `${sentence.slice(0, 200)}…` : sentence;
};

// Public callable exports: `Eui*` components and lowercase hooks and functions
const findPublicExports = () => {
  const euiDir = path.resolve(websiteDir, '../eui');
  const entry = path.join(euiDir, 'src/index.ts');
  const { config } = ts.readConfigFile(
    path.join(euiDir, 'tsconfig.json'),
    ts.sys.readFile
  );
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, euiDir);
  const program = ts.createProgram([entry], {
    ...options,
    noEmit: true,
    incremental: false,
  });
  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(
    program.getSourceFile(entry)
  );
  const callable = checker
    .getExportsOfModule(moduleSymbol)
    .filter((symbol) => {
      const target =
        symbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(symbol)
          : symbol;
      if (!(target.flags & ts.SymbolFlags.Value) || !target.valueDeclaration)
        return false;
      const type = checker.getTypeOfSymbolAtLocation(
        target,
        target.valueDeclaration
      );
      return (
        type.getCallSignatures().length > 0 ||
        type.getConstructSignatures().length > 0
      );
    })
    .map((symbol) => symbol.name)
    .sort();
  return {
    components: callable.filter((name) => /^Eui[A-Z]/.test(name)),
    utilities: callable.filter((name) => /^[a-z]/.test(name)),
  };
};

// The website's icon list is an interactive search over `icon_map`, so the names
// never reach the converted page. Read them (and the deprecations the lint rule
// knows about) from source instead.
const findInitializer = (file, name) => {
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest
  );
  let found;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.text === name)
      found = node.initializer;
    else ts.forEachChild(node, visit);
  };
  visit(source);
  while (found && ts.isAsExpression(found)) found = found.expression;
  return found;
};

const objectEntries = (node) =>
  node.properties.map((property) => [property.name.text, property.initializer]);

const stringSet = (node) =>
  new Set(node.arguments[0].elements.map((element) => element.text));

const iconCategories = [
  ['glyph', 'Glyphs', 'Monochrome UI icons. Keep the default `size="m"`.'],
  ['app', 'Apps', 'Multi-colour Elastic app icons, usually at `size="xl"`.'],
  ['elasticLogo', 'Elastic logos', ''],
  ['thirdPartyLogo', 'Third-party logos', ''],
  ['ml', 'Machine learning', ''],
  ['token', 'Tokens', 'Code and field type icons, usually through EuiToken.'],
];

const writeIcons = () => {
  const iconDir = path.resolve(websiteDir, '../eui/src/components/icon');
  const lintRule = path.resolve(
    websiteDir,
    '../eslint-plugin/src/rules/no_deprecated_icon_aliases.ts'
  );
  const icons = objectEntries(
    findInitializer(path.join(iconDir, 'icon_map.ts'), 'typeToPathMap')
  ).map(([name, loader]) => {
    const metadata = ts.isCallExpression(loader)
      ? Object.fromEntries(
          objectEntries(loader.arguments[1] ?? { properties: [] })
        )
      : {};
    return {
      name,
      category: metadata.category?.text ?? 'glyph',
      synonyms:
        metadata.synonyms?.elements.map((element) => element.text) ?? [],
    };
  });
  const aliases = objectEntries(
    findInitializer(lintRule, 'DEPRECATED_ICON_ALIASES')
  ).map(([name, value]) => [name, `\`${value.text}\``]);
  const guidance = objectEntries(
    findInitializer(lintRule, 'DEPRECATED_ICONS_WITH_GUIDANCE')
  ).map(([name, value]) => [name, value.text]);
  const withoutReplacement = [
    ...stringSet(
      findInitializer(lintRule, 'DEPRECATED_ICONS_WITHOUT_REPLACEMENT')
    ),
  ].map((name) => [name, 'No replacement']);
  const hiddenFromDocs = stringSet(
    findInitializer(
      path.join(iconDir, 'icon_map.ts'),
      'deprecatedIconsExcludedFromDocs'
    )
  );
  const deprecated = new Map([...aliases, ...guidance, ...withoutReplacement]);
  for (const name of hiddenFromDocs)
    if (!deprecated.has(name)) deprecated.set(name, '');
  const exists = new Set(icons.map((icon) => icon.name));

  const lines = [
    '---',
    stringifyYaml({
      title: 'Icon names',
      description:
        'Every icon name accepted by EuiIcon `type` and the `iconType` props, with search synonyms.',
      url: `${siteUrl}/docs/components/display/icons/`,
    }).trim(),
    '---',
    '',
    '# Icon names',
    '',
    'Pass these names to EuiIcon `type` or any `iconType` prop. The prop type also accepts any string (a URL or data URI), so TypeScript does not catch a wrong name: an unknown name renders as a broken image. Pick names from this list, and search the synonyms after each name to find an icon by meaning.',
    '',
    'For sizes, colours and custom SVGs, see [Icons](components/icons.md). Deprecated and removed names and their replacements are in [Deprecated icon names](icons-deprecated.md).',
    '',
  ];
  for (const [category, label, intro] of iconCategories) {
    lines.push(`## ${label}`, '');
    if (intro) lines.push(intro, '');
    for (const icon of icons) {
      if (icon.category !== category || deprecated.has(icon.name)) continue;
      const synonyms = icon.synonyms.length
        ? `: ${icon.synonyms.join(', ')}`
        : '';
      lines.push(`- \`${icon.name}\`${synonyms}`);
    }
    lines.push('');
  }
  fs.writeFileSync(path.join(outDir, 'icons.md'), lines.join('\n'));

  // Kept out of icons.md so that finding a name there means the name is valid:
  // agents check names by grepping that file.
  const deprecatedLines = [
    '---',
    stringifyYaml({
      title: 'Deprecated icon names',
      description: 'Deprecated and removed icon names and what to use instead.',
    }).trim(),
    '---',
    '',
    '# Deprecated icon names',
    '',
    "Don't use these. Deprecated names still render but will be removed; removed names render a broken image. The `@elastic/eui/no-deprecated-icon-aliases` lint rule flags static uses.",
    '',
    '| Name | Status | Use instead |',
    '| --- | --- | --- |',
    ...[...deprecated]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([name, replacement]) =>
          `| \`${name}\` | ${
            exists.has(name) ? 'Deprecated' : 'Removed'
          } | ${escapeCell(replacement)} |`
      ),
    '',
  ];
  fs.writeFileSync(
    path.join(outDir, 'icons-deprecated.md'),
    deprecatedLines.join('\n')
  );
  return {
    listed: icons.filter((icon) => !deprecated.has(icon.name)).length,
    deprecated: deprecated.size,
  };
};

const readCategory = (dir) => {
  const file = path.join(docsDir, dir, '_category_.yml');
  return fs.existsSync(file)
    ? parseYaml(fs.readFileSync(file, 'utf8'))
    : undefined;
};

// Pages are grouped by category (e.g. components/forms); utilities, patterns
// and content each form one group.
// Deeper folders become title context, e.g. "Markdown › Plugins".
const indexPlacement = (result) => {
  const dirs = path
    .relative(docsDir, path.dirname(result.file))
    .split(path.sep);
  const depth = ['utilities', 'patterns', 'content'].includes(dirs[0]) ? 1 : 2;
  const group = path.join(...dirs.slice(0, depth));
  const labels = dirs
    .slice(depth)
    .map(
      (_, i) =>
        readCategory(path.join(group, ...dirs.slice(depth, depth + i + 1)))
          ?.label
    )
    .filter((label) => label && label !== result.title);
  return { group, title: [...labels, result.title].join(' › ') };
};

// Top-level folders without a `_category_.yml`
const groupLabels = { patterns: 'Patterns', content: 'Content guidelines' };

const writeIndex = (results, publicComponents) => {
  const isPublic = new Set(publicComponents);
  const groups = new Map();
  for (const result of results) {
    if (path.dirname(result.file) === sourceDirs[0]) continue;
    const { group, title } = indexPlacement(result);
    const category = readCategory(group) ?? {
      label: groupLabels[group] ?? 'Utilities',
    };
    const rank = sourceDirs.findIndex((dir) =>
      result.file.startsWith(`${dir}${path.sep}`)
    );
    if (!groups.has(group))
      groups.set(group, { ...category, rank, entries: [] });
    const names = [
      ...result.components.filter((name) => isPublic.has(name)),
      ...result.utilities,
    ];
    groups.get(group).entries.push({ ...result, title, names });
  }
  const documented = new Set(results.flatMap((result) => result.components));
  const undocumented = publicComponents.filter((name) => !documented.has(name));

  const lines = [
    '# EUI components',
    '',
    'Every documented EUI component, utility, theme token and style helper, grouped by category. Each entry links to a page with usage guidance, examples and props for the installed version.',
    '',
    "Open a component's page before using it: these one-line summaries leave out props and usage rules.",
    '',
    'Prefer these examples over patterns copied from existing code, which may use removed props or icon names.',
    '',
    'Check every icon `type` and `iconType` value against [Icon names](icons.md): a removed name renders as a broken image, and TypeScript accepts any string.',
    '',
    'Before writing user-facing text (button labels, titles, tooltips, empty states, error and confirmation messages), read [Voice and writing style](content/style.md), [Language](content/language.md) for capitalization and punctuation, and [Word choice](content/word-choice.md). For an error state, also read [How to write good error messages](patterns/error-messages/how-to-write-good-error-messages.md) and the [Error messages](patterns/error-messages/index.md) page that fits it: banner, page, validation or warning.',
    '',
    'For table pagination and bulk selection, save buttons, help text and health or severity colors, follow the matching [Patterns](#patterns) page as well as the component page.',
    '',
  ];
  const sorted = [...groups.values()].sort(
    (a, b) =>
      a.rank - b.rank ||
      (a.position ?? 99) - (b.position ?? 99) ||
      a.label.localeCompare(b.label)
  );
  for (const { label, entries } of sorted) {
    lines.push(`## ${label}`, '');
    for (const entry of entries.sort((a, b) =>
      a.title.localeCompare(b.title)
    )) {
      const names = entry.names.length
        ? ` (${entry.names.map((name) => `\`${name}\``).join(', ')})`
        : '';
      lines.push(
        `- [${entry.title}](${path.relative(outDir, entry.outFile)})${names}: ${
          entry.summary
        }`
      );
    }
    lines.push('');
  }
  if (undocumented.length) {
    lines.push(
      '## Components without a docs page',
      '',
      'Public exports that no page covers. Check their props and JSDoc in `eui.d.ts`.',
      '',
      undocumented.map((name) => `\`${name}\``).join(', '),
      ''
    );
  }
  fs.writeFileSync(path.join(outDir, 'index.md'), lines.join('\n'));
  return { undocumented };
};

const headingSlug = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Agents open the component page and rarely reach the pattern or content page
// that governs it, so each component page links back, under its title, to the
// guideline sections that link to it.
const addGuidelineLinks = (results) => {
  const backlinks = new Map();
  for (const { outFile, title } of results) {
    const [area, ...rest] = path.relative(outDir, outFile).split(path.sep);
    if (area !== 'patterns' && area !== 'content') continue;
    // Area overviews link every page they list; they aren't usage guidelines.
    if (rest.join(path.sep) === 'index.md') continue;
    let section;
    for (const line of fs.readFileSync(outFile, 'utf8').split('\n')) {
      const heading = line.match(/^#{2,4} (.+)$/);
      if (heading) section = heading[1].trim();
      for (const [, target] of line.matchAll(
        /\]\(([^)#\s]+\.md)(?:#[^)]*)?\)/g
      )) {
        const linked = path.resolve(path.dirname(outFile), target);
        if (!path.relative(outDir, linked).startsWith(`components${path.sep}`))
          continue;
        const label = section ? `${title} › ${section}` : title;
        const href =
          path.relative(path.dirname(linked), outFile) +
          (section ? `#${headingSlug(section)}` : '');
        const links = backlinks.get(linked) ?? new Map();
        links.set(label, href);
        backlinks.set(linked, links);
      }
    }
  }
  for (const [file, links] of backlinks) {
    if (!fs.existsSync(file)) continue;
    const list = [...links]
      .map(([label, href]) => `[${label}](${href})`)
      .join(', ');
    const page = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(
      file,
      page.replace(
        /^# .+$/m,
        (h1) => `${h1}\n\nUsage guidelines for this component: ${list}.`
      )
    );
  }
  return backlinks.size;
};

const publicExports = findPublicExports();
const isUtility = new Set(publicExports.utilities);
const pages = sourceDirs.flatMap(findPages).sort();
const results = [];
const failures = [];
for (const file of pages) {
  try {
    results.push(convertPage(file));
  } catch (error) {
    failures.push(`${path.relative(docsDir, file)}: ${error.message}`);
  }
}

console.log(
  `Converted ${results.length}/${pages.length} pages into ${path.relative(
    process.cwd(),
    outDir
  )}`
);
const iconCounts = writeIcons();
console.log(
  `Listed ${iconCounts.listed} icon names and ${iconCounts.deprecated} deprecated ones`
);
console.log(
  `Linked ${addGuidelineLinks(results)} component pages to their guidelines`
);
const publicComponents = publicExports.components;
const { undocumented } = writeIndex(results, publicComponents);
console.log(
  `Indexed ${publicComponents.length - undocumented.length}/${
    publicComponents.length
  } public components`
);
if (failures.length) {
  console.error(`\nFailed:\n${failures.join('\n')}`);
  // A failed page is missing from the output, so a release must not ship it.
  process.exitCode = 1;
}
if (dropped.size) {
  console.log('\nDropped content (not representable as markdown):');
  for (const [what, files] of [...dropped].sort(
    (a, b) => b[1].size - a[1].size
  )) {
    console.log(`  ${what}: ${files.size} page(s), e.g. ${[...files][0]}`);
  }
}
