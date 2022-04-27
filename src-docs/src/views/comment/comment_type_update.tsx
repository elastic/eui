import React from 'react';
import {
  EuiCommentList,
  EuiComment,
  EuiBadge,
  EuiText,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

const bodyUpdate = (
  <EuiText size="s">
    <p>
      Comments of type <EuiCode>update</EuiCode> can also have a body
    </p>
  </EuiText>
);

const eventWihtMultipleTags = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <EuiFlexItem grow={false}>added tags</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="accent">case</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="primary">phising</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="success">security</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const eventWithOneTag = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs">
    <EuiFlexItem grow={false}>marked cases as</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="danger">Closed</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

export default () => (
  <EuiCommentList aria-label="Comment type update example">
    <EuiComment
      username="luisg"
      type="update"
      event={eventWihtMultipleTags}
      timestamp="22 hours ago"
      updateIcon="tag"
    />
    <EuiComment
      username="system"
      type="update"
      timelineIcon="dot"
      event="pushed a new incident"
      timestamp="20 hours ago"
      updateColor="danger"
    />
    <EuiComment
      username="milal"
      type="update"
      event={eventWithOneTag}
      timestamp="6 hours ago"
    >
      {bodyUpdate}
    </EuiComment>
  </EuiCommentList>
);
