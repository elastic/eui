/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, { ReactNode } from 'react';
import {
  EuiDataGrid,
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridProps,
} from './index';
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

      cy.get('[data-test-subj=euiDataGridBody]')
        .invoke('outerHeight')
        .then((firstHeight) => {
          cy.get('[data-test-subj=dataGridDisplaySelectorPopover]').click();
          cy.get('[data-text="Auto"]').click();

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

      const virtualizedContainer = cy
        .get('[data-test-subj=euiDataGridBody]')
        .find('.euiDataGrid__virtualized');

      // make sure the horizontal scrollbar is present
      virtualizedContainer.then(([outerContainer]) => {
        expect(outerContainer.offsetHeight).to.be.greaterThan(
          outerContainer.clientHeight
        );
      });

      // make sure the vertical scrollbar is gone
      virtualizedContainer.then(([outerContainer]) => {
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
      },
      {
        id: 'one_interactive',
        display: '1 interactive',
        isExpandable: false,
      },
      {
        id: 'one_interactive_expandable',
        display: '1 interactive',
      },
      {
        id: 'two_interactives',
        display: '2 interactives',
        isExpandable: false,
      },
      {
        id: 'two_interactives_expandable',
        display: '2 interactives',
      },
    ];
    const columnVisibility = {
      visibleColumns: columns.map(({ id }) => id),
      setVisibleColumns: () => {},
    };

    const columnValueMap: { [key: string]: ReactNode } = {
      no_interactive: <span>value</span>,
      no_interactive_expandable: <span>value</span>,
      header_interactive: <span>value</span>,

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

      // starts with body in focus
      cy.focused().should('not.exist');

      cy.get(
        '[data-gridcell-column-index="1"][data-gridcell-visible-row-index="1"]'
      ).click();
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '1')
        .should('have.attr', 'data-gridcell-row-index', '1');
    });

    describe('cell keyboard interactions', () => {
      it('tabbing to the grid the controls, then the first cell, then off', () => {
        cy.realMount(
          <>
            <EuiDataGrid {...focusManagementBaseProps} />
            <span tabIndex={0} id="final-tabbable" />
          </>
        );

        // starts with body in focus
        cy.focused().should('not.exist');

        // tab through the control bar
        cy.realPress('Tab');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridColumnSelectorButton'
        );
        cy.realPress('Tab');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridKeyboardShortcutsButton'
        );
        cy.realPress('Tab');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridDisplaySelectorButton'
        );
        cy.realPress('Tab');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridFullScreenButton'
        );

        // tab into the grid, should focus first header cell
        cy.realPress('Tab');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '0')
          .should('have.attr', 'data-gridcell-row-index', '-1');

        cy.realPress('Tab');
        cy.focused().should('have.id', 'final-tabbable');
      });

      it('arrow-keying focuses another cell', () => {
        cy.mount(<EuiDataGrid {...focusManagementBaseProps} />);

        // first cell is non-interactive and non-expandable = focus cell
        cy.get(
          '[data-gridcell-column-index="0"][data-gridcell-row-index="0"]'
        ).click();
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '0')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // already left-most, should be no-op
        cy.focused().type('{leftarrow}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '0')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // arrow right, expandable cell with no interactive = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '1')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // arrow right, non-expandable cell with one interactive = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '2')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // arrow right, non-expandable cell with two interactives = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '3')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // arrow right, expandable cell with two interactives = focus cell
        cy.focused().type('{rightarrow}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '4')
          .should('have.attr', 'data-gridcell-row-index', '0');
      });

      it('cell expansion/interaction', () => {
        cy.mount(<EuiDataGrid {...focusManagementBaseProps} />);

        // first cell is non-interactive and non-expandable, enter should have no effect
        cy.get(
          '[data-gridcell-column-index="0"][data-gridcell-row-index="0"]'
        ).click();
        cy.focused().type('{enter}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '0')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // second cell is expandable
        cy.get(
          '[data-gridcell-column-index="1"][data-gridcell-row-index="0"]'
        ).click();
        cy.focused().type('{enter}');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.focused().type('{esc}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '1')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // third cell is non-expandable & interactive, click should focus on the link
        cy.get(
          '[data-gridcell-column-index="2"][data-gridcell-row-index="0"]'
        ).click();
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-test-subj', 'focusOnMe');

        // fourth cell is expandable & interactive, click should focus on the popover
        cy.get(
          '[data-gridcell-column-index="3"][data-gridcell-row-index="0"]'
        ).realClick({ position: 'right' });
        cy.focused().type('{enter}');
        // focus trap focuses the popover
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.focused().type('{esc}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '3')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // fifth cell is non-expandable & no-actions with multiple interactives, click should focus cell
        cy.get(
          '[data-gridcell-column-index="4"][data-gridcell-row-index="0"]'
        ).click('topLeft'); // top left to avoid clicking a button
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '4')
          .should('have.attr', 'data-gridcell-row-index', '0');
        // enable interactives & focus trap
        cy.focused().type('{enter}');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-no');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes');
        cy.focused().type('{esc}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '4')
          .should('have.attr', 'data-gridcell-row-index', '0');

        // sixth cell is expandable cell with two interactives, click should focus on the cell
        cy.get(
          '[data-gridcell-column-index="5"][data-gridcell-row-index="0"]'
        ).click('topLeft', { force: true }); // top left to avoid clicking a button
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '5')
          .should('have.attr', 'data-gridcell-row-index', '0');
        cy.focused().type('{enter}'); // trigger expansion popover
        // focus trap focuses the popover
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-yes');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'btn-no');
        cy.realPress('Tab');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'euiDataGridExpansionPopover'
        );
        cy.focused().type('{esc}');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '5')
          .should('have.attr', 'data-gridcell-row-index', '0');
      });

      it('column header cells without focus trap', () => {
        cy.realMount(<EuiDataGrid {...focusManagementBaseProps} />);
        cy.repeatRealPress('Tab', 5);
        cy.realPress('{rightarrow}');

        // Should focus cell itself
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '1')
          .should('have.attr', 'data-gridcell-row-index', '-1');

        // Pressing enter should toggle the actions popover
        cy.realPress('Enter');
        cy.get(
          '[data-test-subj="dataGridHeaderCellActionGroup-no_interactive_expandable"]'
        ).should('be.visible');

        // The actions popover should be fully tabbable/focus trapped with no regressions
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Hide column');
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Move left');
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Move right');
      });

      it('column header cells with focus trap', () => {
        const columns: EuiDataGridColumn[] = [
          {
            id: 'no_interactive',
            display: '0 interactive',
            isExpandable: false,
            actions: false,
          },
          {
            id: 'no_interactive_expandable',
            display: (
              <button data-test-subj="dataGridHeaderCellInteractiveHeader">
                <strong>header interactive</strong>
              </button>
            ),
          },
          {
            id: 'one_interactive',
            display: '1 interactive',
            isExpandable: false,
          },
          {
            id: 'one_interactive_expandable',
            display: '1 interactive',
          },
          {
            id: 'two_interactives',
            display: '2 interactives',
            isExpandable: false,
          },
          {
            id: 'two_interactives_expandable',
            display: '2 interactives',
          },
        ];

        cy.realMount(
          <EuiDataGrid {...focusManagementBaseProps} columns={columns} />
        );
        cy.repeatRealPress('Tab', 5);
        cy.realPress('{rightarrow}');

        // Should focus cell itself
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '1')
          .should('have.attr', 'data-gridcell-row-index', '-1');

        // Pressing enter should toggle the actions popover
        cy.realPress('Enter');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridHeaderCellInteractiveHeader'
        );
        cy.realPress('Tab');
        cy.realPress('Enter');
        cy.get(
          '[data-test-subj="dataGridHeaderCellActionGroup-no_interactive_expandable"]'
        ).should('be.visible');

        // The actions popover should be fully tabbable/focus trapped with no regressions
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Hide column');
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Move left');
        cy.realPress('Tab');
        cy.focused().should('have.text', 'Move right');

        // close action menu
        cy.realPress('Escape');
        cy.focused().should(
          'have.attr',
          'data-test-subj',
          'dataGridHeaderCellActionButton-no_interactive_expandable'
        );
        // exit cell content
        cy.realPress('Escape');
        cy.focused()
          .should('have.attr', 'data-gridcell-column-index', '1')
          .should('have.attr', 'data-gridcell-row-index', '-1');
      });
    });
  });

  describe('cell popovers', () => {
    // Props
    const cellActions: EuiDataGridColumnCellAction[] = [
      ({ Component }) => (
        <Component iconType="plusInCircle" aria-label="Filter in">
          Filter in
        </Component>
      ),
      ({ Component }) => (
        <Component iconType="minusInCircle" aria-label="Filter out">
          Filter out
        </Component>
      ),
    ];
    const columns = [
      { id: 'default', cellActions },
      { id: 'json', schema: 'json', cellActions },
    ];
    const columnVisibility = {
      visibleColumns: ['default', 'json'],
      setVisibleColumns: () => {},
    };
    const baseCellPopoverProps = { ...baseProps, columns, columnVisibility };

    // Utils
    const openPopover = (columnId = 'default', rowIndex = 0) => {
      cy.realPress('Escape'); // Close any open popovers
      cy.get(
        `[data-gridcell-column-id="${columnId}"][data-gridcell-row-index="${rowIndex}"]`
      ).click();
      cy.focused().type('{enter}'); // Open cell popover
    };

    // Tests
    it('renders a default popover with default cell values and a footer with cell actions', () => {
      cy.mount(<EuiDataGrid {...baseCellPopoverProps} />);
      openPopover();
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
        expect(el.find('.euiText').text()).equals('default, 0');
        expect(el.find('.euiPopoverFooter').length).equals(1);
        expect(el.find('.euiButtonEmpty').length).equals(2);
      });
    });

    describe('renderCellValue isDetails', () => {
      it('renders a default popover with custom content in an EuiText wrapper and default cell actions', () => {
        cy.mount(
          <EuiDataGrid
            {...baseCellPopoverProps}
            renderCellValue={({ isDetails, schema }) => {
              if (isDetails && schema !== 'json') {
                return 'custom popover content';
              }
              return 'no -popover content';
            }}
          />
        );
        openPopover();
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('.euiText').text()).equals('custom popover content');
          expect(el.find('.euiPopoverFooter').length).equals(1);
        });
      });
    });

    describe('renderCellPopover', () => {
      it('renders a custom popover with completely custom content', () => {
        cy.mount(
          <EuiDataGrid
            {...baseCellPopoverProps}
            renderCellPopover={() => (
              <>
                <div data-test-subj="customPopover">Hello world!</div>
                <button data-test-subj="customAction">Test</button>
              </>
            )}
          />
        );
        openPopover();
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('.euiText').length).equals(0);
          expect(el.find('.euiPopoverFooter').length).equals(0);

          expect(el.find('[data-test-subj="customPopover"]').text()).equals(
            'Hello world!'
          );
          expect(el.find('[data-test-subj="customAction"]').text()).equals(
            'Test'
          );
        });
      });

      it('renders a custom popover with default cell content and no cell actions', () => {
        cy.mount(
          <EuiDataGrid
            {...baseCellPopoverProps}
            renderCellPopover={({ children }) => (
              <div data-test-subj="customPopover">{children}</div>
            )}
          />
        );
        openPopover();
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('.euiText').length).equals(0);
          expect(el.find('.euiPopoverFooter').length).equals(0);

          expect(el.find('[data-test-subj="customPopover"]').text()).equals(
            'default, 0'
          );
        });
      });

      it('renders a custom popover with custom cell content and default cell actions', () => {
        cy.mount(
          <EuiDataGrid
            {...baseCellPopoverProps}
            renderCellPopover={({ cellActions }) => (
              <>
                <div data-test-subj="customPopover">Test</div>
                {cellActions}
              </>
            )}
          />
        );
        openPopover();
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('.euiText').length).equals(0);
          expect(el.find('.euiPopoverFooter').length).equals(1);
          expect(el.find('.euiButtonEmpty').length).equals(2);

          expect(el.find('[data-test-subj="customPopover"]').text()).equals(
            'Test'
          );
        });
      });

      it('conditionally renders default cell popovers and custom cell popovers', () => {
        cy.mount(
          <EuiDataGrid
            {...baseCellPopoverProps}
            renderCellPopover={(props) => {
              const { schema, DefaultCellPopover, cellContentsElement } = props;

              if (schema === 'json') {
                return <DefaultCellPopover {...props} />;
              }
              if (cellContentsElement.innerText === 'default, 2') {
                return (
                  <div data-test-subj="oneOffPopover">
                    Extremely custom popover
                  </div>
                );
              }
              return <div data-test-subj="customPopover">Custom popover</div>;
            }}
          />
        );
        openPopover('default');
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('[data-test-subj="customPopover"]').text()).equals(
            'Custom popover'
          );
        });
        openPopover('default', 2);
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('[data-test-subj="oneOffPopover"]').text()).equals(
            'Extremely custom popover'
          );
        });
        openPopover('json');
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]').then((el) => {
          expect(el.find('[data-test-subj="customPopover"]').length).equals(0);
          expect(el.find('.euiCodeBlock').length).equals(1);
          expect(el.find('.euiPopoverFooter').length).equals(1);
        });
      });
    });
  });

  describe('copying tabular content', () => {
    it('renders one newline per-row and renders horizontal tab characters between cells', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);

      cy.selectAndCopy('.euiDataGrid__content').then((copiedText) => {
        expect(copiedText).to.eq(
          `First\tSecond
a, 0\tb, 0
a, 1\tb, 1
a, 2\tb, 2
a, footer\tb, footer
`
        );
      });
    });
  });
});

function getGridData() {
  // wait for the virtualized cells to render
  cy.get('[data-gridcell-column-index="0"][data-gridcell-row-index="1"]');
  const rows = cy.get('[role=row]');
  return rows.then((rows) => {
    const headers: string[] = [];
    const data: Array<{ [key: string]: string }> = [];

    // process header
    const headerRow = rows[0];
    const headerCells = headerRow.querySelectorAll('[role=columnheader]');
    for (let i = 0; i < headerCells.length; i++) {
      const headerCell = headerCells[i];
      const headerContent = headerCell.querySelector(
        '.euiDataGridHeaderCell__content'
      )?.textContent;
      headers.push(headerContent ?? '');
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
