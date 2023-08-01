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

import React, { useEffect } from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../';

const baseProps: EuiDataGridProps = {
  'aria-label': 'Grid cell popover test',
  height: 300,
  width: 300,
  columns: [{ id: 'A' }, { id: 'B' }],
  rowCount: 2,
  renderCellValue: ({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`,
  columnVisibility: {
    visibleColumns: ['A', 'B'],
    setVisibleColumns: () => {},
  },
};

describe('EuiDataGridCellPopover', () => {
  describe('manually restores focus to the originating cell when the cell popover is closed', () => {
    it('when Enter key and then Escape key is pressed', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.get(
        '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
      ).realClick();

      cy.realPress('Enter');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'euiDataGridExpansionPopover'
      );

      cy.realPress('Escape');
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '0')
        .should('have.attr', 'data-gridcell-row-index', '0');
    });

    it('when the expand button is clicked and then Escape key is pressed', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.get(
        '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
      ).realClick();

      cy.get('[data-test-subj="euiDataGridCellExpandButton"]').realClick();
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'euiDataGridExpansionPopover'
      );

      cy.realPress('Escape');

      cy.get(
        '[data-gridcell-column-index="0"][data-gridcell-row-index="0"]'
      ).should('be.focused');
    });

    it('when the expand button is clicked and then F2 key is pressed', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.get(
        '[data-gridcell-row-index="1"][data-gridcell-column-index="1"]'
      ).realClick();

      cy.get('[data-test-subj="euiDataGridCellExpandButton"]').realClick();
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'euiDataGridExpansionPopover'
      );

      cy.realPress('F2');
      cy.focused()
        .should('have.attr', 'data-gridcell-column-index', '1')
        .should('have.attr', 'data-gridcell-row-index', '1');
    });
  });

  it('closes the cell popover when the originating cell is clicked', () => {
    cy.realMount(<EuiDataGrid {...baseProps} />);
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).realClick();

    cy.get('[data-test-subj="euiDataGridCellExpandButton"]').realClick();
    cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should('exist');

    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).realClick();
    cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
      'not.exist'
    );
  });

  it('allows consumers to use setCellPopoverProps, passed from renderCellPopover, to customize popover props', () => {
    const RenderCellPopover: EuiDataGridProps['renderCellPopover'] = (
      props
    ) => {
      const { DefaultCellPopover, setCellPopoverProps } = props;

      useEffect(() => {
        setCellPopoverProps({
          panelClassName: 'hello',
          panelProps: { className: 'world' },
        });
      }, [setCellPopoverProps]);

      return <DefaultCellPopover {...props} />;
    };

    cy.realMount(
      <EuiDataGrid {...baseProps} renderCellPopover={RenderCellPopover} />
    );
    cy.get(
      '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
    ).realClick();
    cy.get('[data-test-subj="euiDataGridCellExpandButton"]').realClick();

    cy.get('.euiDataGridRowCell__popover.hello.world').should('exist');
  });
});
