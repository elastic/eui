import React from 'react';

import { EuiListGroup } from '../../../../src/components';

const myContent = [
  {
    label: 'First link',
    href: '#/display/list-group',
    iconType: 'calendar',
    size: 's',
    color: 'primary',
  },
  {
    label: 'This is an active link with very long label that truncates',
    href: '#/display/list-group',
    isActive: true,
    iconType: 'clock',
    color: 'primary',
  },
  {
    label: 'Third link is disabled',
    href: '#/display/list-group',
    isDisabled: true,
    iconType: 'compute',
    color: 'primary',
  },
  {
    label: 'Fourth link',
    href: '#/display/list-group',
    iconType: 'copyClipboard',
    size: 's',
    color: 'primary',
  },
  {
    label: 'Fifth link',
    href: '#/display/list-group',
    iconType: 'crosshairs',
    size: 's',
    color: 'primary',
  },
];

export default () => {
  return <EuiListGroup listItems={myContent} />;
};
