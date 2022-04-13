/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React, { useState, useEffect } from 'react';
import { EuiDataGrid } from '../';

describe('EuiDataGridFooterRow', () => {
  const mockData = [10, 15, 20];

  const RenderCellValue = ({ rowIndex, columnId }) =>
    columnId === 'b' ? mockData[rowIndex] : null;

  const RenderFooterCellValue = ({ columnId, setCellProps }) => {
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
    cy.mount(<GridTest />);

    cy.get(
      '[data-gridcell-column-index="0"][data-gridcell-row-index="3"]'
    ).click('topLeft');
    cy.get('[data-test-subj="euiDataGridCellExpandButton"]').should(
      'not.exist'
    );
  });

  // Regression test for #5720
  it('does not bug focus when moving a column and then clicking its footer cell', () => {
    cy.mount(<GridTest />);

    cy.get(
      '[data-gridcell-column-index="1"][data-gridcell-row-index="-1"]'
    ).click();

    cy.get('[data-test-subj="dataGridHeaderCellActionGroup-b"]')
      .contains('Move left')
      .click()
      .wait(50);

    // Note that the wait/timeout and multiple focused assertions are required for
    // for this specific bug which bounces focus rapidly between cells, as otherwise
    // Cypress re-tries until it happens to be on the cell with correct attributes
    const checkFocusedCell = () => {
      cy.get('[data-gridcell-column-index="0"][data-gridcell-row-index="3"]')
        .click()
        .wait(50)
        .contains('45')
        .focused()
        .should('have.attr', 'data-gridcell-column-index', '0')
        .should('not.have.attr', 'data-gridcell-column-index', '1');
    };

    checkFocusedCell();
    checkFocusedCell();
    checkFocusedCell();
  });
});
