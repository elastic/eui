/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPanel } from '../../panel';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import { EuiTitle } from '../../title';
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
      <EuiSpacer size="xl" />
      <EuiTitle size="xs">
        <h3>Bordered panel</h3>
      </EuiTitle>
      <EuiText>
        <p>
          A bordered panel with an avatar group where the `disableExpand` prop
          is set to `true`. That way we avoid the avatar group from expanding to
          the width of the panel, and cause some layout issues and bad
          experience.
        </p>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiFlexGroup responsive={false} gutterSize="none">
        <EuiFlexItem grow={false}>
          <EuiPanel hasBorder paddingSize="s" hasShadow={false} grow={false}>
            <EuiAvatarGroup {...args} disableExpand legend="Assignees" />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiTitle size="xs">
        <h3>Page header</h3>
      </EuiTitle>
      <EuiText>
        <p>
          A page header where the avatar group is used to display assignees, and
          the `disableExpand` prop is set to `false` due to floating space in
          the header.
        </p>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiFlexGroup alignItems="center" gutterSize="m" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiTitle size="s">
            <h2>Investigation</h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiAvatarGroup {...args} disableExpand={false} legend="Assignees" />
        </EuiFlexItem>
      </EuiFlexGroup>
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
