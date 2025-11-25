/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../../.storybook/utils';

import { EuiButtonEmpty, EuiButtonEmptyProps } from './button_empty';

const meta: Meta<EuiButtonEmptyProps> = {
  title: 'Navigation/EuiButtonEmpty',
  component: EuiButtonEmpty,
  argTypes: {
    flush: {
      options: [undefined, 'left', 'right', 'both'],
    },
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
  args: {
    // Component defaults
    type: 'button',
    color: 'primary',
    size: 'm',
    iconSize: 'm',
    iconSide: 'left',
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiButtonEmptyProps>;

export const Playground: Story = {
  args: {
    children: 'Tertiary action',
  },
};
disableStorybookControls(Playground, ['buttonRef']);
