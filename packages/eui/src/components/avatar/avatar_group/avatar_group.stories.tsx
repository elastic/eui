/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiSpacer } from '../../spacer';
import { EuiAvatar } from '../avatar';
import { EuiAvatarGroup, EuiAvatarGroupProps } from './avatar_group';

const meta: Meta<EuiAvatarGroupProps> = {
  title: 'Display/EuiAvatar/EuiAvatarGroup',
  component: EuiAvatarGroup,
  args: {
    legend: 'Team members',
    size: 'm',
    type: 'user',
    disableExpand: false,
  },
};

export default meta;
type Story = StoryObj<EuiAvatarGroupProps>;

const overflowingAvatars = (
  <>
    <EuiAvatar name="Raphael" />
    <EuiAvatar name="Donatello" imageUrl="https://picsum.photos/id/40/64" />
    <EuiAvatar name="Leonardo" />
    <EuiAvatar name="Michelangelo" />
    <EuiAvatar name="April O'Neil" />
  </>
);

export const Playground: Story = {
  args: {
    children: overflowingAvatars,
  },
  render: (args) => (
    <>
      <EuiAvatarGroup {...args} />
      <EuiSpacer />
      <EuiAvatarGroup {...args} size="s" legend={`${args.legend} (s)`} />
    </>
  ),
};

export const TwoAvatars: Story = {
  args: {
    legend: 'Pair',
    children: (
      <>
        <EuiAvatar name="Raphael" />
        <EuiAvatar name="Donatello" imageUrl="https://picsum.photos/id/40/64" />
      </>
    ),
  },
};

export const DisableExpand: Story = {
  args: {
    children: overflowingAvatars,
    disableExpand: true,
  },
};
