/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { icon } from '../../icon/assets/face_happy'; // TODO: Remove this once icons can be loaded by strings
import { EuiButtonIcon, EuiButtonIconProps } from './button_icon';

const meta: Meta<EuiButtonIconProps> = {
  title: 'EuiButtonIcon',
  component: EuiButtonIcon,
  argTypes: {
    iconType: {
      // TODO: Storybook can't load icons dynamically
      // Disable user `iconType` input/controls for now
      control: 'function',
    },
  },
};

export default meta;
type Story = StoryObj<EuiButtonIconProps>;

export const Playground: Story = {
  args: {
    iconType: icon, // TODO: Storybook can't load icons dynamically
    color: 'primary',
    display: 'empty',
    size: 'xs',
    iconSize: 'm',
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};
