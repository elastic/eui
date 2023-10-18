import React from 'react';
import {
  EuiCommentList,
  EuiCommentProps,
} from '../../../../src/components/comment_list';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

const complexEvent = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs" wrap>
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
);

const comments: EuiCommentProps[] = [
  {
    username: 'janed',
    timelineAvatarAriaLabel: 'Jane Doe',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
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
    event: complexEvent,
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
];

export default () => (
  <EuiCommentList comments={comments} aria-label="Comment list example" />
);
