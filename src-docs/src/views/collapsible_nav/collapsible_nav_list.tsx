import React from 'react';

import {
  EuiCollapsibleNavList,
  EuiCollapsibleNavListItemProps,
} from '../../../../src/components/collapsible_nav';

const someListItems: EuiCollapsibleNavListItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Pinnned button with onClick',
    pinned: true,
    onClick: e => {
      console.log('Pinnned button clicked', e);
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
    },
  },
];

export default () => (
  <>
    <EuiCollapsibleNavList
      listItems={someListItems}
      onPinClick={item => {
        console.warn('Clicked: ', item);
      }}
      maxWidth="none"
    />
  </>
);
