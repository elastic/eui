#!/usr/bin/env node
// @ts-check

/**
 * Validates that the legacy eui_theme_borealis JSON files are in sync
 * with the design tokens output.
 *
 * Compares only the subset of legacy keys that have corresponding
 * design tokens — component-level and computed values are skipped.
 *
 * Usage:
 *   node packages/design-tokens/scripts/validate-legacy-json.js
 *
 * Exit codes:
 *   0 — all matched tokens are in sync (format-only differences are warnings)
 *   1 — value mismatches found
 */

import fs from 'node:fs';
import path from 'node:path';

const DESIGN_TOKENS_DIR = path.resolve(import.meta.dirname, '..');
const BOREALIS_DIR = path.resolve(DESIGN_TOKENS_DIR, '../eui-theme-borealis/src');

/**
 * Flatten a nested object to dot-path -> string value pairs.
 * @param {Record<string, any>} obj
 * @param {string} prefix
 * @returns {Record<string, string>}
 */
function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null) {
      Object.assign(result, flatten(val, p));
    } else {
      result[p] = String(val);
    }
  }
  return result;
}

/**
 * Convert a dot-path to camelCase: "color.background.base.primary" -> "colorBackgroundBasePrimary"
 * @param {string} dotPath
 */
function toCamelCase(dotPath) {
  return dotPath
    .split('.')
    .map((part, i) => {
      const dehyphenated = part.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return i === 0
        ? dehyphenated
        : dehyphenated.charAt(0).toUpperCase() + dehyphenated.slice(1);
    })
    .join('');
}

/**
 * Normalize a color string for comparison.
 * Returns { normalized, isAlpha } where normalized is lowercase hex
 * for solid colors, or null if it's an alpha/complex value.
 * @param {string} value
 */
function normalizeColor(value) {
  const trimmed = value.trim().toLowerCase();

  // Hex color
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return { normalized: trimmed, isAlpha: false };
  }

  // transparent keyword
  if (trimmed === 'transparent') {
    return { normalized: 'transparent', isAlpha: true };
  }

  // rgba(0, 0, 0, 0) — treat as transparent
  if (/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/.test(trimmed)) {
    return { normalized: 'transparent', isAlpha: true };
  }

  // Any rgba() or rgb() with alpha — flag as alpha for format comparison
  if (/^(rgba?\(|rgb\()/.test(trimmed)) {
    return { normalized: trimmed, isAlpha: true };
  }

  // Non-color values (dimensions, numbers, strings)
  return { normalized: trimmed, isAlpha: false };
}

/**
 * @param {'light' | 'dark'} mode
 */
function validateMode(mode) {
  const legacyPath = path.join(BOREALIS_DIR, `eui_theme_borealis_${mode}.json`);
  const tokensPath = path.join(DESIGN_TOKENS_DIR, `dist/ts/${mode}.json`);

  if (!fs.existsSync(tokensPath)) {
    console.error(`Design tokens not built. Run "yarn build:ts" in packages/design-tokens first.`);
    process.exit(1);
  }

  const legacy = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  // Build camelCase -> { path, value } lookup from design tokens
  const flat = flatten(tokens);
  /** @type {Record<string, { path: string; value: string }>} */
  const tokenLookup = {};
  for (const [dotPath, value] of Object.entries(flat)) {
    tokenLookup[toCamelCase(dotPath)] = { path: dotPath, value };
  }

  /** @type {{ key: string; tokenPath: string; legacy: string; token: string }[]} */
  const valueMismatches = [];
  /** @type {{ key: string; tokenPath: string; legacy: string; token: string }[]} */
  const formatDiffs = [];
  let matched = 0;

  for (const [legacyKey, legacyVal] of Object.entries(legacy)) {
    if (typeof legacyVal === 'object') continue;

    // Strip 'eui' prefix and lowercase first char
    const stripped = legacyKey.replace(/^eui/, '');
    const normalized = stripped.charAt(0).toLowerCase() + stripped.slice(1);

    const token = tokenLookup[normalized];
    if (!token) continue;

    matched++;

    const legacyStr = String(legacyVal);
    const tokenStr = token.value;

    // Exact match (case-insensitive for hex)
    if (legacyStr.toLowerCase() === tokenStr.toLowerCase()) continue;

    const legacyNorm = normalizeColor(legacyStr);
    const tokenNorm = normalizeColor(tokenStr);

    // Both normalized to the same value
    if (legacyNorm.normalized === tokenNorm.normalized) continue;

    // Alpha format difference (same visual color, different string)
    if (legacyNorm.isAlpha && tokenNorm.isAlpha) {
      formatDiffs.push({
        key: legacyKey,
        tokenPath: token.path,
        legacy: legacyStr,
        token: tokenStr,
      });
    } else {
      valueMismatches.push({
        key: legacyKey,
        tokenPath: token.path,
        legacy: legacyStr,
        token: tokenStr,
      });
    }
  }

  return { mode, matched, total: Object.keys(legacy).length, valueMismatches, formatDiffs };
}

// --- Main ---

console.log('Validating legacy JSON files against design tokens...\n');

const results = [validateMode('light'), validateMode('dark')];
let hasErrors = false;

for (const { mode, matched, total, valueMismatches, formatDiffs } of results) {
  console.log(`── ${mode} mode ── (${matched} / ${total} keys matched to design tokens)`);

  if (valueMismatches.length === 0 && formatDiffs.length === 0) {
    console.log('   All matched values are in sync.\n');
    continue;
  }

  if (valueMismatches.length > 0) {
    hasErrors = true;
    console.log(`\n   VALUE MISMATCHES (${valueMismatches.length}):`);
    for (const m of valueMismatches) {
      console.log(`   ✗ ${m.key} → ${m.tokenPath}`);
      console.log(`     legacy: ${m.legacy}`);
      console.log(`     token:  ${m.token}`);
    }
  }

  if (formatDiffs.length > 0) {
    console.log(`\n   FORMAT DIFFERENCES (${formatDiffs.length}) — same visual color, different string:`);
    for (const d of formatDiffs) {
      console.log(`   ~ ${d.key} → ${d.tokenPath}`);
      console.log(`     legacy: ${d.legacy}`);
      console.log(`     token:  ${d.token}`);
    }
  }

  console.log('');
}

if (hasErrors) {
  console.log('FAIL — value mismatches found. Update the legacy JSON files or the design tokens.');
  process.exit(1);
} else {
  console.log('PASS — all matched values are in sync (format differences are expected).');
  process.exit(0);
}
