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

import React from 'react';
import { EuiDataGrid } from '../../data_grid';

describe('Cell focus utils', () => {
  const baseProps = {
    'aria-label': 'Test',
    width: 300,
    rowCount: 1,
    renderCellValue: () => 'cell',
    columnVisibility: {
      setVisibleColumns: () => {},
      visibleColumns: ['column'],
    },
  };

  const interactiveChildren = (
    <>
      <button data-test-subj="interactiveChildA">A</button>
      <button data-test-subj="interactiveChildB">B</button>
    </>
  );

  describe('does not render a focus trap', () => {
    it('when body cells are expandable', () => {
      cy.realMount(
        <EuiDataGrid
          {...baseProps}
          columns={[{ id: 'column', isExpandable: true, actions: {} }]}
        />
      );

      const cell = '[data-test-subj="dataGridRowCell"]';
      const cellAction = '[data-test-subj="euiDataGridCellExpandButton"]';
      const cellPopover = '[data-test-subj="euiDataGridExpansionPopover"]';

      // Should toggle the cell expansion popover instead
      cy.get(cell).realHover();
      cy.get(cellAction).should('be.visible');
      cy.get(cellAction).click();
      cy.get(cellPopover).should('be.visible');

      // Keyboard behavior
      cy.realPress('Escape');
      cy.get(cellPopover).should('not.exist');
      cy.realPress('Enter');
      cy.get(cellPopover).should('exist');
    });

    it('when header cells have actions but no other interactive content', () => {
      cy.realMount(
        <EuiDataGrid
          {...baseProps}
          columns={[{ id: 'column', isExpandable: true, actions: {} }]}
        />
      );

      const headerCell = '[data-test-subj="dataGridHeaderCell-column"]';
      const headerCellActionsButton =
        '[data-test-subj="dataGridHeaderCellActionButton-column"]';
      const headerCellPopover =
        '[data-test-subj="dataGridHeaderCellActionGroup-column"]';

      // click behavior
      // Should toggle the actions popover on actions button
      cy.get(headerCell).click();
      cy.get(headerCellPopover).should('not.exist');
      cy.get(headerCellActionsButton).click();
      cy.get(headerCellPopover).should('exist');

      // Keyboard behavior
      cy.realPress('Escape');
      cy.get(headerCellPopover).should('not.exist');
      cy.realPress('Enter');
      cy.get(headerCellPopover).should('exist');
    });
  });

  describe('renders a focus trap', () => {
    it('when header cells have actions and interactive content', () => {
      cy.realMount(
        <EuiDataGrid
          {...baseProps}
          columns={[
            { id: 'column', actions: {}, display: interactiveChildren },
          ]}
        />
      );

      // Enter the trap
      cy.get('[data-test-subj="dataGridHeaderCell-column"]').realClick();
      cy.realPress('Enter');

      // Should cycle through focus trap
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildA');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildB');
      cy.realPress('Tab');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCellActionButton-column'
      );

      // Exit the trap
      cy.realPress('Escape');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-column'
      );
    });

    it('when header cells do not have actions but interactive content', () => {
      cy.realMount(
        <EuiDataGrid
          {...baseProps}
          columns={[
            { id: 'column', actions: false, display: interactiveChildren },
          ]}
        />
      );

      // Enter the trap
      cy.get('[data-test-subj="dataGridHeaderCell-column"]').realClick();
      cy.realPress('Enter');

      // Should cycle through focus trap
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildA');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildB');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildA');

      // Exit the trap
      cy.realPress('Escape');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-column'
      );
    });

    it('when body cells are not expandable', () => {
      cy.realMount(
        <EuiDataGrid
          {...baseProps}
          columns={[{ id: 'column', isExpandable: false }]}
          renderCellValue={() => interactiveChildren}
        />
      );
      // Enter the trap
      cy.get('[data-test-subj="dataGridRowCell"]').realClick();
      cy.realPress('Enter');

      // Should cycle through focus trap
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildA');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildB');
      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-test-subj', 'interactiveChildA');

      // Exit the trap
      cy.realPress('Escape');
      cy.focused().should('have.attr', 'data-test-subj', 'dataGridRowCell');
    });
  });

  describe('focus context', () => {
    it('updates the cell focus context if interactive cell children are clicked', () => {
      cy.realMount(
        <>
          <EuiDataGrid
            {...baseProps}
            columnVisibility={{
              setVisibleColumns: () => {},
              visibleColumns: ['A', 'B'],
            }}
            columns={[
              {
                id: 'A',
                isExpandable: true,
              },
              {
                id: 'B',
                isExpandable: false,
                actions: false,
                display: interactiveChildren,
              },
            ]}
            renderCellValue={() => interactiveChildren}
          />
          <button>tabbable</button>
        </>
      );

      cy.repeatRealPress('Tab', 4);
      cy.focused()
        .should('have.attr', 'data-gridcell-row-index', '-1')
        .should('have.attr', 'data-gridcell-column-index', '0');

      cy.get('[data-test-subj="interactiveChildB"]').first().realClick();
      cy.realPress('Tab');
      cy.realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'data-gridcell-row-index', '-1')
        .should('have.attr', 'data-gridcell-column-index', '1');

      cy.get('[data-test-subj="interactiveChildB"]').last().realClick();
      cy.realPress('Tab');
      cy.realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'data-gridcell-row-index', '0')
        .should('have.attr', 'data-gridcell-column-index', '1');
    });
  });

  it('correctly toggles the header cell actions on focus when tabbing back into the datagrid', () => {
    cy.realMount(
      <EuiDataGrid {...baseProps} columns={[{ id: 'column', actions: {} }]} />
    );

    const assertFocusedHeaderActions = () => {
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-column'
      );
      cy.get('[data-test-subj="dataGridHeaderCell-column"]')
        .should('have.attr', 'data-gridcell-row-index', '-1')
        .should('have.attr', 'data-gridcell-column-index', '0');
    };

    const assertCanToggleActionsPopover = () => {
      const headerCellPopover =
        '[data-test-subj="dataGridHeaderCellActionGroup-column"]';

      cy.realPress('Enter');
      cy.get(headerCellPopover).should('be.visible');
      cy.realPress('Escape');
      cy.get(headerCellPopover).should('not.exist');
    };

    cy.repeatRealPress('Tab', 4);
    assertFocusedHeaderActions();
    cy.realPress('Enter');
    assertCanToggleActionsPopover();

    cy.realPress(['Shift', 'Tab']);
    cy.realPress('Tab');
    assertFocusedHeaderActions();
    assertCanToggleActionsPopover();
  });
});
