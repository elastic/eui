/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { EuiDataGrid, EuiDataGridColumn, EuiDataGridProps } from './index';
import { EuiLink } from '../link';
import { EuiButtonEmpty } from '../button';

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
      cy.mount(<EuiDataGrid {...baseProps} />);

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

  describe('height calculation', async () => {
    it('computes a new unconstrained height when switching to auto height', () => {
      const renderCellValue: EuiDataGridProps['renderCellValue'] = ({
        rowIndex,
        columnId,
      }) => (
        <>
          row {rowIndex}
          <br />
          column {columnId}
        </>
      );

      cy.mount(
        <EuiDataGrid {...baseProps} renderCellValue={renderCellValue} />
      );

      getGridData();
      cy.get('[data-test-subj=euiDataGridBody]')
        .invoke('outerHeight')
        .then((firstHeight) => {
          cy.get('[data-test-subj=dataGridDisplaySelectorPopover]').click();
          cy.get('[data-text="Auto fit"]').click();

          cy.get('[data-test-subj=euiDataGridBody]')
            .invoke('outerHeight')
            .should('be.greaterThan', firstHeight);
        });
    });

    it('accounts for a horizontal scrollbar', () => {
      const columns: EuiDataGridColumn[] = [];
      for (let i = 0; i < 100; i++) {
        columns.push({ id: `column ${i}` });
      }
      const columnVisibility = {
        visibleColumns: columns.map(({ id }) => id),
        setVisibleColumns: () => {},
      };
      cy.mount(
        <EuiDataGrid
          {...baseProps}
          columns={columns}
          columnVisibility={columnVisibility}
          renderFooterCellValue={undefined}
        />
      );

      getGridData();

      const virtualizedContainer = cy
        .get('[data-test-subj=euiDataGridBody]')
        .children()
        .first();

      // make sure the horizontal scrollbar is present
      virtualizedContainer.then(([outerContainer]: [HTMLDivElement]) => {
        expect(outerContainer.offsetHeight).to.be.greaterThan(
          outerContainer.clientHeight
        );
      });

      // make sure the vertical scrollbar is gone
      virtualizedContainer.then(([outerContainer]: [HTMLDivElement]) => {
        expect(outerContainer.offsetWidth).to.equal(outerContainer.clientWidth);
      });
    });
  });

  describe('focus management', () => {
    const columns: EuiDataGridColumn[] = [
      {
        id: 'no_interactive',
        display: '0 interactive',
        isExpandable: false,
        actions: false,
      },
      {
        id: 'no_interactive_expandable',
        display: '0 interactive',
        actions: false,
      },
      {
        id: 'one_interactive',
        display: '1 interactive',
        isExpandable: false,
        actions: false,
      },
      {
        id: 'one_interactive_expandable',
        display: '1 interactive',
        actions: false,
      },
      {
        id: 'two_interactives',
        display: '2 interactives',
        isExpandable: false,
        actions: false,
      },
      {
        id: 'two_interactives_expandable',
        display: '2 interactives',
        actions: false,
      },
    ];
    const columnVisibility = {
      visibleColumns: columns.map(({ id }) => id),
      setVisibleColumns: () => {},
    };

    const columnValueMap: { [key: string]: ReactNode } = {
      no_interactive: <span>value</span>,
      no_interactive_expandable: <span>value</span>,

      one_interactive: (
        <span>
          <EuiLink href="#" data-test-subj="focusOnMe">
            value
          </EuiLink>
        </span>
      ),
      one_interactive_expandable: (
        <span>
          <EuiLink href="#" data-test-subj="focusOnMe">
            value
          </EuiLink>
        </span>
      ),

      two_interactives: (
        <span>
          <EuiButtonEmpty size="xs" data-test-subj="btn-yes" onClick={() => {}}>
            Yes
          </EuiButtonEmpty>
          <EuiButtonEmpty
            size="xs"
            data-test-subj="btn-no"
            color="danger"
            onClick={() => {}}
          >
            No
          </EuiButtonEmpty>
        </span>
      ),
      two_interactives_expandable: (
        <span>
          <EuiButtonEmpty size="xs" data-test-subj="btn-yes" onClick={() => {}}>
            Yes
          </EuiButtonEmpty>
          <EuiButtonEmpty
            size="xs"
            data-test-subj="btn-no"
            color="danger"
            onClick={() => {}}
          >
            No
          </EuiButtonEmpty>
        </span>
      ),
    };

    const renderCellValue: EuiDataGridProps['renderCellValue'] = ({
      columnId,
    }) => columnValueMap[columnId];

    const renderFooterCellValue = undefined;

    const focusManagementBaseProps = {
      ...baseProps,
      columns,
      columnVisibility,
      renderCellValue,
      renderFooterCellValue,
    };

    it('focuses a cell when clicked', () => {
      cy.mount(<EuiDataGrid {...focusManagementBaseProps} />);

      getGridData();

      // starts with body in focus
      cy.focused().should('not.exist');

      cy.get('[data-gridcell-id="1,1"]').click();
      cy.focused().should('have.attr', 'data-gridcell-id', '1,1');
    });

    describe('cell keyboard interactions', () => {
      it('tabbing to the grid the controls, then the first cell, then off', () => {
        cy.mount(
          <>
            <EuiDataGrid {...focusManagementBaseProps} />
            <span tabIndex={0} id="final-tabbable" />
          </>
        );

        getGridData();

        // starts with body in focus
        cy.focused().should('not.exist');

        // tab through the control bar
        cy.get('body')
          .tab()
          .should('have.attr', 'data-test-subj', 'dataGridColumnSelectorButton')
          .tab()
          .should(
            'have.attr',
            'data-test-subj',
            'dataGridDisplaySelectorButton'
          )
          .tab()
          .should('have.attr', 'data-test-subj', 'dataGridFullScreenButton');

        // tab into the grid, should focus first cell after a short delay
        cy.focused().tab();
        cy.focused().should('have.attr', 'data-gridcell-id', '0,0');

        cy.focused().tab().should('have.id', 'final-tabbable');
      });

      it('arrow-keying focuses another cell, unless it has only one interactive element', () => {
        cy.mount(<EuiDataGrid {...focusManagementBaseProps} />);

        getGridData();

        cy.get('[data-test-subj=dataGridWrapper]').focus();

        // first cell is non-interactive and non-expandable = focus cell
        cy.focused().should('have.attr', 'data-gridcell-id', '0,0');

        // already left-most, should be no-op
        cy.focused().type('{leftarrow}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,0');

        // arrow right, expandable cell with no interactive = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,1');

        // arrow right, non-expandable cell with one interactive = focus interactive
        cy.focused().type('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'focusOnMe');

        // arrow right, non-expandable cell with two interactives = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,3');

        // arrow right, expandable cell with two interactives = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,4');
      });

      it('cell expansion/interaction', () => {
        cy.mount(<EuiDataGrid {...focusManagementBaseProps} />);

        getGridData();

        cy.get('[data-test-subj=dataGridWrapper]').focus();

        // first cell is non-interactive and non-expandable, enter should have no effect
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,0');

        // second cell is expandable
        cy.get('[data-gridcell-id="0,1"]').click();
        cy.focused().type('{enter}');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.focused().type('{esc}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,1');

        // third cell is non-expandable & interactive, click should focus on the link
        cy.get('[data-gridcell-id="0,2"]').click();
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-test-subj', 'focusOnMe');

        // fourth cell is non-expandable with multiple interactives, click should focus on the cell
        cy.get('[data-gridcell-id="0,3"]').click();
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-test-subj', 'focusOnMe'); // focus trap focuses the link
        cy.focused().type('{esc}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,3');

        // fifth cell is non-expandable & no-actions with multiple interactives, click should focus cell
        cy.get('[data-gridcell-id="0,4"]').click('topLeft'); // top left to avoid clicking a button
        cy.focused().should('have.attr', 'data-gridcell-id', '0,4');
        // enable interactives & focus trap
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes');
        cy.focused().tab();
        cy.focused().should('have.attr', 'data-test-subj', 'btn-no');
        cy.focused().tab();
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes');
        cy.focused().type('{esc}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,4');

        // sixth cell is expandable cell with two interactives, click should focus on the cell
        cy.get('[data-gridcell-id="0,5"]').click('topLeft', { force: true }); // top left to avoid clicking a button
        cy.focused().should('have.attr', 'data-gridcell-id', '0,5');
        cy.focused().type('{enter}'); // trigger expansion popover
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes'); // focus trap should move focus to the first button
        cy.focused().parentsUntil(
          '[data-test-subj="euiDataGridExpansionPopover"]'
        ); // ensure focus is in the popover
        cy.focused().tab();
        cy.focused().should('have.attr', 'data-test-subj', 'btn-no');
        cy.focused().tab();
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.focused().type('{esc}');
        cy.focused().should('have.attr', 'data-gridcell-id', '0,5');
      });
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
