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

import React, { useState, useCallback } from 'react';

import { EuiDataGrid, EuiDataGridProps } from '../';

describe('EuiDataGridBodyCustomRender', () => {
  const raw_data = [...Array(100)].map((_, index) => ({ A: index, B: index }));
  const columns = [{ id: 'A' }, { id: 'B' }];

  const CustomGridBody: EuiDataGridProps['renderCustomGridBody'] = ({
    visibleColumns,
    visibleRowData,
    Cell,
    headerRow,
    footerRow,
  }) => {
    const visibleRows = raw_data.slice(
      visibleRowData.startRow,
      visibleRowData.endRow
    );
    return (
      <>
        {headerRow}
        {visibleRows.map((row, rowIndex) => (
          <div role="row" key={rowIndex} style={{ display: 'flex' }}>
            {visibleColumns.map((column, colIndex) => (
              // @ts-ignore it's not clear why Typescript has an issue with Cell in Cypress but not Jest or our docs
              <Cell
                colIndex={colIndex}
                visibleRowIndex={rowIndex}
                key={`${rowIndex},${colIndex}`}
              />
            ))}
          </div>
        ))}
        {footerRow}
      </>
    );
  };

  const DataGridTest = (
    props: Partial<Omit<EuiDataGridProps, 'aria-labelledby'>>
  ) => {
    // Column visibility
    const [visibleColumns, setVisibleColumns] = useState(
      columns.map(({ id }) => id)
    );

    // Sorting
    const [sortingColumns, setSortingColumns] = useState([]);
    const onSort = useCallback((sortingColumns) => {
      setSortingColumns(sortingColumns);
    }, []);

    // Pagination
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    });
    const onChangePage = useCallback((pageIndex) => {
      setPagination((pagination) => ({ ...pagination, pageIndex }));
    }, []);
    const onChangePageSize = useCallback((pageSize) => {
      setPagination((pagination) => ({ ...pagination, pageSize }));
    }, []);

    return (
      <EuiDataGrid
        aria-label="Custom grid body renderer"
        rowCount={raw_data.length}
        columns={columns}
        renderCellValue={({ rowIndex, columnId }) =>
          `${columnId},${raw_data[rowIndex][columnId as 'A' | 'B']}`
        }
        renderCustomGridBody={CustomGridBody}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        sorting={{ columns: sortingColumns, onSort }}
        inMemory={{ level: 'sorting' }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 0],
          onChangePage: onChangePage,
          onChangeItemsPerPage: onChangePageSize,
        }}
        {...props}
      />
    );
  };

  it('inherits cell focus and popover behavior correctly', () => {
    cy.realMount(<DataGridTest />);
    cy.repeatRealPress('Tab', 6);
    cy.realPress('ArrowDown');
    cy.focused()
      .should('have.attr', 'data-gridcell-row-index', '0')
      .should('have.attr', 'data-gridcell-column-index', '0')
      .should('have.attr', 'tabindex', '0');
    cy.wait(500);
    cy.realPress('Enter');
    cy.focused().should('have.attr', 'data-popover-open', 'true');
    cy.realPress('Escape');
    cy.realPress('ArrowRight');
    cy.focused()
      .should('have.attr', 'data-gridcell-row-index', '0')
      .should('have.attr', 'data-gridcell-column-index', '1')
      .should('have.attr', 'tabindex', '0');
  });

  it('handles pagination correctly when consumers slice their data based on visibleRowData', () => {
    cy.realMount(<DataGridTest />);
    cy.get('[data-test-subj="pagination-button-last"]').click();
    cy.get('.euiPagination > [role="status"]').contains('Page 10 of 10');

    cy.get(
      '[data-gridcell-row-index="99"][data-gridcell-column-index="0"]'
    ).contains('A,99');
    cy.get(
      '[data-gridcell-row-index="99"][data-gridcell-column-index="1"]'
    ).contains('B,99');
  });

  it('handles re-ordering and hiding columns correctly', () => {
    cy.realMount(<DataGridTest />);
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).contains('A,0');
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="1"]'
    ).contains('B,0');

    cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').realHover();
    cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').click();
    cy.contains('Move right').click();

    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).contains('B,0');
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="1"]'
    ).contains('A,0');

    cy.get('[data-test-subj="dataGridHeaderCellActionButton-B"]').click();
    cy.contains('Hide column').should('be.visible').click();

    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).contains('A,0');
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="1"]'
    ).should('not.exist');
  });

  it('handles sorting columns correctly', () => {
    cy.realMount(<DataGridTest />);
    cy.get('[role="gridcell"]').first().contains('A,0');

    cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').realHover();
    cy.get('[data-test-subj="dataGridHeaderCellActionButton-A"]').click();
    cy.contains('Sort High-Low').click();

    cy.get('[role="gridcell"]').first().contains('A,99');
  });

  it('handles height/width constrained grids correctly', () => {
    cy.realMount(<DataGridTest height={300} width={300} />);

    // Increase page size
    cy.get('[data-test-subj="tablePaginationPopoverButton"]').click();
    cy.contains('Show all rows').click();

    // Check heights
    cy.get('.euiDataGrid').invoke('outerHeight').should('eq', 300);
    cy.get('.euiDataGrid').invoke('outerWidth').should('eq', 300);
    cy.get('.euiDataGrid__customRenderBody')
      .invoke('prop', 'scrollHeight')
      .should('be.gt', 300);

    // Virtualization isn't a thing, so check that the last row is present on the page
    cy.get('[role="gridcell"]').last().contains('B,99');
  });

  it('handles auto height rows correctly', () => {
    cy.realMount(
      <DataGridTest
        renderCellValue={({ columnId }) =>
          columnId === 'A'
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            : 'Nunc eleifend velit enim, eget placerat lorem dignissim sed. Donec laoreet tincidunt convallis. Ut eget ornare tellus.'
        }
      />
    );
    cy.get('[role="gridcell"]').first().invoke('outerHeight').should('eq', 36);

    cy.get('[data-test-subj="dataGridDisplaySelectorButton"]').click();
    cy.contains('Auto').click();

    cy.get('[role="gridcell"]')
      .first()
      .invoke('outerHeight')
      .should('be.gt', 36);

    // TODO: a screenshot/visual diff test would be useful here
  });

  it('renders header and footer rows correctly', () => {
    cy.realMount(
      <DataGridTest renderFooterCellValue={({ columnId }) => columnId} />
    );
    cy.get('.euiDataGridHeader').contains('A');
    cy.get('.euiDataGridHeader').contains('B');
    cy.get('.euiDataGridFooter').contains('A');
    cy.get('.euiDataGridFooter').contains('B');
  });

  it('renders control columns correctly', () => {
    cy.realMount(
      <DataGridTest
        leadingControlColumns={[
          {
            id: 'leading',
            width: 20,
            rowCellRender: () => '_',
            headerCellRender: () => null,
          },
        ]}
        trailingControlColumns={[
          {
            id: 'trailing',
            width: 20,
            rowCellRender: () => '*',
            headerCellRender: () => null,
          },
        ]}
      />
    );

    cy.get('[role="gridcell"][data-gridcell-column-id="leading"]')
      .first()
      .contains('_');
    cy.get('[role="gridcell"][data-gridcell-column-id="trailing"]')
      .last()
      .contains('*');
  });
});
