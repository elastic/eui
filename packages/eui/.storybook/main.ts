/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // Fix for `css` prop - Emotion doesn't work otherwise
    config.module!.rules!.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // we need to resolve to the modules file as otherwise
          // 'tty' and 'os' dependencies are not resolved correctly
          // https://github.com/storybookjs/storybook/issues/26997#issuecomment-2088494093
          '@storybook/test': path.resolve(
            __dirname,
            '../node_modules/@storybook/test/dist/index.mjs'
          ),
        },
      },
    };
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
