/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiButtonIcon, EuiButtonIconProps } from './button_icon';

const meta: Meta<EuiButtonIconProps> = {
  title: 'Navigation/EuiButtonIcon',
  component: EuiButtonIcon,
  args: {
    // Component defaults
    color: 'primary',
    display: 'empty',
    size: 'xs',
    iconSize: 'm',
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiButtonIconProps>;

export const Playground: Story = {
  args: {
    iconType: 'faceHappy',
  },
};
