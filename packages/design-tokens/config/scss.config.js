// @ts-check

import { getSourcesForMode, excludePrimitives } from './shared.js';

/**
 * Convert a design token path to EUI SCSS variable naming convention.
 * e.g. ['color', 'primary', '10'] -> '$euiColorPrimary10'
 * e.g. ['color', 'plain', 'light-alpha-8'] -> '$euiColorPlainLightAlpha8'
 * e.g. ['color', 'accent-secondary', '70'] -> '$euiColorAccentSecondary70'
 *
 * @param {string[]} path
 * @returns {string}
 */
function toEuiScssName(path) {
  const camel = path
    .map((segment) => {
      const dehyphenated = segment.replace(/-([a-z0-9])/g, (_, c) =>
        c.toUpperCase()
      );
      return dehyphenated.charAt(0).toUpperCase() + dehyphenated.slice(1);
    })
    .join('');

  return `$eui${camel}`;
}

/**
 * Custom SCSS format that outputs variables with the $euiColor naming
 * convention used by eui-theme-borealis SCSS files.
 *
 * @type {import('style-dictionary/types').FormatFn}
 */
function euiScssFormat({ dictionary }) {
  const header = `// Do not edit directly, this file was auto-generated from @elastic/design-tokens.\n\n`;

  const lines = dictionary.allTokens.map((token) => {
    const name = toEuiScssName(token.path);
    return `${name}: ${token.$value} !default;`;
  });

  return header + lines.join('\n') + '\n';
}

/** Only shade-level tokens (shared across modes) */
function isShadesToken(token) {
  return token.filePath.includes('shades/') && excludePrimitives(token);
}

/** Only mode-level tokens */
function isModeToken(token) {
  return token.filePath.includes('mode/') && excludePrimitives(token);
}

/** @returns {import('style-dictionary/types').Config[]} */
export function getConfigs() {
  return [
    {
      source: getSourcesForMode('light'),
      preprocessors: ['tokens-studio'],
      hooks: {
        formats: { 'eui/scss': euiScssFormat },
      },
      platforms: {
        scss: {
          transformGroup: 'tokens-studio',
          buildPath: 'dist/scss/',
          files: [
            // Generic SCSS (kebab-case naming)
            {
              destination: 'light.scss',
              format: 'scss/variables',
              filter: excludePrimitives,
            },
            // EUI-prefixed: semantic colors (shared, mode-agnostic)
            {
              destination: 'eui-semantic-colors.scss',
              format: 'eui/scss',
              filter: isShadesToken,
            },
            // EUI-prefixed: light mode tokens
            {
              destination: 'eui-colors-light.scss',
              format: 'eui/scss',
              filter: isModeToken,
            },
          ],
        },
      },
    },
    {
      source: getSourcesForMode('dark'),
      preprocessors: ['tokens-studio'],
      hooks: {
        formats: { 'eui/scss': euiScssFormat },
      },
      platforms: {
        scss: {
          transformGroup: 'tokens-studio',
          buildPath: 'dist/scss/',
          files: [
            {
              destination: 'dark.scss',
              format: 'scss/variables',
              filter: excludePrimitives,
            },
            {
              destination: 'eui-colors-dark.scss',
              format: 'eui/scss',
              filter: isModeToken,
            },
          ],
        },
      },
    },
  ];
}
