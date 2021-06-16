import React from 'react';
import {
  EuiCommentList,
  EuiCommentProps,
} from '../../../../src/components/comment_list';
import { EuiAvatar } from '../../../../src/components/avatar';
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
    color="subdued"
    iconType="copy"
  />
);

const complexEvent = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <EuiFlexItem grow={false}>added tags</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="primary">sample</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="success">review</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const complexUsername = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <EuiFlexItem grow={false}>
      <EuiAvatar size="s" type="space" name="Pedro" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>pedror</EuiFlexItem>
  </EuiFlexGroup>
);

const longBody = (
  <EuiText size="s">
    <p>
      This planet has - or rather had - a problem, which was this: most of the
      people living on it were unhappy for pretty much of the time. Many
      solutions were suggested for this problem, but most of these were largely
      concerned with the movements of small green pieces of paper, which is odd
      because on the whole it was not the small green pieces of paper that were
      unhappy.
    </p>
  </EuiText>
);

const avatar = (
  <EuiAvatar
    imageUrl="https://source.unsplash.com/64x64/?woman"
    size="l"
    name="Juana"
  />
);

const comments: EuiCommentProps[] = [
  {
    username: 'janed',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    username: 'juanab',
    type: 'update',
    actions: copyAction,
    event: 'pushed incident X0Z235',
    timestamp: 'on Jan 3, 2020',
    timelineIcon: avatar,
  },
  {
    username: 'pancho1',
    type: 'update',
    event: 'edited case',
    timestamp: 'on Jan 9, 2020',
  },
  {
    username: complexUsername,
    type: 'update',
    actions: copyAction,
    event: complexEvent,
    timestamp: 'on Jan 11, 2020',
    timelineIcon: 'tag',
  },
  {
    username: 'elohar',
    event: 'added a comment',
    timestamp: 'on Jan 14, 2020',
    timelineIcon: <EuiAvatar size="l" name="Eloha" />,
    children: longBody,
    actions: copyAction,
  },
];

export default () => <EuiCommentList comments={comments} />;
