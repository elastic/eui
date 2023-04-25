/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../../cypress/support" />

import React, { useState, useEffect } from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../../';

describe('EuiDataGridFooterRow', () => {
  const mockData = [10, 15, 20];

  const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
    rowIndex,
    columnId,
  }) => (columnId === 'b' ? mockData[rowIndex] : null);

  const RenderFooterCellValue: EuiDataGridProps['renderFooterCellValue'] = ({
    columnId,
    setCellProps,
  }) => {
    const value = columnId === 'b' ? mockData.reduce((a, b) => a + b, 0) : null;

    useEffect(() => {
      if (!value) setCellProps({ isExpandable: false });
    }, [value, setCellProps]);

    return value;
  };

  // We need to set up a test component here for column ordering to work
  const GridTest = () => {
    const [visibleColumns, setVisibleColumns] = useState(['a', 'b']);

    return (
      <EuiDataGrid
        aria-label="Footer row tests"
        columns={[{ id: 'a' }, { id: 'b', display: 'Total' }]}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={3}
        renderCellValue={RenderCellValue}
        renderFooterCellValue={RenderFooterCellValue}
      />
    );
  };
  GridTest.displayName = 'GridTest';

  it('renders a footer of total values', () => {
    cy.mount(<GridTest />);

    cy.get(
      '[data-gridcell-column-index="1"][data-gridcell-row-index="3"]'
    ).contains('45');
  });

  it('does not render an expansion button for the empty footer cell', () => {
    cy.realMount(<GridTest />);

    cy.get(
      '[data-gridcell-column-index="0"][data-gridcell-row-index="3"]'
    ).realClick();
    cy.get('[data-test-subj="euiDataGridCellExpandButton"]').should(
      'not.exist'
    );
  });

  // Regression test for #5720
  // Unfortunately, this test flakes with both false negatives and positives. Because the buggy effect is that
  // focus bounces rapidly between the moved column and its new position, it's extremely difficult to assert
  // on correctly with Cypress's default wait/retry behavior, hence the skip. However, it's also relatively easy
  // to see this bug in action in production/reality, and should be regression-tested that way if necessary.
  it.skip('does not bug focus when moving a column and then clicking its footer cell', () => {
    cy.realMount(<GridTest />);

    cy.get(
      '[data-gridcell-column-index="1"][data-gridcell-row-index="-1"]'
    ).click();
    cy.contains('Move left').click();

    cy.get(
      '[data-gridcell-column-index="0"][data-gridcell-row-index="3"]'
    ).realClick();

    // Note that the wait/timeout and multiple focused assertions are required for
    // for this specific bug which bounces focus rapidly between cells, as otherwise
    // Cypress re-tries until it happens to be on the cell with correct attributes
    cy.wait(50);
    const checkFocusedCell = () => {
      cy.wait(1);
      cy.focused({ timeout: 0 })
        .should('have.attr', 'data-gridcell-column-index', '0')
        .should('not.have.attr', 'data-gridcell-column-index', '1');
    };
    checkFocusedCell();
    checkFocusedCell();
    checkFocusedCell();
  });
});
