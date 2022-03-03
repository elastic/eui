import React, { useState } from 'react';

import { copyToClipboard, formatDate } from '../../../../src/services';
import {
  EuiComment,
  EuiText,
  EuiButtonIcon,
  EuiToolTip,
} from '../../../../src/components';

export default () => {
  const [isTextCopied, setTextCopied] = useState(false);

  const text =
    'You must be imaginative, strong-hearted. You must try things that may not work, and you must not let anyone define your limits because of where you come from. Your only limit is your soul. What I say is true—anyone can cook… but only the fearless can be great.';

  const onClick = () => {
    copyToClipboard(text);
    setTextCopied(true);
  };

  // we want to make sure that after clicking on the comment copy button the tooltip is reset to the initial msg "Copy text"
  // after that, users can copy to clipboard other texts on a page
  // so showing in the tooltip that the text from the comment is copied to clipboard could be misleading
  const onBlur = () => {
    setTextCopied(false);
  };

  const date = formatDate(Date.now(), 'dobLong');

  return (
    <div>
      <EuiComment
        username="Gusteau"
        event="added a comment"
        actions={
          <EuiToolTip
            content={isTextCopied ? 'Text copied to clipboard' : 'Copy text'}
          >
            <EuiButtonIcon
              aria-label="Copy text to clipboard"
              color="text"
              iconType="copy"
              onClick={onClick}
              onBlur={onBlur}
            />
          </EuiToolTip>
        }
        timestamp={`on ${date}`}
      >
        <EuiText size="s">
          <p>{text}</p>
        </EuiText>
      </EuiComment>
    </div>
  );
};
