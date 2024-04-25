/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiScreenReaderOnly,
  EuiScreenReaderOnlyProps,
} from './screen_reader_only';

const meta: Meta<EuiScreenReaderOnlyProps> = {
  title: 'Utilities/EuiScreenReaderOnly',
  component: EuiScreenReaderOnly,
  args: {
    // Component defaults
    showOnFocus: false,
  },
  parameters: {
    loki: {
      // There are no visual elements to test
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiScreenReaderOnlyProps>;

export const Playground: Story = {
  args: {
    // @ts-ignore - Normally wants a JSX/DOM node, but we're handling that below in <render>
    children: 'Hello world',
  },
  render: ({ showOnFocus, children, ...args }) => (
    <EuiScreenReaderOnly showOnFocus={showOnFocus} {...args}>
      {showOnFocus ? <button>{children}</button> : <span>{children}</span>}
    </EuiScreenReaderOnly>
  ),
};
