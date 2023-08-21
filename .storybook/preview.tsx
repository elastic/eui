/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="@emotion/react/types/css-prop" />

import React from 'react';
import type { Preview } from '@storybook/react';

/*
 * Preload all EuiIcons - Storybook does not support dynamic icon loading
 * TODO: https://github.com/elastic/eui/issues/5463
 */
import { typeToPathMap } from '../src/components/icon/icon_map';
import { appendIconComponentCache } from '../src/components/icon/icon';
const iconCache: Record<string, React.FC> = {};

Object.entries(typeToPathMap).forEach(async ([iconType, iconFileName]) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const iconExport = require(`../src/components/icon/assets/${iconFileName}`);
  iconCache[iconType] = iconExport.icon;
});
appendIconComponentCache(iconCache);

/*
 * Theming
 */
import { EuiProvider } from '../src/components/provider';
import { writingModeStyles } from './writing_mode.styles';

// Import light theme for components still using Sass styling
// TODO: Remove this import and the `yarn compile-scss &&` command
// once all EUI components are converted to Emotion
import '../dist/eui_theme_light.css';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <EuiProvider colorMode={context.globals.colorMode}>
        <div
          css={[
            writingModeStyles.writingMode,
            // @ts-ignore - we're manually ensuring `writingMode` globals match our Emotion style keys
            writingModeStyles[context.globals.writingMode],
          ]}
        >
          <Story />
        </div>
      </EuiProvider>
    ),
  ],
  globalTypes: {
    colorMode: {
      description: 'Color mode for EuiProvider theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color mode',
        items: [
          { value: 'light', title: 'Light mode', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark mode', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
    writingMode: {
      description: 'Writing mode for testing logical property directions',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Writing mode',
        items: [
          { value: 'ltr', title: 'LTR', icon: 'arrowleft' },
          { value: 'rtl', title: 'RTL', icon: 'arrowright' },
          { value: 'vertical-lr', title: 'Vertical LTR', icon: 'arrowup' },
          { value: 'vertical-rl', title: 'Vertical RTL', icon: 'arrowdown' },
          { value: 'sideways', title: 'Sideways LTR', icon: 'collapse' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: { disable: true }, // Use colorMode instead
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // Due to CommonProps, these props appear on almost every Story, but generally
  // aren't super useful to test - let's disable them by default and (if needed)
  // individual stories can re-enable them
  argTypes: {
    css: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-subj': { table: { disable: true } },
  },
};

export default preview;
