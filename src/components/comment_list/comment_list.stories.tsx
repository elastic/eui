/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiText } from '../text';
import { EuiButtonIcon } from '../button';
import { EuiBadge } from '../badge';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

import { EuiCommentList, EuiCommentListProps } from './comment_list';

const meta: Meta<EuiCommentListProps> = {
  title: 'EuiCommentList',
  component: EuiCommentList,
  args: {
    // Component defaults
    gutterSize: 'l',
  },
};

export default meta;
type Story = StoryObj<EuiCommentListProps>;

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

export const Playground: Story = {
  args: {
    comments: [
      {
        username: 'janed',
        timelineAvatarAriaLabel: 'Jane Doe',
        event: 'added a comment',
        timestamp: 'on Jan 1, 2020',
        children: (
          <EuiText size="s">
            <p>
              Far out in the uncharted backwaters of the unfashionable end of
              the western spiral arm of the Galaxy lies a small unregarded
              yellow sun.
            </p>
          </EuiText>
        ),
        actions: copyAction,
      },
      {
        username: 'juanab',
        timelineAvatarAriaLabel: 'Juana Barros',
        actions: copyAction,
        event: 'pushed incident X0Z235',
        timestamp: 'on Jan 3, 2020',
      },
      {
        username: 'pancho1',
        timelineAvatarAriaLabel: 'Pancho Pérez',
        event: 'edited case',
        timestamp: 'on Jan 9, 2020',
        eventIcon: 'pencil',
        eventIconAriaLabel: 'edit',
      },
      {
        username: 'pedror',
        timelineAvatarAriaLabel: 'Pedro Rodriguez',
        actions: copyAction,
        event: (
          <EuiFlexGroup
            responsive={false}
            alignItems="center"
            gutterSize="xs"
            wrap
          >
            <EuiFlexItem grow={false}>added tags</EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>case</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>phising</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>security</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
        timestamp: 'on Jan 11, 2020',
        eventIcon: 'tag',
        eventIconAriaLabel: 'tag',
      },
      {
        username: 'Assistant',
        timelineAvatarAriaLabel: 'Assistant',
        timestamp: 'on Jan 14, 2020, 1:39:04 PM',
        children: <p>An error ocurred sending your message.</p>,
        actions: copyAction,
        eventColor: 'danger',
      },
    ],
  },
};
