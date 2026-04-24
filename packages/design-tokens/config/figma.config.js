// @ts-check

import { getSourcesForMode } from './shared.js';

/**
 * Custom format for Figma Variables import (microsoft/figma-variables-import).
 * Outputs a nested JSON structure matching the token hierarchy.
 * @type {import('style-dictionary/types').FormatFn}
 */
function formatFigmaJSON({ dictionary }) {
  const output = {};

  for (const [, token] of dictionary.tokenMap) {
    let current = output;
    for (let i = 0; i < token.path.length - 1; i++) {
      const key = token.path[i];
      if (!current[key]) current[key] = {};
      current = current[key];
    }
    const leaf = token.path[token.path.length - 1];
    current[leaf] = {
      $value: token.$value,
      $type: token.$type,
    };
    if (token.$description) {
      current[leaf].$description = token.$description;
    }
  }

  return JSON.stringify(output, null, 2);
}

// https://github.com/microsoft/figma-variables-import
export const FIGMA_MANIFEST = {
  name: 'EUI',
  collections: {
    Primitives: {
      modes: {
        Default: ['primitives.json'],
      },
    },
    Shades: {
      modes: {
        Default: ['shades.json'],
      },
    },
    'Color Mode': {
      modes: {
        Light: ['mode-light.json'],
        Dark: ['mode-dark.json'],
      },
    },
  },
};

/** @returns {import('style-dictionary/types').Config[]} */
export function getConfigs() {
  return [
    // Primitives + shades (mode-agnostic, use light sources as base)
    {
      source: getSourcesForMode('light'),
      preprocessors: ['tokens-studio'],
      hooks: {
        formats: { 'eui/figma-json': formatFigmaJSON },
      },
      platforms: {
        figma: {
          transformGroup: 'eui',
          buildPath: 'dist/figma/',
          files: [
            {
              destination: 'primitives.json',
              format: 'eui/figma-json',
              filter: (token) => token.filePath.includes('primitives/'),
            },
            {
              destination: 'shades.json',
              format: 'eui/figma-json',
              filter: (token) => token.filePath.includes('shades/'),
            },
            {
              destination: 'mode-light.json',
              format: 'eui/figma-json',
              filter: (token) => token.filePath.includes('mode/'),
            },
          ],
        },
      },
    },
    // Dark mode tokens
    {
      source: getSourcesForMode('dark'),
      preprocessors: ['tokens-studio'],
      hooks: {
        formats: { 'eui/figma-json': formatFigmaJSON },
      },
      platforms: {
        figma: {
          transformGroup: 'eui',
          buildPath: 'dist/figma/',
          files: [
            {
              destination: 'mode-dark.json',
              format: 'eui/figma-json',
              filter: (token) => token.filePath.includes('mode/'),
            },
          ],
        },
      },
    },
  ];
}
