/**
 * Syncs Kibana's i18n_eui_mapping.tsx with EUI's i18ntokens.json.
 *
 * Run from the Kibana repo root after updating the @elastic/eui dependency:
 *
 *   node /path/to/sync_kibana_i18n.mjs \
 *     --old-tokens /tmp/old_i18ntokens.json \
 *     --new-tokens node_modules/@elastic/eui/i18ntokens.json \
 *     --mapping-file src/core/packages/i18n/browser-internal/src/i18n_eui_mapping.tsx
 */

import fs from 'node:fs/promises';
import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// Token diff
// ---------------------------------------------------------------------------

function buildTokenMap(tokens) {
  return new Map(tokens.map((t) => [t.token, t.defString]));
}

function computeDiff(oldTokens, newTokens) {
  const oldMap = buildTokenMap(oldTokens);
  const newMap = buildTokenMap(newTokens);

  const added = [];
  const removed = [];
  const modified = [];

  for (const [token, defString] of oldMap) {
    if (!newMap.has(token)) {
      removed.push(token);
    } else if (newMap.get(token) !== defString) {
      modified.push({ token, defString: newMap.get(token) });
    }
  }

  for (const [token, defString] of newMap) {
    if (!oldMap.has(token)) {
      added.push({ token, defString });
    }
  }

  return { added, removed, modified };
}

// ---------------------------------------------------------------------------
// Entry generation
// ---------------------------------------------------------------------------

function extractVars(defString) {
  return [
    ...new Set(
      (defString.match(/\{([a-zA-Z0-9_]+)\}/g) || []).map((m) => m.slice(1, -1))
    ),
  ];
}

function escapeSingleQuote(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateEntry(token, defString) {
  const vars = extractVars(defString);
  const kbnKey = `core.${token}`;
  const escapedDef = escapeSingleQuote(defString);

  if (vars.length === 0) {
    return [
      `    '${token}': i18n.translate('${kbnKey}', {`,
      `      defaultMessage: '${escapedDef}',`,
      `    }),`,
    ].join('\n');
  }

  const params = vars.join(', ');
  return [
    `    '${token}': ({ ${params} }: EuiValues) =>`,
    `      i18n.translate('${kbnKey}', {`,
    `        defaultMessage: '${escapedDef}',`,
    `        values: { ${params} },`,
    `      }),`,
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Mapping file parsing
// ---------------------------------------------------------------------------

// Each top-level entry in the returned object starts with exactly 4 spaces
// followed by a quoted eui token key. We rely on that invariant to locate
// entry boundaries — no full AST parse needed.
const TOKEN_LINE_RE = /^    '(eui[^']+)':/;
const CLOSING_RE = /^  \};/;

function parseEntries(content) {
  const lines = content.split('\n');
  const starts = [];
  let closingLine = lines.length - 1;

  for (let i = 0; i < lines.length; i++) {
    const m = TOKEN_LINE_RE.exec(lines[i]);
    if (m) {
      starts.push({ token: m[1], line: i });
    } else if (CLOSING_RE.test(lines[i])) {
      closingLine = i;
    }
  }

  const entries = new Map();
  for (let i = 0; i < starts.length; i++) {
    const { token, line: startLine } = starts[i];
    let endLine =
      i + 1 < starts.length ? starts[i + 1].line - 1 : closingLine - 1;
    // trim trailing blank lines within the entry
    while (endLine > startLine && lines[endLine].trim() === '') endLine--;
    entries.set(token, { startLine, endLine });
  }

  return { entries, closingLine };
}

// ---------------------------------------------------------------------------
// Patch application
// ---------------------------------------------------------------------------

function applyChanges(content, { added, removed, modified }) {
  const { entries, closingLine } = parseEntries(content);
  let lines = content.split('\n');

  // Collect replacements (removed → null, modified → new entry text)
  // then apply from the bottom up so earlier line indices stay stable.
  const ops = [];

  for (const token of removed) {
    const range = entries.get(token);
    if (range) {
      ops.push({ ...range, replacement: null });
    } else {
      console.warn(`  [warn] Token not found in mapping, cannot remove: ${token}`);
    }
  }

  for (const { token, defString } of modified) {
    const range = entries.get(token);
    if (range) {
      ops.push({ ...range, replacement: generateEntry(token, defString) });
    } else {
      // Token was in old JSON but not in mapping — treat as addition
      added.push({ token, defString });
    }
  }

  // Sort bottom-to-top so splices don't invalidate subsequent indices
  ops.sort((a, b) => b.startLine - a.startLine);

  for (const { startLine, endLine, replacement } of ops) {
    if (replacement === null) {
      lines.splice(startLine, endLine - startLine + 1);
    } else {
      lines.splice(startLine, endLine - startLine + 1, ...replacement.split('\n'));
    }
  }

  // Additions: reparse to find the (possibly shifted) closing line, then
  // insert all new entries just before it, sorted alphabetically.
  if (added.length > 0) {
    const updatedContent = lines.join('\n');
    const { closingLine: newClosingLine } = parseEntries(updatedContent);
    lines = updatedContent.split('\n');

    const newEntryLines = added
      .sort((a, b) => a.token.localeCompare(b.token))
      .flatMap(({ token, defString }) => generateEntry(token, defString).split('\n'));

    lines.splice(newClosingLine, 0, ...newEntryLines);
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const { values: opts } = parseArgs({
  options: {
    'old-tokens': { type: 'string' },
    'new-tokens': { type: 'string' },
    'mapping-file': { type: 'string' },
  },
});

for (const key of ['old-tokens', 'new-tokens', 'mapping-file']) {
  if (!opts[key]) {
    console.error(`Missing required argument: --${key}`);
    process.exit(1);
  }
}

const oldTokens = JSON.parse(await fs.readFile(opts['old-tokens'], 'utf8'));
const newTokens = JSON.parse(await fs.readFile(opts['new-tokens'], 'utf8'));
const mappingPath = opts['mapping-file'];

const diff = computeDiff(oldTokens, newTokens);
const totalChanges = diff.added.length + diff.removed.length + diff.modified.length;

if (totalChanges === 0) {
  console.log('[sync-kibana-i18n] No token changes — mapping is up to date');
  process.exit(0);
}

console.log(
  `[sync-kibana-i18n] ${diff.added.length} added, ${diff.removed.length} removed, ${diff.modified.length} modified`
);
if (diff.added.length) console.log('  Added:   ', diff.added.map((t) => t.token).join(', '));
if (diff.removed.length) console.log('  Removed: ', diff.removed.join(', '));
if (diff.modified.length) console.log('  Modified:', diff.modified.map((t) => t.token).join(', '));

const content = await fs.readFile(mappingPath, 'utf8');
const newContent = applyChanges(content, diff);
await fs.writeFile(mappingPath, newContent, 'utf8');

console.log(`[sync-kibana-i18n] Patched ${mappingPath}`);
