// Parses a run's diff and the changed files (post-change, from the run copy) into something the
// case checks can query: new JSX elements with attrs and ancestors, EUI imports, added text.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';

const BASE_A = path.join(os.homedir(), 'kbx/base-a/kibana');
// icon, iconType, statusIcon, ...; not iconSide/iconSize/iconColor.
const ICON_KEY = /icon(Type)?$/i;
const ts = createRequire(path.join(BASE_A, 'package.json'))('typescript');

export function parseDiff(patch) {
  const files = new Map(); // path -> { added: Set<lineNo>, addedText: string[], isNew, deleted }
  let cur = null;
  let line = 0;
  for (const l of patch.split('\n')) {
    if (l.startsWith('diff --git ')) { cur = null; continue; }
    if (l.startsWith('+++ ')) {
      const p = l.slice(4);
      if (p === '/dev/null') { cur = null; continue; }
      cur = { added: new Set(), addedText: [], isNew: false };
      files.set(p.replace(/^b\//, ''), cur);
      continue;
    }
    if (l.startsWith('--- ')) continue;
    if (!cur) continue;
    const h = l.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (h) { line = Number(h[1]); continue; }
    if (l.startsWith('+')) { cur.added.add(line); cur.addedText.push(l.slice(1)); line++; }
    else if (l.startsWith('-')) { /* old side only */ }
    else if (l.startsWith(' ')) line++;
  }
  return files;
}

function tagName(node) {
  return node.tagName.getText();
}

export function analyze(runCwd, patch) {
  const files = parseDiff(patch);
  const els = [];
  const icons = []; // { value, isNew, file, line, keys }
  // Icon expressions not resolved to a literal here, for review: `{STATUS[status]}` over a map in
  // another file, a prop, a function call.
  const unresolvedIcons = [];
  // Each `actions: [...]` array (EuiBasicTable columns, mostly): one entry per item, props = keys of
  // an object literal item, null for anything else.
  const actions = [];
  const imports = new Map(); // name -> { from, isNew }
  const addedLines = [];
  // Added lines outside Markdown: setup files (AGENTS.md, skills, READMEs) show up in the diff too.
  const addedCodeLines = [];
  const changedCode = [];

  const parsed = [];
  // Object literals bound to a name in any changed file, for `{MAP[key]}` icon lookups across files.
  const objectVars = new Map(); // name -> { init, ctx }
  for (const [rel, info] of files) {
    addedLines.push(...info.addedText);
    if (!/\.md$/.test(rel)) addedCodeLines.push(...info.addedText);
    if (!/\.(tsx?|jsx?)$/.test(rel) || /\.test\.|\.stories\./.test(rel)) continue;
    const abs = path.join(runCwd, rel);
    if (!fs.existsSync(abs)) continue;
    changedCode.push(rel);
    const src = fs.readFileSync(abs, 'utf8');
    const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.Latest, true, rel.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const lineOf = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
    const isNewNode = (n) => {
      const start = lineOf(n);
      const end = sf.getLineAndCharacterOfPosition(n.getEnd()).line + 1;
      for (let i = start; i <= end; i++) if (info.added.has(i)) return true;
      return false;
    };
    // Enclosing property and variable names, lowercased: a status icon sits under `paused: {...}` or
    // in a map keyed by status.
    const keysOf = (n) => {
      const keys = [];
      for (let p = n; p; p = p.parent) if ((ts.isPropertyAssignment(p) || ts.isVariableDeclaration(p)) && p.name) keys.push(p.name.getText(sf).replace(/['"]/g, '').toLowerCase());
      return keys;
    };
    const ctx = { rel, info, sf, lineOf, isNewNode, keysOf };
    parsed.push(ctx);
    const collectVars = (n) => {
      if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer) {
        let init = n.initializer;
        while (ts.isAsExpression(init) || ts.isSatisfiesExpression(init) || ts.isParenthesizedExpression(init)) init = init.expression;
        if (ts.isObjectLiteralExpression(init)) objectVars.set(n.name.text, { init, ctx });
      }
      ts.forEachChild(n, collectVars);
    };
    collectVars(sf);
  }

  const resolvedMaps = new Set();
  // `{MAP[key]}` over an object literal of strings: count each string as an icon.
  const iconExpr = (expr, el, isNew, keys) => {
    // A JSX node (EuiEmptyPrompt icon={<EuiLoadingSpinner />}) isn't a name.
    if (/^\{\s*</.test(expr)) return;
    const ternary = expr.match(/^\{.*\?\s*(['"])([\w-]+)\1\s*:\s*(['"])([\w-]+)\3\s*\}$/);
    if (ternary) {
      for (const value of [ternary[2], ternary[4]]) icons.push({ value, isNew, file: el.file, line: el.line, el: el.name, keys });
      return;
    }
    const m = expr.match(/^\{(\w+)\[[^\]]+\]\}$/);
    const map = m && objectVars.get(m[1]);
    if (map) {
      if (resolvedMaps.has(m[1])) return;
      resolvedMaps.add(m[1]);
      const { init, ctx } = map;
      for (const p of init.properties) {
        if (ts.isPropertyAssignment(p) && (ts.isStringLiteral(p.initializer) || ts.isNoSubstitutionTemplateLiteral(p.initializer))) {
          icons.push({ value: p.initializer.text, isNew: ctx.isNewNode(p), file: ctx.rel, line: ctx.lineOf(p), el: 'map', keys: ctx.keysOf(p) });
        }
      }
      return;
    }
    // `{icon}`, `{config.iconType}`: the literal sits on an icon-named property, counted there.
    if (ICON_KEY.test(expr.match(/(\w+)\W*$/)?.[1] ?? '')) return;
    unresolvedIcons.push({ expr, file: el.file, line: el.line, el: el.name, isNew: el.isNew });
  };

  for (const { rel, info, sf, lineOf, isNewNode, keysOf } of parsed) {

    const visit = (node, ancestors) => {
      if (ts.isImportDeclaration(node)) {
        const from = node.moduleSpecifier.text;
        const named = node.importClause?.namedBindings;
        if (named && ts.isNamedImports(named)) {
          for (const s of named.elements) imports.set(s.name.text, { from, isNew: isNewNode(s) });
        }
      }
      let next = ancestors;
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const name = tagName(node);
        const attrs = {};
        const attrNodes = {};
        for (const p of node.attributes.properties) {
          if (ts.isJsxAttribute(p)) attrNodes[p.name.getText(sf)] = p;
          if (ts.isJsxAttribute(p)) {
            const init = p.initializer;
            let value = true;
            // String literals (also {'x'}) come through bare; other expressions as `{expr}`.
            if (init && ts.isStringLiteral(init)) value = init.text;
            else if (init?.expression && (ts.isStringLiteral(init.expression) || ts.isNoSubstitutionTemplateLiteral(init.expression))) value = init.expression.text;
            else if (init) value = `{${init.expression ? init.expression.getText(sf) : init.getText(sf)}}`;
            attrs[p.name.getText(sf)] = value;
          } else if (ts.isJsxSpreadAttribute(p)) {
            attrs['...'] = p.expression.getText(sf);
          }
        }
        // `text` is the opening tag; `body` adds children and the closing tag.
        // Only the opening tag line counts, so a new prop on an old element is not a "new element".
        const el = { name, attrs, ancestors: [...ancestors], file: rel, line: lineOf(node), isNew: info.added.has(lineOf(node)), text: node.getText(sf), body: (ts.isJsxOpeningElement(node) ? node.parent : node).getText(sf) };
        els.push(el);
        // Judge each icon by its own attribute's lines: a multi-line element with new children in
        // another prop would otherwise make its old icon look new.
        const iconAttrs = Object.keys(attrs).filter((k) => ICON_KEY.test(k) || (name === 'EuiIcon' && k === 'type'));
        for (const k of iconAttrs) {
          const v = attrs[k];
          if (typeof v !== 'string') continue;
          if (v.startsWith('{')) iconExpr(v, el, isNewNode(attrNodes[k]), keysOf(node));
          else icons.push({ value: v, isNew: isNewNode(attrNodes[k]), file: rel, line: el.line, el: name, keys: keysOf(node) });
        }
      }
      if (ts.isJsxElement(node)) next = [...ancestors, tagName(node.openingElement)];
      if (ts.isPropertyAssignment(node) && ICON_KEY.test(node.name.getText(sf)) && ts.isStringLiteral(node.initializer)) {
        icons.push({ value: node.initializer.text, isNew: isNewNode(node), file: rel, line: lineOf(node), el: 'prop', keys: keysOf(node) });
      }
      if (ts.isPropertyAssignment(node) && node.name.getText(sf) === 'actions' && ts.isArrayLiteralExpression(node.initializer)) {
        for (const item of node.initializer.elements) {
          const props = ts.isObjectLiteralExpression(item) ? item.properties.map((p) => p.name?.getText(sf)).filter(Boolean) : null;
          actions.push({ props, isNew: isNewNode(item), file: rel, line: lineOf(item), text: item.getText(sf).slice(0, 80) });
        }
      }
      ts.forEachChild(node, (c) => visit(c, next));
    };
    visit(sf, []);
  }

  const added = addedLines.join('\n');
  const addedCode = addedCodeLines.join('\n');
  const newEls = (name) => els.filter((e) => e.isNew && (typeof name === 'string' ? e.name === name : name.test(e.name)));
  return {
    files: [...files.keys()],
    addedCode,
    changedCode,
    els,
    icons,
    unresolvedIcons,
    actions,
    imports,
    added,
    newEls,
    rendered: (name) => newEls(name).length > 0,
    // Element is anywhere in the tree, new or not (for "inside X" where X already existed).
    anyEls: (name) => els.filter((e) => e.name === name),
    inside: (el, name) => el.ancestors.some((a) => (typeof name === 'string' ? a === name : name.test(a))),
    has: (el, attr) => el.attrs[attr] !== undefined,
  };
}
