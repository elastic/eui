/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiDataGrid, EuiDataGridProps } from './index';

const DataGrid = () => {
  const baseProps: EuiDataGridProps = {
    'aria-label': 'grid for testing',
    columns: [
      { id: 'a', display: 'First' },
      { id: 'b', display: 'Second' },
      { id: 'c', display: 'Third' },
      { id: 'd', display: 'Fourth' },
      { id: 'e', display: 'Fifth' },
    ],
    columnVisibility: {
      visibleColumns: ['a', 'b', 'c', 'd', 'e'],
      setVisibleColumns: () => {},
    },
    rowCount: 10,
    renderCellValue: ({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`,
    renderFooterCellValue: ({ columnId }) => `${columnId}, footer`,
  };

  return <EuiDataGrid {...baseProps} />;
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.mount(<DataGrid />);
});

describe('EuiDataGrid', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when the keyboard shortcut menu is open', () => {
      cy.get(
        'button[data-test-subj="dataGridKeyboardShortcutsButton"]'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when the grid display menu is open', () => {
      cy.get(
        'button[data-test-subj="dataGridDisplaySelectorButton"]'
      ).realClick();
      cy.checkAxe();
    });

    it('has zero violations when the column actions menu is open', () => {
      cy.get('button.euiDataGridHeaderCell__button').first().realClick();
      cy.checkAxe();
    });
  });
});
