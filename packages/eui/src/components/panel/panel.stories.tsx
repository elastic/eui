/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import {
  euiShadow,
  highContrastModeStyles,
  logicalCSS,
} from '../../global_styling';
import { useEuiTheme } from '../../services';
import { EuiPanel, EuiPanelProps } from './panel';
import { EuiSplitPanel } from './split_panel';
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
    hasShadow: false,
    hasBorder: true,
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
      <div css={{ position: 'relative' }}>
        <EuiPanel {...args} />
        <EuiPanel
          {...args}
          css={({ euiTheme }) => ({
            position: 'relative',
            top: `-${euiTheme.size.m}`,
          })}
        />
        <EuiPanel
          {...args}
          css={({ euiTheme }) => ({
            position: 'relative',
            top: `-${euiTheme.size.l}`,
          })}
        />
      </div>
    );
  },
};

export const Kitchensink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['color', 'paddingSize'],
    },
  },
  args: {
    children: 'Panel content',
  },
  render: function Render(args: EuiPanelProps) {
    const euiThemeContext = useEuiTheme();
    const { euiTheme } = euiThemeContext;

    return (
      <EuiFlexGroup direction="column" gutterSize="l">
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiPanel {...args} onClick={undefined} />
          <EuiPanel {...args} onClick={() => {}} />
        </EuiFlexGroup>

        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiPanel {...args} hasBorder={false} hasShadow onClick={undefined} />
          <EuiPanel {...args} hasBorder={false} hasShadow onClick={() => {}} />
        </EuiFlexGroup>

        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiPanel {...args} color="transparent" onClick={undefined} />
          <EuiPanel {...args} color="highlighted" onClick={undefined} />
          <EuiPanel {...args} color="subdued" onClick={undefined} />
          <EuiPanel {...args} color="primary" onClick={undefined} />
          <EuiPanel {...args} color="success" onClick={undefined} />
          <EuiPanel {...args} color="warning" onClick={undefined} />
          <EuiPanel {...args} color="danger" onClick={undefined} />
        </EuiFlexGroup>

        <EuiPanel {...args} onClick={undefined}>
          <div>Content</div>
          <EuiPanel
            color="subdued"
            css={(euiThemeContext) => {
              const { euiTheme } = euiThemeContext;
              return css`
                margin-inline: -${euiTheme.size.base};
                margin-block-start: ${euiTheme.size.base};
                margin-block-end: -${euiTheme.size.base};
                border-start-start-radius: 0;
                border-start-end-radius: 0;

                ${highContrastModeStyles(euiThemeContext, {
                  preferred: `
                    border: none;
                    ${logicalCSS('border-top', `${euiTheme.border.thin}`)}
                  `,
                })}
              `;
            }}
          >
            Footer
          </EuiPanel>
        </EuiPanel>

        <EuiSplitPanel.Outer>
          <EuiSplitPanel.Inner>Top or left panel</EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner color="subdued">
            Bottom or right panel
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>

        <div
          css={css`
            padding: ${euiTheme.size.base};
            background-color: ${euiTheme.colors.backgroundBasePlain};
            border-radius: ${euiTheme.border.radius.panel};
            ${euiShadow(euiThemeContext)};
          `}
        >
          Custom panel
        </div>
      </EuiFlexGroup>
    );
  },
};

export const KitchensinkDark: Story = {
  ...Kitchensink,
  tags: ['vrt-only'],
  globals: { colorMode: 'DARK' },
};

export const KitchensinkHighContrast: Story = {
  ...Kitchensink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
