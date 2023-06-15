/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiButtonEmpty, EuiButtonEmptyProps } from './button_empty';

const meta: Meta<EuiButtonEmptyProps> = {
  title: 'EuiButtonEmpty',
  component: EuiButtonEmpty as any,
  argTypes: {
    flush: {
      options: [undefined, 'left', 'right', 'both'],
      control: 'select',
    },
    iconType: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<EuiButtonEmptyProps>;

export const Playground: Story = {
  args: {
    children: 'Tertiary action',
    color: 'primary',
    size: 'm',
    iconSize: 'm',
    iconSide: 'left',
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};
