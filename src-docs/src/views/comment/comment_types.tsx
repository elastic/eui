import React from 'react';
import {
  EuiPanel,
  EuiText,
  EuiCode,
  EuiCommentList,
  EuiComment,
} from '../../../../src/components/';

const body = (
  <EuiText size="s">
    <p>
      This is the body of a comment of type <EuiCode>regular</EuiCode>
    </p>
  </EuiText>
);

export default () => (
  <EuiCommentList aria-label="Comment types example">
    <EuiComment
      timelineAvatarName="andred"
      username="andred"
      event="added a comment"
      timestamp="yesterday"
    >
      {body}
    </EuiComment>
    <EuiComment
      timelineAvatarName="milal"
      username="milal"
      event={
        <>
          edited a comment of type <EuiCode>update</EuiCode>
        </>
      }
      timestamp="6 hours ago"
    />
    <EuiComment timelineAvatarName="hugo">
      <EuiPanel hasBorder>
        <p>
          I am a comment of type <EuiCode>custom</EuiCode>.
        </p>
      </EuiPanel>
    </EuiComment>
  </EuiCommentList>
);
