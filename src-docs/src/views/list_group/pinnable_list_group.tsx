import React from 'react';

import {
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';

const someListItems: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Pinned button with onClick',
    pinned: true,
    onClick: e => {
      console.log('Pinned button clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '/#',
  },
  {
    label: 'Active link',
    isActive: true,
    href: '/#',
  },
  {
    label: 'Custom extra actions will override pinning ability',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
];

export default () => (
  <>
    <EuiPinnableListGroup
      listItems={someListItems}
      onPinClick={item => {
        console.warn('Clicked: ', item);
      }}
      maxWidth="none"
    />
  </>
);
