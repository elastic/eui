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

/**
 * Ensure that any provider errors throw & warn us early
 */
import { setEuiDevProviderWarning } from '../src/services';
setEuiDevProviderWarning('error');

/**
 * Custom global decorators
 */
import { customJsxDecorator } from './addons/code-snippet/decorators/jsx_decorator';
import { EuiProviderDecorator, euiProviderDecoratorGlobals } from './decorator';

const preview: Preview = {
  decorators: [
    customJsxDecorator,
    (Story, context) => (
      <EuiProviderDecorator
        colorMode={context.globals.colorMode}
        highContrastMode={context.globals.highContrastMode}
        {...(context.componentId === 'theming-euiprovider' && context.args)}
        writingMode={context.globals.writingMode}
        themeName={context.globals.theme}
      >
        <Story />
      </EuiProviderDecorator>
    ),
  ],
  globalTypes: euiProviderDecoratorGlobals,
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
import type { CommonProps } from '../src/components/common';
import { hideStorybookControls } from './utils';
hideStorybookControls<CommonProps>(preview, [
  'css',
  'className',
  'data-test-subj',
]);

export default preview;
