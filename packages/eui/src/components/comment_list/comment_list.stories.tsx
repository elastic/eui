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
import { EuiTextArea } from '../form';
import { EuiAvatar } from '../avatar';
import { EuiButtonIcon } from '../button';
import { EuiBadge } from '../badge';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

import { EuiCommentList, EuiCommentListProps } from './comment_list';

const meta: Meta<EuiCommentListProps> = {
  title: 'Display/EuiComment/EuiCommentList',
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

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    comments: [
      {
        username: 'emma',
        timelineAvatar: <EuiAvatar name="emma" />,
        event: 'added a comment',
        timestamp: 'on 3rd March 2022',
        children: 'Phishing emails have been on the rise since February',
        actions: copyAction,
      },
      {
        username: 'emma',
        timelineAvatar: <EuiAvatar name="emma" />,
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
              <EuiBadge>phishing</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge>security</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        ),
        timestamp: 'on 3rd March 2022',
        eventIcon: 'tag',
        eventIconAriaLabel: 'tag',
      },
      {
        username: 'system',
        timelineAvatar: 'dot',
        timelineAvatarAriaLabel: 'System',
        event: 'pushed a new incident',
        timestamp: 'on 4th March 2022',
        eventColor: 'danger',
      },
      {
        username: 'tiago',
        timelineAvatar: <EuiAvatar name="tiago" />,
        event: 'added a comment',
        timestamp: 'on 4th March 2022',
        actions: copyAction,
        children: 'Take a look at this Office.exe',
      },
      {
        username: 'emma',
        timelineAvatar: <EuiAvatar name="emma" />,
        event: (
          <>
            marked case as <EuiBadge color="warning">In progress</EuiBadge>
          </>
        ),
        timestamp: 'on 4th March 2022',
      },
      {
        username: 'you',
        timelineAvatar: (
          <EuiAvatar name="Cat" imageUrl="https://picsum.photos/id/40/64" />
        ),
        children: (
          <EuiTextArea
            fullWidth
            value={`Thanks Tiago for taking a look.

I also found something suspicious: Update.exe`}
            onChange={() => {}}
          />
        ),
      },
    ],
  },
};
