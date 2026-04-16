// @ts-check

/**
 * Shared token sources and configuration for all build targets.
 *
 * The design tokens follow a 3-tier architecture:
 *   1. Primitives (core.*) — raw hex values, not exposed publicly
 *   2. Shades (color.*) — semantic aliases referencing primitives
 *   3. Mode (color.*) — consumer-facing tokens, separate files per color mode
 *
 * Non-color tokens (size, typography, etc.) are mode-agnostic.
 */

/** Token sources shared across all modes (primitives + shades + non-color) */
const SHARED_SOURCES = [
  'tokens/borealis/color/primitives/*.jsonc',
  'tokens/borealis/color/shades/*.jsonc',
  'tokens/borealis/size/*.jsonc',
  'tokens/borealis/typography/*.jsonc',
  'tokens/borealis/animation/*.jsonc',
  'tokens/borealis/border/*.jsonc',
  'tokens/borealis/breakpoint/*.jsonc',
  'tokens/borealis/elevation/*.jsonc',
];

/**
 * Get token sources for a given color mode.
 * @param {'light' | 'dark'} mode
 */
export function getSourcesForMode(mode) {
  return [
    ...SHARED_SOURCES,
    `tokens/borealis/color/mode/${mode}/*.jsonc`,
  ];
}

/**
 * Filter to exclude primitive (core.*) tokens from public outputs.
 * Primitives are internal building blocks — consumers use semantic tokens.
 * @param {import('style-dictionary/types').TransformedToken} token
 */
export function excludePrimitives(token) {
  return !token.path[0]?.startsWith('core');
}
