// @ts-check

import { getSourcesForMode, excludePrimitives } from './shared.js';

/** @returns {import('style-dictionary/types').Config[]} */
export function getConfigs() {
  return [
    {
      source: getSourcesForMode('light'),
      preprocessors: ['tokens-studio'],
      platforms: {
        ts: {
          transformGroup: 'tokens-studio',
          buildPath: 'dist/ts/',
          files: [
            {
              destination: 'light.json',
              format: 'json/nested',
              filter: excludePrimitives,
            },
            // Full output including primitives (for eui-theme-borealis consumption)
            {
              destination: 'light-all.json',
              format: 'json/nested',
            },
          ],
        },
      },
    },
    {
      source: getSourcesForMode('dark'),
      preprocessors: ['tokens-studio'],
      platforms: {
        ts: {
          transformGroup: 'tokens-studio',
          buildPath: 'dist/ts/',
          files: [
            {
              destination: 'dark.json',
              format: 'json/nested',
              filter: excludePrimitives,
            },
            {
              destination: 'dark-all.json',
              format: 'json/nested',
            },
          ],
        },
      },
    },
  ];
}
