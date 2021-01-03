import React, { useState } from 'react';

import {
  EuiButton,
  EuiContextMenu,
  EuiIcon,
  EuiPopover,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panels = [
    {
      id: 0,
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Go to a link',
          icon: 'user',
          href: 'http://elastic.co',
          target: '_blank',
        },
        {
          name: 'Nest panels',
          icon: 'user',
          panel: 1,
        },
        {
          name: 'You can add a tooltip',
          icon: 'user',
          toolTipTitle: 'Optional tooltip',
          toolTipContent: 'Optional content for a tooltip',
          toolTipPosition: 'right',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Disabled option',
          icon: 'user',
          toolTipContent: 'For reasons, this item is disabled',
          toolTipPosition: 'right',
          disabled: true,
          onClick: () => {
            closePopover();
          },
        },
      ],
    },
    {
      id: 1,
      initialFocusedItemIndex: 1,
      title: 'Nest panels',
      items: [
        {
          name: 'PDF reports',
          icon: 'user',
          onClick: () => {
            closePopover();
          },
        },
        {
          name: 'Permalinks',
          icon: 'user',
          onClick: () => {
            closePopover();
          },
        },
      ],
    },
  ];

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Small context menu
    </EuiButton>
  );

  return (
    <EuiPopover
      id="contextMenuExample"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <EuiContextMenu size="s" initialPanelId={0} panels={panels} />
    </EuiPopover>
  );
};
