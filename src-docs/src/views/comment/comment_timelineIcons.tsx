import React, { Fragment } from 'react';
import { EuiComment } from '../../../../src/components/comment_list';
import { EuiText } from '../../../../src/components/text';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiCode } from '../../../../src/components/code';

const defaultBody = (
  <EuiText size="s">
    <p>
      This comment and the one below are using the default{' '}
      <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

const iconStringBody = (
  <EuiText size="s">
    <p>
      This comment passed the string &ldquo;tag&rdquo; to the{' '}
      <EuiCode>timelineIcon</EuiCode> prop.
    </p>
  </EuiText>
);

const customIconBody = (
  <EuiText size="s">
    <p>
      This comment has a custom element as its <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

export default () => (
  <Fragment>
    <EuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020"
    >
      {defaultBody}
    </EuiComment>
    <EuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timestamp="Jan 3, 2020"
    />
    <EuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020"
      timelineIcon="tag"
    >
      {iconStringBody}
    </EuiComment>
    <EuiComment
      username="juanab"
      event="added a comment"
      timestamp="Jan 3, 2020"
      timelineIcon={
        <EuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          size="l"
          name="Juana"
        />
      }
    >
      {customIconBody}
    </EuiComment>
  </Fragment>
);
