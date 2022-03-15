import React from 'react';
import {
  EuiComment,
  EuiBadge,
  EuiText,
  EuiCode,
} from '../../../../src/components/';

const bodyUpdate = (
  <EuiText size="s">
    <p>
      Comments of type <EuiCode>update</EuiCode> can also have a body
    </p>
  </EuiText>
);

export default () => (
  <div>
    <EuiComment
      username="luisg"
      type="update"
      event={
        <>
          added tags <EuiBadge>case</EuiBadge> <EuiBadge>phising</EuiBadge>{' '}
          <EuiBadge>security</EuiBadge>
        </>
      }
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
      event={
        <>
          marked cases as <EuiBadge color="danger">Closed</EuiBadge>
        </>
      }
      timestamp="6 hours ago"
    >
      {bodyUpdate}
    </EuiComment>
  </div>
);
