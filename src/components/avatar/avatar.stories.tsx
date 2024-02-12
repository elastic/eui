/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiAvatar, EuiAvatarProps } from './avatar';

const meta: Meta<EuiAvatarProps> = {
  title: 'EuiAvatar',
  component: EuiAvatar,
  argTypes: {
    initialsLength: {
      options: [undefined, 1, 2],
    },
    color: { control: 'text' },
    iconType: { control: 'text' },
    iconColor: { control: 'text' },
  },
  args: {
    // Component defaults
    casing: 'uppercase',
    size: 'm',
    type: 'user',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<EuiAvatarProps>;

export const Playground: Story = {
  args: {
    name: 'Hello World',
  },
};
