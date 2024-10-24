/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';

import { EuiButton, Props as EuiButtonProps } from './button';

type Story = StoryObj<EuiButtonProps>;

export const Playground: Story = {
  args: {
    children: 'Button',
  },
  render: ({ children, ...args }: EuiButtonProps) => (
    <EuiButton {...args}>{children}</EuiButton>
  ),
};
disableStorybookControls(Playground, ['buttonRef']);

const meta: Meta<EuiButtonProps> = {
  title: 'Navigation/EuiButton',
  component: EuiButton,
  argTypes: {
    iconType: { control: 'text' },
    // TODO: the `minWidth` prop takes many different types (bool, string, number)
    // - we should consider adding our own custom control
  },
  args: {
    // Component defaults
    element: 'button',
    type: 'button',
    color: 'primary',
    size: 'm',
    fill: false,
    iconSize: 'm',
    iconSide: 'left',
    fullWidth: false,
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=31735-391399&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        children: figma.boolean('Icon only', {
          true: undefined,
          false: figma.textContent('Text'),
        }),
        color: figma.enum('Color', {
          'Primary*': undefined,
          Neutral: 'text',
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
          Accent: 'accent',
        }),
        fill: figma.enum('Style', {
          'Default*': undefined,
          Filled: true,
        }),
        isDisabled: figma.boolean('Disabled'),
        isLoading: figma.boolean('Loading'),
        iconType: figma.boolean('Icon only', {
          true: figma.instance('⮑ Icon'),
          false: figma.boolean('Icon left', {
            true: figma.instance('⮑ Icon left'),
            false: figma.boolean('Icon right', {
              true: figma.instance('⮑ Icon right'),
              false: undefined,
            }),
          }),
        }),
        iconSide: figma.boolean('Icon left', {
          true: 'left',
          false: figma.boolean('Icon right', {
            true: 'right',
            false: figma.boolean('Loading', {
              true: figma.boolean('Left spinner', {
                true: 'left',
                false: figma.boolean('Right spinner', {
                  true: 'right',
                  false: undefined,
                }),
              }),
              false: undefined,
            }),
          }),
        }),
        size: figma.enum('Size', {
          'Medium*': undefined,
          Small: 's',
          // Discrepancy between Figma and EUI
          // 'Extra Small': 'extra-small',
        }),
      },
    },
  },
};
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
