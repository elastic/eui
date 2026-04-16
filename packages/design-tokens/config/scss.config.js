// @ts-check

import { getSourcesForMode, excludePrimitives } from './shared.js';

/** @returns {import('style-dictionary/types').Config[]} */
export function getConfigs() {
  return [
    {
      source: getSourcesForMode('light'),
      preprocessors: ['tokens-studio'],
      platforms: {
        scss: {
          transformGroup: 'tokens-studio',
          buildPath: 'dist/scss/',
          files: [
            {
              destination: 'light.scss',
              format: 'scss/variables',
              filter: excludePrimitives,
            },
          ],
        },
      },
    },
    {
      source: getSourcesForMode('dark'),
      preprocessors: ['tokens-studio'],
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
          ],
        },
      },
    },
  ];
}
