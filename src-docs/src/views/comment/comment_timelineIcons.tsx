import React, { Fragment } from 'react';
import { EuiComment } from '../../../../src/components/comment';
import { EuiText } from '../../../../src/components/text';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiCode } from '../../../../src/components/code';
import { EuiSpacer } from '../../../../src/components/spacer';

const defaultBody = (
  <EuiText size="s">
    <p>
      These two comments are using the default <EuiCode>timelineIcon</EuiCode>s.
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
    <div>
      <EuiComment
        username="janed"
        event="added a comment"
        timestamp="Jan 1, 2020">
        {defaultBody}
      </EuiComment>
      <EuiComment
        username="pancho1"
        type="update"
        event="edited case"
        timestamp="Jan 3, 2020"
      />
    </div>
    <EuiSpacer />
    <div>
      <EuiComment
        username="janed"
        event="added a comment"
        timestamp="Jan 1, 2020"
        timelineIcon="tag">
        {iconStringBody}
      </EuiComment>
    </div>
    <EuiSpacer />
    <div>
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
        }>
        {customIconBody}
      </EuiComment>
    </div>
  </Fragment>
);
