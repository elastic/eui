import React, { useState } from 'react';
import { EuiComment } from '../../../../src/components/comment_list';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';
import { EuiPopover } from '../../../../src/components/popover';
import {
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components/context_menu';

const body = (
  <EuiText size="s">
    <p>Click the gear icon to see a small context menu.</p>
  </EuiText>
);

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);

  const togglePopover1 = () => {
    setIsPopoverOpen1(!isPopoverOpen1);
  };

  const closePopover1 = () => {
    setIsPopoverOpen1(false);
  };

  const togglePopover2 = () => {
    setIsPopoverOpen2(!isPopoverOpen2);
  };

  const closePopover2 = () => {
    setIsPopoverOpen2(false);
  };

  const customActions1 = (
    <EuiPopover
      button={
        <EuiButtonIcon
          aria-label="Actions"
          iconType="gear"
          size="s"
          color="text"
          onClick={togglePopover1}
        />
      }
      isOpen={isPopoverOpen1}
      closePopover={closePopover1}
      panelPaddingSize="none"
      anchorPosition="leftCenter">
      <EuiContextMenuPanel
        size="s"
        items={[
          <EuiContextMenuItem key="A" icon="pencil" onClick={closePopover1}>
            Edit
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="B" icon="share" onClick={closePopover1}>
            Share
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="C" icon="copy" onClick={closePopover1}>
            Copy
          </EuiContextMenuItem>,
        ]}
      />
    </EuiPopover>
  );

  const customActions2 = (
    <EuiPopover
      button={
        <EuiButtonIcon
          aria-label="Actions"
          iconType="gear"
          size="s"
          color="text"
          onClick={togglePopover2}
        />
      }
      isOpen={isPopoverOpen2}
      closePopover={closePopover2}
      panelPaddingSize="none"
      anchorPosition="leftCenter">
      <EuiContextMenuPanel
        size="s"
        items={[
          <EuiContextMenuItem key="A" icon="pencil" onClick={closePopover2}>
            Edit
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="B" icon="share" onClick={closePopover2}>
            Share
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="C" icon="copy" onClick={closePopover2}>
            Copy
          </EuiContextMenuItem>,
        ]}
      />
    </EuiPopover>
  );

  return (
    <div>
      <EuiComment
        username="janed"
        event="added a comment"
        actions={customActions1}
        timestamp="Jan 1, 2021">
        {body}
      </EuiComment>
      <EuiComment
        username="danib"
        event="requested changes"
        actions={customActions2}
        timestamp="Jan 2, 2021">
        {body}
      </EuiComment>
    </div>
  );
};
