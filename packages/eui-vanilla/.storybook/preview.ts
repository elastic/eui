/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Preview } from '@storybook/html-vite';

import { mcpDecorator } from './mcp-decorator';
import './fonts.css';

import.meta.glob('../generated/*.css', { eager: true });

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Color mode',
        items: [
          { value: 'LIGHT', title: 'Light' },
          { value: 'DARK', title: 'Dark' },
        ],
      },
    },
  },
  initialGlobals: {
    colorMode: 'LIGHT',
  },
  decorators: [mcpDecorator],
  parameters: {
    options: {
      showPanel: true,
    },
    layout: 'padded',
  },
};

export default preview;
