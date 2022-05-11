import React from 'react';
import {
  EuiCommentList,
  EuiComment,
  EuiText,
  EuiCode,
} from '../../../../src/components/';

const defaultBody = (
  <EuiText size="s">
    <p>
      This comment is using the default <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

const customupdateMessage = (
  <EuiText size="s">
    <p>
      This comment has a custom <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

export default () => (
  <EuiCommentList aria-label="An example with different timeline icons">
    <EuiComment
      timelineAvatarName="janed"
      username="janed"
      event="added a comment"
      timestamp="12 hours ago"
    >
      {defaultBody}
    </EuiComment>
    <EuiComment
      timelineAvatarName="janed"
      timelineAvatarIconType="dot"
      username="system"
      type="update"
      event={
        <>
          passed the string <EuiCode>{'"dot"'}</EuiCode> to the{' '}
          <EuiCode>timelineIcon</EuiCode> prop
        </>
      }
      timestamp="10 hours ago"
    />
    <EuiComment
      timelineAvatarName="juanab"
      username="juanab"
      event="added a comment"
      timestamp="7 hours ago"
    >
      {customupdateMessage}
    </EuiComment>
  </EuiCommentList>
);
