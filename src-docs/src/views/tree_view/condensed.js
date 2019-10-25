import React from 'react';

import { EuiTreeView, EuiToken } from '../../../../src/components';

export class TreeViewCondensed extends React.Component {
  showAlert = () => {
    alert('You squashed a bug!');
  };

  render() {
    const items = [
      {
        label: 'transporter',
        id: 'transporter',
        icon: <EuiToken size="xs" iconType="tokenObject" />,
        children: [
          {
            label: 'service',
            id: 'service',
            icon: <EuiToken size="xs" iconType="tokenString" />,
          },
          {
            label: 'auth',
            id: 'auth',
            icon: <EuiToken size="xs" iconType="tokenObject" />,
            children: [
              {
                label: 'user',
                id: 'user',
                icon: <EuiToken size="xs" iconType="tokenVariable" />,
              },
              {
                label: 'pass',
                id: 'pass',
                icon: <EuiToken size="xs" iconType="tokenVariable" />,
              },
            ],
          },
        ],
      },
      {
        label: 'getContact',
        id: 'getContact',
        icon: <EuiToken size="xs" iconType="tokenFunction" />,
        children: [
          {
            label: 'render',
            id: 'render',
            icon: <EuiToken size="xs" iconType="tokenFunction" />,
            children: [
              {
                label: 'title',
                id: 'title',
                icon: <EuiToken size="xs" iconType="tokenString" />,
              },
            ],
          },
        ],
      },
      {
        label: 'postContact',
        id: 'postContact',
        icon: <EuiToken size="xs" iconType="tokenFunction" />,
        children: [
          {
            label: 'errors',
            id: 'errors',
            icon: <EuiToken size="xs" iconType="tokenConstant" />,
          },
          {
            label: 'mailOptions',
            id: 'mailOptions',
            icon: <EuiToken size="xs" iconType="tokenObject" />,
          },
        ],
      },
      {
        label: 'smokeMonster',
        id: 'smokeMonster',
        icon: <EuiToken size="xs" iconType="tokenMethod" />,
      },
    ];

    return (
      <div style={{ width: '20rem' }}>
        <EuiTreeView
          items={items}
          isCondensed
          expandByDefault
          showExpansionArrows
          aria-label="Document Outline"
        />
      </div>
    );
  }
}
