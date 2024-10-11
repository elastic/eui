/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import figma from '@figma/code-connect';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';

import { EuiPanel, EuiPanelProps } from './panel';

type Story = StoryObj<EuiPanelProps>;

export const Playground: Story = {
  args: {
    children: 'Panel content',
  },
  render: ({ children, ...props }: EuiPanelProps) => (
    <EuiPanel {...props}>{children}</EuiPanel>
  ),
};

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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=32642-391756&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        borderRadius: figma.boolean('Border radius', {
          true: 'm',
          false: 'none',
        }),
        color: figma.enum('Color', {
          'Plain*': undefined,
          Subdued: 'subdued',
          Primary: 'primary',
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
          Accent: 'accent',
          Transparent: 'transparent',
        }),
        children: figma.instance('Content'),
        hasBorder: figma.boolean('Border'),
        paddingSize: figma.enum('Padding size', {
          None: 'none',
          Small: 's',
          'Medium*': undefined,
          Large: 'l',
        }),
      },
    },
  },
};
enableFunctionToggleControls(meta, ['onClick']);
disableStorybookControls(meta, ['panelRef']);

export default meta;
