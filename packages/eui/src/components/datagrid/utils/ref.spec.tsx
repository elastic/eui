/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../cypress/support" />

import React, { useState, createRef, forwardRef } from 'react';
import { EuiDataGrid } from '../';
import type {
  EuiDataGridRefProps,
  EuiDataGridSorting,
} from '../data_grid_types';

// We need to set up a test component here for sorting/pagination state to work
// The underlying imperative ref should still be forwarded and work as normal
const GridTest = forwardRef<EuiDataGridRefProps, any>((_, ref) => {
  // Pagination
  const [pageIndex, onChangePage] = useState(0);

  // Sorting
  const [sortingColumns, onSort] = useState<EuiDataGridSorting['columns']>([]);

  return (
    <EuiDataGrid
      aria-label="useImperativeGridRef test"
      ref={ref}
      data-test-subj="euiDataGrid"
      height={400}
      columns={[
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
        { id: 'F' },
      ]}
      columnVisibility={{
        visibleColumns: ['A', 'B', 'C', 'D', 'E', 'F'],
        setVisibleColumns: () => {},
      }}
      rowCount={100}
      renderCellValue={({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`}
      pagination={{
        pageIndex,
        pageSize: 25,
        onChangePage,
        onChangeItemsPerPage: () => {},
      }}
      sorting={{ columns: sortingColumns, onSort }}
      inMemory={{ level: 'sorting' }}
    />
  );
});
GridTest.displayName = 'GridTest';

describe('useImperativeGridRef', () => {
  const ref = createRef<EuiDataGridRefProps>();

  beforeEach(() => {
    cy.mount(<GridTest ref={ref} />);
    cy.get('[data-test-subj="euiDataGridBody"]'); // Wait for the grid to finish rendering and pass back the ref
  });

  describe('setIsFullScreen', () => {
    it('allows the consumer to manually toggle fullscreen mode', () => {
      ref.current!.setIsFullScreen(true);
      cy.get('[data-test-subj="euiDataGrid"]').should(
        'have.class',
        'euiDataGrid--fullScreen'
      );
      // Has to be a separate .then() block from the above for some Cypress-y reason
      cy.then(() => {
        ref.current!.setIsFullScreen(false);
        cy.get('[data-test-subj="euiDataGrid"]').should(
          'not.have.class',
          'euiDataGrid--fullScreen'
        );
      });
    });
  });

  describe('setFocusedCell', () => {
    it('allows the consumer to manually focus into a specific grid cell', () => {
      ref.current!.setFocusedCell({ rowIndex: 1, colIndex: 1 });
      cy.focused()
        .should('have.attr', 'data-gridcell-visible-row-index', '1')
        .should('have.attr', 'data-gridcell-column-index', '1');
    });

    it('should scroll to cells that are not in view', () => {
      ref.current!.setFocusedCell({ rowIndex: 24, colIndex: 5 });
      cy.focused()
        .should('have.attr', 'data-gridcell-visible-row-index', '24')
        .should('have.attr', 'data-gridcell-column-index', '5');
    });

    it('should paginate to cells that are not on the current page', () => {
      ref.current!.setFocusedCell({ rowIndex: 50, colIndex: 0 });
      cy.get('.euiPagination [class*="euiScreenReaderOnly"]').should(
        'have.text',
        'Page 3 of 4'
      );
      cy.focused()
        .should('have.attr', 'data-gridcell-visible-row-index', '0')
        .should('have.attr', 'data-gridcell-column-index', '0');
    });

    it('should correctly find the specified rowIndex when sorted', () => {
      cy.get('[data-test-subj="dataGridHeaderCell-A"]').click();
      cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').click();
      cy.contains('Sort High-Low').click();
      cy.then(() => {
        ref.current!.setFocusedCell({ rowIndex: 95, colIndex: 0 });
        cy.focused()
          .should('have.attr', 'data-gridcell-visible-row-index', '4')
          .should('have.attr', 'data-gridcell-column-index', '0');
      });
    });

    it('should throw an error if the passed cell indices are invalid', () => {
      cy.on('fail', (err) => {
        expect(err.message).to.equal(
          'Row 150 is not a valid row. The maximum visible row index is 99.'
        );
      });
      ref.current!.setFocusedCell({ rowIndex: 150, colIndex: 0 });
    });
  });

  describe('openCellPopover', () => {
    it("allows the consumer to manually open a specific grid cell's popover", () => {
      ref.current!.openCellPopover({ rowIndex: 2, colIndex: 2 });
      cy.focused()
        .should('have.attr', 'data-test-subj', 'euiDataGridExpansionPopover')
        .find('.euiText')
        .should('have.text', 'C, 2');
    });

    it('should scroll to cells that are not in view', () => {
      ref.current!.openCellPopover({ rowIndex: 23, colIndex: 0 });
      cy.focused()
        .should('have.attr', 'data-test-subj', 'euiDataGridExpansionPopover')
        .find('.euiText')
        .should('have.text', 'A, 23');
    });

    it('should paginate to cells that are not on the current page', () => {
      ref.current!.openCellPopover({ rowIndex: 99, colIndex: 5 });
      cy.get('.euiPagination [class*="euiScreenReaderOnly"]').should(
        'have.text',
        'Page 4 of 4'
      );
      cy.focused()
        .should('have.attr', 'data-test-subj', 'euiDataGridExpansionPopover')
        .find('.euiText')
        .should('have.text', 'F, 99');
    });

    it('should correctly find the specified rowIndex when sorted', () => {
      cy.get('[data-test-subj="dataGridHeaderCell-A"]').click();
      cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').click();
      cy.contains('Sort High-Low').click();
      cy.then(() => {
        ref.current!.openCellPopover({ rowIndex: 98, colIndex: 1 });
        cy.focused()
          .should('have.attr', 'data-test-subj', 'euiDataGridExpansionPopover')
          .find('.euiText')
          .should('have.text', 'B, 98');
      });
    });

    it('should throw an error if the passed cell indices are invalid', () => {
      cy.on('fail', (err) => {
        expect(err.message).to.equal(
          'Column 10 is not a valid column. The maximum visible column index is 5.'
        );
      });
      ref.current!.openCellPopover({ rowIndex: 0, colIndex: 10 });
    });
  });

  describe('closeCellPopover', () => {
    it('allows the consumer to manually close any open popovers', () => {
      cy.get('[data-gridcell-row-index="0"]').should('exist');
      ref.current!.setFocusedCell({ colIndex: 0, rowIndex: 0 });
      cy.realPress('Enter');
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
        'have.length',
        1
      );
      cy.then(() => {
        ref.current!.closeCellPopover();
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
          'have.length',
          0
        );
      });
    });
  });

  describe('scrollTo', () => {
    it('scrolls the grid to a specified position', () => {
      cy.get('.euiDataGrid__virtualized').should('have.prop', 'scrollTop', 0);
      cy.then(() => {
        ref.current!.scrollTo?.({ scrollTop: 500, scrollLeft: 0 });
      });
      cy.get('.euiDataGrid__virtualized').should('have.prop', 'scrollTop', 500);
    });
  });

  describe('scrollToItem', () => {
    it('scrolls to a specific cell position, rendering the cell', () => {
      cy.get('[data-gridcell-row-index="0"]').should('exist');
      cy.get('[data-gridcell-row-index="15"]').should('not.exist');
      cy.then(() => {
        ref.current!.scrollToItem?.({ rowIndex: 15, columnIndex: 5 });
      });
      cy.get('[data-gridcell-row-index="15"]').should('exist');
    });
  });
});
