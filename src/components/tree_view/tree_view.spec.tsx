/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiTreeView, EuiTreeViewProps } from './tree_view';

const TreeView = () => {
  const items = [
    {
      label: 'Item One',
      id: 'item_one',
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
        },
        {
          label: 'Item B',
          id: 'item_b',
          children: [
            {
              label: 'A Cloud',
              id: 'item_cloud',
            },
            {
              label: "I'm a Bug",
              id: 'item_bug',
              className: 'classForBug',
            },
          ],
        },
        {
          label: 'Item C',
          id: 'item_c',
          children: [
            {
              label: 'Another Cloud',
              id: 'item_cloud2',
            },
            {
              label: 'Another Bug',
              id: 'item_bug2',
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

  const defaultTreeViewProps: EuiTreeViewProps = {
    items: items,
    'aria-label': 'Sample folder tree',
  };

  return (
    <div style={{ width: '20rem' }}>
      <EuiTreeView {...defaultTreeViewProps} />
    </div>
  );
};

describe('EuiTreeView', () => {
  describe('Keyboard functionality', () => {
    it('Expands and collapses children correctly', () => {
      cy.realMount(<TreeView />);
      cy.get('div.euiTreeView__wrapper').should('exist');
      cy.repeatRealPress('Tab', 3);
      cy.focused().contains('Item B');
      cy.realPress('Enter');
      cy.get('li.euiTreeView__node').contains('A Cloud').should('exist');
      cy.realPress('Enter');
      cy.get('li.euiTreeView__node').contains('A Cloud').should('not.exist');
      cy.realPress('Tab');
      cy.focused().contains('Item C');
      cy.realPress('Enter');
      cy.get('li.euiTreeView__node').contains('Another Cloud').should('exist');
    });
  });
});
