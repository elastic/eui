/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiBadge, EuiBadgeProps, COLORS } from './badge';

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
};

export default meta;
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
