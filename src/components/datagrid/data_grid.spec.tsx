/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from '@cypress/react';
import { EuiDataGrid, EuiDataGridProps } from './index';

const baseProps: EuiDataGridProps = {
  'aria-label': 'grid for testing',
  columns: [
    { id: 'a', display: 'First' },
    { id: 'b', display: 'Second' },
  ],
  columnVisibility: {
    visibleColumns: ['a', 'b'],
    setVisibleColumns: () => {},
  },
  rowCount: 3,
  renderCellValue: ({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`,
  renderFooterCellValue: ({ columnId }) => `${columnId}, footer`,
};

describe('EuiDataGrid', () => {
  describe('row creation', () => {
    it('creates rows', () => {
      mount(<EuiDataGrid {...baseProps} />);

      getGridData().then((data) => {
        expect(data).to.deep.equal({
          headers: ['First', 'Second'],
          data: [
            { First: 'a, 0', Second: 'b, 0' },
            { First: 'a, 1', Second: 'b, 1' },
            { First: 'a, 2', Second: 'b, 2' },
          ],
          footer: { First: 'a, footer', Second: 'b, footer' },
        });
      });

      // find all cells and verify they all belong to a row or columnheader
      cy.get('[role=gridcell]')
        .filter((idx, element) => {
          const role = element.parentElement?.getAttribute('role');
          return role === 'row' || role === 'columnheader' ? false : true;
        })
        .should('have.lengthOf', 0);
    });
  });
});

function getGridData() {
  // wait for the virtualized cells to render
  cy.get('[data-gridcell-id="1,0"]');
  const rows = cy.get('[role=row]');
  return rows.then((rows) => {
    const headers: string[] = [];
    const data = [];

    // process header
    const headerRow = rows[0];
    const headerCells = headerRow.querySelectorAll('[role=columnheader]');
    for (let i = 0; i < headerCells.length; i++) {
      const headerCell = headerCells[i];
      headers.push(headerCell.textContent ?? '');
    }

    // process data rows
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      if (row.getAttribute('data-test-subj')?.includes('dataGridFooterRow')) {
        // we don't want to load the footer data yet
        continue;
      }

      const cellData: { [key: string]: string } = {};

      const cells = row.querySelectorAll(
        '[role=gridcell] [data-datagrid-cellcontent]'
      );
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cellData[headers[j]] = cell.textContent ?? '';
      }

      data.push(cellData);
    }

    // find any footer data
    const footerRow = rows[rows.length - 1];
    const hasFooterRow = footerRow
      .getAttribute('data-test-subj')
      ?.includes('dataGridFooterRow');
    const footerData: { [key: string]: string } | null = hasFooterRow
      ? {}
      : null;
    if (hasFooterRow === true) {
      const footerCells = footerRow.querySelectorAll(
        '[role=gridcell] [data-datagrid-cellcontent]'
      );
      for (let i = 0; i < footerCells.length; i++) {
        const footerCell = footerCells[i];
        footerData![headers[i]] = footerCell.textContent ?? '';
      }
    }

    return { headers, data, footer: footerData };
  });
}
