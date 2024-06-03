import React, { useState } from 'react';

import {
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';

const someListItems: EuiPinnableListGroupItemProps[] = [
  {
    id: '1',
    label: 'Label with iconType',
    iconType: 'home',
    pinned: false,
  },
  {
    id: '2',
    label: 'Pinned button with onClick',
    pinned: true,
    onClick: () => {},
  },
  {
    label: 'Link with href and custom pin titles',
    href: '/#',
    pinned: false,
    color: 'primary',
  },
  {
    id: '3',
    label: 'Active link',
    isActive: true,
    href: '/#',
    pinned: false,
  },
  {
    id: '4',
    label: 'Custom extra actions will override pinning ability',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    id: '5',
    label: 'Item with pinnability turned off',
    pinnable: false,
  },
];

export default () => {
  const [itemList, setItemList] =
    useState<EuiPinnableListGroupItemProps[]>(someListItems);

  return (
    <>
      <EuiPinnableListGroup
        listItems={itemList}
        onPinClick={(selectedItem) => {
          if (selectedItem.hasOwnProperty('pinned')) {
            const newItemList = itemList.map((item) => {
              if (item.id === selectedItem.id) {
                return {
                  ...item,
                  pinned: !item.pinned,
                };
              } else {
                return item;
              }
            });

            setItemList(newItemList);
          }
        }}
        maxWidth="none"
        pinTitle={(item: EuiPinnableListGroupItemProps) => `Pin ${item.label}`}
        unpinTitle={(item: EuiPinnableListGroupItemProps) =>
          `Unpin ${item.label}`
        }
      />
    </>
  );
};
