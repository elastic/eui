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

import { EuiBadge, EuiBadgeProps, COLORS } from './badge';

type Story = StoryObj<EuiBadgeProps>;

export const Playground: Story = {
  args: {
    children: 'Badge text',
  },
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  render: ({ children, ...args }: EuiBadgeProps) => (
    <EuiBadge {...args}>{children}</EuiBadge>
  ),
};

export const CustomColors: Story = {
  parameters: {
    controls: {
      include: ['color', 'children', 'isDisabled'],
    },
  },
  args: {
    children: 'Badge text',
    color: '#0000FF',
  },
};

const meta: Meta<EuiBadgeProps> = {
  title: 'Display/EuiBadge/EuiBadge',
  component: EuiBadge,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    // Component defaults
    iconSide: 'left',
    isDisabled: false,
    color: 'default',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=31918-390303&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        children: figma.boolean('Icon only', {
          true: undefined,
          false: figma.string('Text'),
        }),
        color: figma.enum('Color', {
          Default: undefined,
          Hollow: 'hollow',
          Primary: 'primary',
          Accent: 'accent',
          Success: 'success',
          Danger: 'danger',
          Warning: 'warning',
        }),
        isDisabled: figma.boolean('Disabled'),
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
            false: undefined,
          }),
        }),
      },
    },
  },
};

export default meta;
