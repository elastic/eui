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
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
    },
  },
  {
    label: 'Button with onClick',
    pinned: true,
    onClick: e => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '#',
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
];

export default () => (
  <EuiCollapsibleNavList
    listItems={someListItems}
    onPinClick={item => {
      console.warn('Clicked: ', item);
    }}
  />
);
