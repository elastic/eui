import React, { useState } from 'react';

import {
  EuiButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
  EuiCopy,
  useGeneratedHtmlId,
} from '@elastic/eui';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const smallContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'smallContextMenuPopover',
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const items = [
    <EuiCopy textToCopy="Copied some text!" anchorClassName="eui-fullWidth">
      {(copy) => (
        <EuiContextMenuItem key="copy" icon="copy" onClick={copy} size="s">
          Copy
        </EuiContextMenuItem>
      )}
    </EuiCopy>,
    <EuiContextMenuItem key="edit" icon="pencil" onClick={closePopover}>
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="share" icon="share" onClick={closePopover}>
      Share
    </EuiContextMenuItem>,
  ];

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click to show a single panel
    </EuiButton>
  );

  return (
    <EuiPopover
      id={smallContextMenuPopoverId}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel size="s" items={items} />
    </EuiPopover>
  );
};
