/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * Converts the website's component MDX pages into plain markdown that coding
 * agents can read from the installed @elastic/eui package.
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
// Utilities hold documented components too (EuiProvider, EuiPortal, EuiFocusTrap...)
const sourceDirs = ['components', 'utilities'].map((dir) =>
  path.join(docsDir, dir)
);
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

const renderPropTable = (component) => {
  const rows = Object.values(component.props).map((prop) => {
    let type = prop.type?.raw ?? prop.type?.name ?? '';
    if (type.length > MAX_TYPE_LENGTH)
      type = `${type.slice(0, MAX_TYPE_LENGTH)}… (truncated, see eui.d.ts)`;
    const name = prop.isRequired
      ? `\`${prop.name}\` (required)`
      : `\`${prop.name}\``;
    const defaultValue = prop.defaultValue
      ? `\`${escapeCell(prop.defaultValue)}\``
      : '';
    return `| ${name} | \`${escapeCell(
      type
    )}\` | ${defaultValue} | ${escapeCell(prop.description ?? '')} |`;
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

const outputPathFor = (file) =>
  path.join(outDir, path.relative(docsDir, file).replace(/\.mdx$/, '.md'));

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
    if (entry.isDirectory()) return findPages(full);
    return entry.name.endsWith('.mdx') && !entry.name.startsWith('_')
      ? [full]
      : [];
  });

const convertPage = (file) => {
  const frontmatter = readFrontmatter(file);
  const tree = convertTree(file);
  const keywords = (frontmatter.keywords ?? []).filter((k) =>
    /^Eui[A-Z]/.test(k)
  );
  const components = [...new Set([...keywords, ...tree.ctx.components])];
  const h1 = tree.children.find(
    (node) => node.type === 'heading' && node.depth === 1
  );
  const header = {
    title:
      frontmatter.title ??
      (h1 && printer.stringify({ type: 'root', children: h1.children }).trim()),
    ...(frontmatter.description && { description: frontmatter.description }),
    ...(components.length && { components }),
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

// Public component exports: `Eui*` values that can be rendered
const findPublicComponents = () => {
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
  return checker
    .getExportsOfModule(moduleSymbol)
    .filter((symbol) => /^Eui[A-Z]/.test(symbol.name))
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
};

const readCategory = (dir) => {
  const file = path.join(docsDir, dir, '_category_.yml');
  return fs.existsSync(file)
    ? parseYaml(fs.readFileSync(file, 'utf8'))
    : undefined;
};

// Components are grouped by their top-level category, utilities in one group.
// Deeper folders become title context, e.g. "Markdown › Plugins".
const indexPlacement = (result) => {
  const dirs = path
    .relative(docsDir, path.dirname(result.file))
    .split(path.sep);
  const depth = dirs[0] === 'components' ? 2 : 1;
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

const writeIndex = (results, publicComponents) => {
  const isPublic = new Set(publicComponents);
  const groups = new Map();
  for (const result of results) {
    if (path.dirname(result.file) === sourceDirs[0]) continue;
    const { group, title } = indexPlacement(result);
    const category = readCategory(group) ?? {
      label: 'Utilities',
      position: 100,
    };
    if (!groups.has(group)) groups.set(group, { ...category, entries: [] });
    const components = result.components.filter((name) => isPublic.has(name));
    groups.get(group).entries.push({ ...result, title, components });
  }
  const documented = new Set(results.flatMap((result) => result.components));
  const undocumented = publicComponents.filter((name) => !documented.has(name));

  const lines = [
    '# EUI components',
    '',
    'Every documented EUI component and utility, grouped by category. Each entry links to a page with usage guidance, examples and props for the installed version.',
    '',
  ];
  const sorted = [...groups.values()].sort(
    (a, b) =>
      (a.position ?? 99) - (b.position ?? 99) || a.label.localeCompare(b.label)
  );
  for (const { label, entries } of sorted) {
    lines.push(`## ${label}`, '');
    for (const entry of entries.sort((a, b) =>
      a.title.localeCompare(b.title)
    )) {
      const names = entry.components.length
        ? ` (${entry.components.map((c) => `\`${c}\``).join(', ')})`
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
const publicComponents = findPublicComponents();
const { undocumented } = writeIndex(results, publicComponents);
console.log(
  `Indexed ${publicComponents.length - undocumented.length}/${
    publicComponents.length
  } public components`
);
if (failures.length) console.log(`\nFailed:\n${failures.join('\n')}`);
if (dropped.size) {
  console.log('\nDropped content (not representable as markdown):');
  for (const [what, files] of [...dropped].sort(
    (a, b) => b[1].size - a[1].size
  )) {
    console.log(`  ${what}: ${files.size} page(s), e.g. ${[...files][0]}`);
  }
}
