import React, { useState } from 'react';

import {
  EuiButtonIcon,
  EuiPopover,
  EuiContextMenu,
  EuiPopoverTitle,
} from '../../../../src/components';

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach((item) => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const panelTree = {
    id: 0,
    items: [
      {
        name: 'Enable all',
        icon: 'eye',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Disable all',
        icon: 'eyeClosed',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Pin all',
        icon: 'pin',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Unpin all',
        icon: 'pin',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Invert inclusion',
        icon: 'invert',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Invert visibility',
        icon: 'eye',
        onClick: () => {
          closePopover();
        },
      },
      {
        name: 'Remove all',
        icon: 'trash',
        onClick: () => {
          closePopover();
        },
      },
    ],
  };

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <EuiButtonIcon
          onClick={togglePopover}
          color="text"
          iconType="filter"
          aria-label="Change all filters"
          title="Change all filters"
        />
      }
      anchorPosition="downCenter"
      panelPaddingSize="none"
    >
      <EuiPopoverTitle paddingSize="s">Change all filters</EuiPopoverTitle>
      <EuiContextMenu initialPanelId={0} panels={flattenPanelTree(panelTree)} />
    </EuiPopover>
  );
};
