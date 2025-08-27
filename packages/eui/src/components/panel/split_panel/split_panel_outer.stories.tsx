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
  title: 'Layout/EuiSplitPanel',
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

export const SplitPanelOuterDark: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  render: ({ ...args }) => (
    <EuiSplitPanel.Outer {...args}>
      <EuiSplitPanel.Inner>Top or left panel</EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued">
        Bottom or right panel
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  ),
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  render: () => (
    <>
      <EuiSplitPanel.Outer direction="row">
        <EuiSplitPanel.Inner>
          <EuiSplitPanel.Outer direction="column">
            <EuiSplitPanel.Inner>Nested</EuiSplitPanel.Inner>
            <EuiSplitPanel.Inner>Border test</EuiSplitPanel.Inner>
          </EuiSplitPanel.Outer>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner color="subdued">Right panel</EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
      <div style={{ height: 20 }} />
      <EuiSplitPanel.Outer>
        <EuiSplitPanel.Inner>
          <EuiSplitPanel.Outer
            direction="row"
            responsive={false}
            color="primary"
          >
            <EuiSplitPanel.Inner>Nested</EuiSplitPanel.Inner>
            <EuiSplitPanel.Inner>
              <EuiSplitPanel.Outer direction="column" color="danger">
                <EuiSplitPanel.Inner>Nested again</EuiSplitPanel.Inner>
                <EuiSplitPanel.Inner>*inception noises*</EuiSplitPanel.Inner>
              </EuiSplitPanel.Outer>
            </EuiSplitPanel.Inner>
          </EuiSplitPanel.Outer>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner color="subdued">Bottom panel</EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
      <div style={{ height: 20 }} />
      <EuiSplitPanel.Outer color="transparent">
        <EuiSplitPanel.Inner>
          Transparent panels should not render border dividers
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner>
          <EuiSplitPanel.Outer color="transparent" hasBorder>
            <EuiSplitPanel.Inner>But transparent panels</EuiSplitPanel.Inner>
            <EuiSplitPanel.Inner>
              with <code>hasBorder</code> should
            </EuiSplitPanel.Inner>
          </EuiSplitPanel.Outer>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </>
  ),
};
