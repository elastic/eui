/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../.storybook/utils';

import { EuiPanel } from '../panel';

import { EuiAutoSizer, EuiAutoSizerProps, EuiAutoSize } from './auto_sizer';

const meta: Meta<EuiAutoSizerProps> = {
  title: 'EuiAutoSizer',
  component: EuiAutoSizer,
  args: {
    // Component defaults
    tagName: 'div',
  },
};

export default meta;
type Story = StoryObj<EuiAutoSizerProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <div
      // Inherit Storybook demo viewport if no other height/width specified
      style={{
        blockSize: args.defaultHeight || 'calc(100vh - 2rem)',
        inlineSize: args.defaultWidth || '100%',
      }}
    >
      <EuiAutoSizer {...args}>
        {({ height, width }: EuiAutoSize) => (
          <EuiPanel style={{ height, width, display: 'inline-block' }}>
            height: {height}, width: {width}
          </EuiPanel>
        )}
      </EuiAutoSizer>
    </div>
  ),
  argTypes: disableStorybookControls(['children']),
};
