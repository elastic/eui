import React from 'react';
import {
  EuiCommentList,
  EuiComment,
  EuiCode,
  EuiText,
  EuiAvatar,
} from '../../../../src/components';

export default () => (
  <EuiCommentList aria-label="An example with different timeline icons">
    <EuiComment username="andred" event="is using a default avatar">
      <EuiText size="s">
        <p>
          The avatar initials is generated from the <EuiCode>username</EuiCode>{' '}
          prop.
        </p>
      </EuiText>
    </EuiComment>

    <EuiComment
      username="system"
      timelineIcon="dot"
      event={
        <>
          The <EuiCode>timelineIcon</EuiCode> is using a <EuiCode>dot</EuiCode>{' '}
          icon.
        </>
      }
    />

    <EuiComment
      username="cat"
      event="is using a custom avatar"
      timelineIcon={
        <EuiAvatar
          name="cat"
          imageUrl="https://source.unsplash.com/64x64/?cat"
        />
      }
    >
      <EuiText size="s">
        <p>
          The <EuiCode>timelineIcon</EuiCode> is using a custom{' '}
          <strong>EuiAvatar</strong>.
        </p>
      </EuiText>
    </EuiComment>
  </EuiCommentList>
);
