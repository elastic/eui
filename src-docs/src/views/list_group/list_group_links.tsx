import React from 'react';

import { EuiListGroup } from '../../../../src/components';

const myContent = [
  {
    label: 'First link',
    href: '#/display/list-group',
    iconType: 'calendar',
  },
  {
    label: 'This is an active link with very long label that truncates',
    href: '#/display/list-group',
    isActive: true,
    iconType: 'clock',
  },
  {
    label: 'Third link is disabled',
    href: '#/display/list-group',
    isDisabled: true,
    iconType: 'compute',
  },
  {
    label: 'Fourth link',
    href: '#/display/list-group',
    iconType: 'copyClipboard',
  },
  {
    label: 'Fifth link will open in new tab',
    href: 'http://www.elastic.co',
    iconType: 'crosshairs',
    target: '_blank'
  },
];

export default () => {
  return <EuiListGroup listItems={myContent} color="primary" size="s" />;
};
