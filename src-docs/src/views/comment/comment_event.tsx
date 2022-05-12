import React from 'react';
import {
  EuiPanel,
  EuiCommentList,
  EuiComment,
  EuiBadge,
  EuiText,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const body = (
  <EuiText size="s">
    <p>
      This is the body of a comment of type <EuiCode>regular</EuiCode>
    </p>
  </EuiText>
);

const eventWihtMultipleTags = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s" wrap>
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

const eventWithOneTag = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs" wrap>
    <EuiFlexItem grow={false}>marked cases as</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="danger">Closed</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

export default () => (
  <EuiCommentList aria-label="Comment types example">
    <EuiComment username="andred" event="added a comment" timestamp="yesterday">
      {body}
    </EuiComment>
    <EuiComment
      username="luisg"
      event={eventWihtMultipleTags}
      timestamp="22 hours ago"
      eventIcon="tag"
      eventIconAriaLabel="tag"
    />
    <EuiComment
      username="milal"
      event={eventWithOneTag}
      eventMessage={
        <EuiText size="s">
          <p>Comments can also have an event message</p>
        </EuiText>
      }
      timestamp="6 hours ago"
    />
    <EuiComment
      avatarIcon="dot"
      username="system"
      event="pushed a new incident"
      timestamp="20 hours ago"
      headerColor="danger"
    />
    <EuiComment avatarName="hugo">
      <EuiPanel hasBorder>
        <p>
          I am a comment of type <EuiCode>custom</EuiCode>.
        </p>
      </EuiPanel>
    </EuiComment>
  </EuiCommentList>
);
