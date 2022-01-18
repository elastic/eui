/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../';

const baseProps: EuiDataGridProps = {
  'aria-label': 'useScroll test',
  height: 300,
  width: 300,
  columns: [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' },
    { id: 'F' },
  ],
  rowCount: 15,
  renderCellValue: ({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`,
  renderFooterCellValue: ({ columnId }) => `${columnId}, footer`,
  columnVisibility: {
    visibleColumns: ['A', 'B', 'C', 'D', 'E', 'F'],
    setVisibleColumns: () => {},
  },
};

describe('useScroll', () => {
  describe('on cell focus', () => {
    it('fully scrolls cells into view (accounting for sticky headers, rows, and scrollbars)', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.repeatRealPress('Tab', 3);
      cy.realPress('ArrowDown');

      cy.realPress('End');
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '5')
        .should('have.attr', 'data-gridcell-visible-row-index', '0');

      cy.realPress(['Control', 'End']);
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '5')
        .should('have.attr', 'data-gridcell-visible-row-index', '14');

      cy.realPress('Home');
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '0')
        .should('have.attr', 'data-gridcell-visible-row-index', '14');

      cy.realPress(['Control', 'Home']);
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '0')
        .should('have.attr', 'data-gridcell-visible-row-index', '0');
    });
  });
});
