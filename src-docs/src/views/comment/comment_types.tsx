import React from 'react';
import { EuiComment } from '../../../../src/components/comment';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';
import { EuiCode } from '../../../../src/components/code';

const body = (
  <EuiText size="s">
    <p>
      This is the body of a comment of type <EuiCode>regular</EuiCode>
    </p>
  </EuiText>
);

const bodyUpdate = (
  <EuiText size="s">
    <p>
      Comments of type <EuiCode>update</EuiCode> can also have a body
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

export default () => (
  <div>
    <EuiComment
      username="andred"
      event="added a comment"
      actions={copyAction}
      timestamp="Jan 1, 2020">
      {body}
    </EuiComment>
    <EuiComment
      username="luisg"
      type="update"
      event="edited case"
      timestamp="Jan 3, 2020"
    />
    <EuiComment
      username="milal"
      type="update"
      event="edited case"
      timestamp="Jan 4, 2020">
      {bodyUpdate}
    </EuiComment>
  </div>
);
