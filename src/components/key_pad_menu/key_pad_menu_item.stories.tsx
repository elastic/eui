/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiIcon } from '../icon';

import { EuiKeyPadMenuItem, EuiKeyPadMenuItemProps } from './key_pad_menu_item';

const meta: Meta<EuiKeyPadMenuItemProps> = {
  title: 'EuiKeyPadMenuItem',
  component: EuiKeyPadMenuItem as any,
  argTypes: {
    checkable: { options: [undefined, 'multi', 'single'] },
  },
  args: {
    label: 'Hello world', // String makes prop easier to change/toggle
    // Component defaults
    isDisabled: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiKeyPadMenuItemProps>;

export const Playground: Story = {
  args: {
    children: <EuiIcon type="faceHappy" size="l" />,
  },
};
