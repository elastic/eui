/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../.storybook/utils';

import { EuiButton, Props as EuiButtonProps } from './button';

const meta: Meta<EuiButtonProps> = {
  title: 'EuiButton',
  component: EuiButton,
  argTypes: {
    iconType: { control: 'text' },
    // TODO: the `minWidth` prop takes many different types (bool, string, number)
    // - we should consider adding our own custom control
  },
  args: {
    // Component defaults
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
};

export default meta;
type Story = StoryObj<EuiButtonProps>;

export const Playground: Story = {
  argTypes: disableStorybookControls(['buttonRef']),
  args: {
    children: 'Button',
  },
};
