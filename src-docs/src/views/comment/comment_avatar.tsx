import React from 'react';
import {
  EuiCommentList,
  EuiComment,
  EuiCode,
  EuiText,
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
      username="andred"
      avatarName="Andre Dias"
      event="is using a custom avatar name"
    >
      <EuiText size="s">
        <p>
          The avatar initials is generated from the{' '}
          <EuiCode>avatarName</EuiCode> prop.
        </p>
      </EuiText>
    </EuiComment>
    <EuiComment
      avatarIcon="dot"
      username="system"
      event={
        <>
          is using a <EuiCode>dot</EuiCode> icon.
        </>
      }
    />
    <EuiComment
      username="cat"
      event="is using a custom avatar"
      avatarProps={{
        imageUrl: 'https://source.unsplash.com/64x64/?cat',
      }}
    >
      <EuiText size="s">
        <p>
          The avatar is using an image that is being passed into to{' '}
          <EuiCode>avatarProps.imageUrl</EuiCode> prop.
        </p>
      </EuiText>
    </EuiComment>
  </EuiCommentList>
);
