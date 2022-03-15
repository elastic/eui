import React, { Fragment } from 'react';
import {
  EuiComment,
  EuiText,
  EuiAvatar,
  EuiCode,
} from '../../../../src/components/';

const defaultBody = (
  <EuiText size="s">
    <p>
      This comment is using the default <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

const customIconBody = (
  <EuiText size="s">
    <p>
      This comment has a custom <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

export default () => (
  <Fragment>
    <EuiComment
      username="janed"
      event="added a comment"
      timestamp="12 hours ago"
      timelineIcon={<EuiAvatar initials="janed" name="Juana" />}
    >
      {defaultBody}
    </EuiComment>
    <EuiComment
      username="system"
      type="update"
      event={
        <>
          passed the string <EuiCode>{'"dot"'}</EuiCode> to the{' '}
          <EuiCode>timelineIcon</EuiCode> prop
        </>
      }
      timestamp="10 hours ago"
      timelineIcon="dot"
    />
    <EuiComment
      username="juanab"
      event="added a comment"
      timestamp="7 hours ago"
      timelineIcon={
        <EuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          name="Juana"
        />
      }
    >
      {customIconBody}
    </EuiComment>
  </Fragment>
);
