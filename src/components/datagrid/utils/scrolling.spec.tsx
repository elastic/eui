/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React, { createRef } from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../';
import { EuiDataGridRefProps } from '../data_grid_types';

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
  describe('cell focus', () => {
    it('fully scrolls cells into view (accounting for sticky headers, rows, and scrollbars)', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.repeatRealPress('Tab', 4);
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

    it('handles setFocusedCell being called manually on cells out of view', () => {
      const ref = createRef<EuiDataGridRefProps>();
      cy.mount(<EuiDataGrid {...baseProps} ref={ref} />);

      // Wait for the grid to finish rendering and pass back the ref
      cy.get('[data-test-subj="euiDataGridBody"]').then(() => {
        ref.current.setFocusedCell({ rowIndex: 14, colIndex: 5 });
        cy.focused()
          .should('have.attr', 'data-gridcell-visible-row-index', '14')
          .should('have.attr', 'data-gridcell-column-index', '5');
      });
    });
  });

  describe('cell popover', () => {
    it('handles openCellPopover being called manually on cells out of view', () => {
      const ref = createRef<EuiDataGridRefProps>();
      cy.mount(<EuiDataGrid {...baseProps} ref={ref} />);

      // Wait for the grid to finish rendering and pass back the ref
      cy.get('[data-test-subj="euiDataGridBody"]').then(() => {
        ref.current.openCellPopover({ rowIndex: 14, colIndex: 5 });
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
      });
    });
  });
});
