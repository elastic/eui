import React from 'react';

import { EuiIcon, EuiTreeView, EuiToken } from '../../../../src/components';

export const TreeView = () => {
  const showAlert = () => {
    alert('You squashed a bug!');
  };

  const items = [
    {
      label: 'Item One',
      id: 'item_one',
      icon: <EuiIcon type="folderClosed" />,
      iconWhenExpanded: <EuiIcon type="folderOpen" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <EuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <EuiIcon type="arrowRight" />,
          iconWhenExpanded: <EuiIcon type="arrowDown" />,
          children: [
            {
              label: 'A Cloud',
              id: 'item_cloud',
              icon: <EuiToken iconType="tokenConstant" />,
            },
            {
              label: "I'm a Bug",
              id: 'item_bug',
              icon: <EuiToken iconType="tokenEnum" />,
              callback: showAlert,
            },
          ],
        },
        {
          label: 'Item C',
          id: 'item_c',
          icon: <EuiIcon type="arrowRight" />,
          iconWhenExpanded: <EuiIcon type="arrowDown" />,
          children: [
            {
              label: 'Another Cloud',
              id: 'item_cloud2',
              icon: <EuiToken iconType="tokenConstant" />,
            },
            {
              label:
                'This one is a really long string that we will check truncates correctly',
              id: 'item_bug2',
              icon: <EuiToken iconType="tokenEnum" />,
              callback: showAlert,
            },
          ],
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    },
  ];

  return (
    <div style={{ width: '20rem' }}>
      <EuiTreeView items={items} aria-label="Sample Folder Tree" />
    </div>
  );
};
