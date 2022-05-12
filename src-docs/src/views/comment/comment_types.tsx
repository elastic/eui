import React from 'react';
import { EuiComment } from '../../../../src/components/comment_list';
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

export default () => (
  <div>
    <EuiComment username="andred" event="added a comment" timestamp="yesterday">
      {body}
    </EuiComment>
    <EuiComment
      username="luisg"
      type="update"
      event="edited case"
      timestamp="22 hours ago"
    />
    <EuiComment
      username="milal"
      type="update"
      event="edited case"
      timestamp="6 hours ago"
    >
      {bodyUpdate}
    </EuiComment>
  </div>
);
