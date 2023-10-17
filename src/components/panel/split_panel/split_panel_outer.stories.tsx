/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiSplitPanel, _EuiSplitPanelOuterProps } from './split_panel';

const meta: Meta<_EuiSplitPanelOuterProps> = {
  title: 'EuiSplitPanel',
  component: EuiSplitPanel.Outer,
  args: {
    // Component defaults
    direction: 'column',
    responsive: ['xs', 's'],
  },
};

export default meta;
type Story = StoryObj<_EuiSplitPanelOuterProps>;

export const SplitPanelOuter: Story = {
  render: ({ ...args }) => (
    <EuiSplitPanel.Outer {...args}>
      <EuiSplitPanel.Inner>Top or left panel</EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued">
        Bottom or right panel
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  ),
};
