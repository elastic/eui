import React from 'react';
import { EuiComment } from '../../../../src/components/comment_list';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
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
      username="janed"
      event="added a comment"
      actions={copyAction}
      timestamp="on Jan 1, 2020"
    >
      {body}
    </EuiComment>
  </div>
);
