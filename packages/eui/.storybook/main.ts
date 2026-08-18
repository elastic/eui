/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { default: react } = await import('@vitejs/plugin-react');

    return mergeConfig(config, {
      plugins: [
        react({
          jsxImportSource: '@emotion/react',
          babel: (id: string) => ({
            plugins: [
              [
                '@emotion/babel-plugin',
                { autoLabel: 'always', labelFormat: '[local]' },
              ],
              // `pegjs-inline-precompile` is used by `EuiSearchBar`
              // TODO: simplify with peggy CLI and drop Babel plugin
              ...(/query[\\/]default_syntax\.ts$/.test(id)
                ? ['pegjs-inline-precompile']
                : []),
            ],
          }),
        }),
      ],
      optimizeDeps: {
        exclude: ['pegjs-inline-precompile'],
      },
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: ['src/**/*.{ts,tsx}'],
    },
  },
};

export default config;
