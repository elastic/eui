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
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

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

/**
 * Ensure that any provider errors throw & warn us early
 */
import { setEuiDevProviderWarning } from '../src/services';
setEuiDevProviderWarning('error');

/**
 * Prop controls
 */

import type { CommonProps } from '../src/components/common';
import { hideStorybookControls } from './utils';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <EuiProvider
        colorMode={context.globals.colorMode}
        {...(context.componentId === 'theming-euiprovider' && context.args)}
      >
        <div
          /* #story-wrapper should always be the element that wraps <Story /> */
          id="story-wrapper"
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
    backgrounds: { disable: true }, // Use colorMode instead
    options: {
      showPanel: true, // default to showing the controls panel
      storySort: {
        method: 'alphabetical',
        order: [
          // order option as well as story titles require static content (dynamic values or references don't work)
          // https://storybook.js.org/docs/api/parameters#optionsstorysort
          // https://storybook.js.org/docs/writing-stories#default-export
          'Theming',
          'Templates',
          'Layout',
          'Navigation',
          'Display',
          'Forms',
          'Tabular Content',
          'Editors & Syntax',
          'Utilities',
          '*',
        ],
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
    },
  },
};
// Due to CommonProps, these props appear on almost every Story, but generally
// aren't super useful to test - let's disable them by default and (if needed)
// individual stories can re-enable them, e.g. by passing
// `argTypes: { 'data-test-subj': { table: { disable: false } } }`
hideStorybookControls<CommonProps>(preview, [
  'css',
  'className',
  'data-test-subj',
]);

export default preview;
