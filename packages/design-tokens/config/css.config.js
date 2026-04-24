// @ts-check

import { getSourcesForMode, excludePrimitives } from './shared.js';

/** @returns {import('style-dictionary/types').Config[]} */
export function getConfigs() {
  return [
    {
      source: getSourcesForMode('light'),
      preprocessors: ['tokens-studio'],
      platforms: {
        css: {
          transformGroup: 'eui',
          buildPath: 'dist/css/',
          files: [
            {
              destination: 'light.css',
              format: 'css/variables',
              filter: excludePrimitives,
              options: {
                selector: ':root, [data-color-mode="light"]',
              },
            },
          ],
        },
      },
    },
    {
      source: getSourcesForMode('dark'),
      preprocessors: ['tokens-studio'],
      platforms: {
        css: {
          transformGroup: 'eui',
          buildPath: 'dist/css/',
          files: [
            {
              destination: 'dark.css',
              format: 'css/variables',
              filter: excludePrimitives,
              options: {
                selector: '[data-color-mode="dark"]',
              },
            },
          ],
        },
      },
    },
  ];
}
