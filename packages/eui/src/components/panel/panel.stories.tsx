/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import { EuiPanel, EuiPanelProps } from './panel';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';

const meta: Meta<EuiPanelProps> = {
  title: 'Layout/EuiPanel',
  component: EuiPanel,
  argTypes: {
    element: {
      options: [undefined, 'div', 'button'],
    },
    ['aria-label']: {
      if: { arg: 'onClick', eq: true },
    },
  },
  args: {
    paddingSize: 'm',
    borderRadius: 'm',
    color: 'plain',
    hasShadow: true,
    hasBorder: false,
    grow: true,
  },
};
enableFunctionToggleControls(meta, ['onClick']);
disableStorybookControls(meta, ['panelRef']);

export default meta;
type Story = StoryObj<EuiPanelProps>;

export const Playground: Story = {
  args: {
    children: 'Panel content',
  },
};

/* Verifying that borders are applied in correct order */
export const OverlappingPanels: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  args: {
    children: 'Panel content',
  },
  render: function Render(args: EuiPanelProps) {
    return (
      <>
        <EuiPanel {...args} />
        <EuiPanel
          {...args}
          css={({ euiTheme }) => ({
            top: `-${euiTheme.size.m}`,
          })}
        />
        <EuiPanel
          {...args}
          css={({ euiTheme }) => ({
            top: `-${euiTheme.size.l}`,
          })}
        />
      </>
    );
  },
};

const panelStyles = (isPrimary: boolean) => {
  return css`
    background-color: ${isPrimary ? 'blue' : 'gray'};
    color: white;
    padding: 16px;
    border-radius: 4px;
  `;
};

export const DynamicStylePanel: Story = {
  args: {
    children: 'Click the button to change panel styles',
  },
  render: function Render(args: EuiPanelProps) {
    const [isPrimary, setIsPrimary] = React.useState(false);

    return (
      <EuiFlexGroup alignItems="baseline" direction="column" gutterSize="s">
        <EuiButton onClick={() => setIsPrimary((v) => !v)}>
          Toggle dynamic style
        </EuiButton>
        <EuiPanel
          {...args}
          color={isPrimary ? 'primary' : 'plain'}
          css={panelStyles(isPrimary)}
        >
          {args.children}
        </EuiPanel>
      </EuiFlexGroup>
    );
  },
};
