/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../../.storybook/utils';

import { COLORS } from '../panel';
import { EuiSplitPanel, _EuiSplitPanelInnerProps } from './split_panel';

const meta: Meta<_EuiSplitPanelInnerProps> = {
  title: 'Layout/EuiSplitPanel',
  component: EuiSplitPanel.Inner,
  argTypes: {
    color: { control: 'select', options: COLORS },
  },
  args: {
    // Component defaults
    color: 'transparent',
    paddingSize: 'm',
    grow: true,
  },
};
disableStorybookControls(meta, ['panelRef']);

export default meta;
type Story = StoryObj<_EuiSplitPanelInnerProps>;

export const SplitPanelInner: Story = {
  render: ({ ...args }) => (
    <EuiSplitPanel.Outer css={{ blockSize: '100vh' }}>
      <EuiSplitPanel.Inner {...args}>Top panel</EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner {...args} color="subdued" grow>
        Middle panel (with uncontrollable color and grow for contrast)
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner {...args}>
        Controllable bottom panel
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  ),
};

export const SplitPanelInnerDark: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  render: ({ ...args }) => (
    <EuiSplitPanel.Outer css={{ blockSize: '100vh' }}>
      <EuiSplitPanel.Inner {...args}>Top panel</EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner {...args} color="subdued" grow>
        Middle panel (with uncontrollable color and grow for contrast)
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner {...args}>
        Controllable bottom panel
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  ),
};
