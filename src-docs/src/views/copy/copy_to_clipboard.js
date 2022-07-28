import React, { useRef, useState } from 'react';

import { copyToClipboard, formatDate } from '../../../../src/services';
import {
  EuiComment,
  EuiCommentList,
  EuiText,
  EuiButtonIcon,
  EuiToolTip,
} from '../../../../src/components';

export default () => {
  const buttonRef = useRef();
  const [isTextCopied, setTextCopied] = useState(false);

  const text =
    'You must be imaginative, strong-hearted. You must try things that may not work, and you must not let anyone define your limits because of where you come from. Your only limit is your soul. What I say is true—anyone can cook… but only the fearless can be great.';

  const onClick = () => {
    buttonRef.current.focus(); // sets focus for safari
    copyToClipboard(text);
    setTextCopied(true);
  };

  // we want to make sure that after clicking on the comment copy button the tooltip is reset to the initial msg "copy text"
  // after clicking on the button, users can copy to clipboard other texts on a page
  // so showing in the tooltip that the text from the comment is copied to clipboard could be misleading
  const onBlur = () => {
    setTextCopied(false);
  };

  const date = formatDate(Date.now(), 'dobLong');

  return (
    <EuiCommentList aria-label="Copy to clipboard example">
      <EuiComment
        username="Gusteau"
        timelineAvatarAriaLabel="Gusteau"
        event="added a comment"
        actions={
          <EuiToolTip
            content={isTextCopied ? 'Text copied to clipboard' : 'Copy text'}
          >
            <EuiButtonIcon
              buttonRef={buttonRef}
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
    </EuiCommentList>
  );
};
