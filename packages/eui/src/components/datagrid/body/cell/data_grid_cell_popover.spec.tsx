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

import React, { useEffect } from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../..';

const baseProps: EuiDataGridProps = {
  'aria-label': 'Grid cell popover test',
  height: 300,
  width: 400,
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
      ).realHover();

      cy.get('[data-test-subj="euiDataGridCellExpandButton"]').click();
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
      ).realHover();

      cy.get('[data-test-subj="euiDataGridCellExpandButton"]').click();
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

  describe('closes the cell popover', () => {
    // Mount and open the first cell popover
    beforeEach(() => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      cy.get(
        '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
      ).click();
      cy.realPress('Enter');
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should('exist');
    });

    it('when the originating cell is clicked', () => {
      cy.get(
        '[data-gridcell-row-index="0"][data-gridcell-column-index="0"]'
      ).realClick({ position: 'right' });
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
        'not.exist'
      );
    });

    it('when the cell expand action button is clicked', () => {
      cy.get('[data-test-subj="euiDataGridCellExpandButton"]').click();
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
        'not.exist'
      );
    });

    it('when anywhere outside the grid is clicked', () => {
      cy.get('body').realClick({ position: 'bottomRight' });
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should(
        'not.exist'
      );
    });
  });

  it('does not close the cell popover when other cell actions are clicked', () => {
    const cellActions = [
      ({ Component }) => (
        <Component
          iconType="plusInCircle"
          aria-label="A"
          data-test-subj="cellActionA"
        />
      ),
      ({ Component }) => (
        <Component
          iconType="minusInCircle"
          aria-label="B"
          data-test-subj="cellActionB"
        />
      ),
    ];
    cy.realMount(
      <EuiDataGrid {...baseProps} columns={[{ id: 'A', cellActions }]} />
    );
    cy.get('[data-test-subj="dataGridRowCell"]').first().click();
    cy.realPress('Enter');
    cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should('exist');

    cy.get('[data-test-subj="cellActionA"]').first().click();
    cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should('exist');

    cy.get('[data-test-subj="cellActionB"]').first().click();
    cy.get('[data-test-subj="euiDataGridExpansionPopover"]').should('exist');

    // Clicking the cell actions outside the popover should not have disabled the focus trap
    cy.repeatRealPress('Tab', 3);
    cy.focused().should(
      'have.attr',
      'data-test-subj',
      'euiDataGridExpansionPopover'
    );
    cy.get('body').realClick({ position: 'bottomRight' });
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
    ).realHover();
    cy.get('[data-test-subj="euiDataGridCellExpandButton"]').click();

    cy.get('.euiDataGridRowCell__popover.hello.world').should('exist');
  });

  describe('popover anchor/positioning', () => {
    const props = {
      ...baseProps,
      rowCount: 1,
      renderCellValue: ({ columnId }) => {
        switch (columnId) {
          case 'A':
            return 'short text';
          case 'B':
            return 'Very long text that should get cut off because it is so long, lorem ipsum dolor sit amet words words words';
        }
      },
    };

    const openCellPopover = (id: string) => {
      cy.get(
        `[data-gridcell-row-index="0"][data-gridcell-column-id="${id}"]`
      ).click();
      cy.realPress('Enter');
    };

    it('small popover', () => {
      cy.realMount(<EuiDataGrid {...props} />);

      openCellPopover('A');
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]')
        .should('have.css', 'left', '1px')
        .should('have.css', 'top', '76px')
        .should('have.css', 'width', '112px');
    });

    it('large popover', () => {
      cy.realMount(<EuiDataGrid {...props} />);

      openCellPopover('B');
      cy.get('[data-test-subj="euiDataGridExpansionPopover"]')
        .should('have.css', 'left', '109px')
        .should('have.css', 'top', '76px')
        .should('have.css', 'width', '375px');
    });

    describe('max popover dimensions', () => {
      it('never exceeds 75% of the viewport width or 50% of the viewport height', () => {
        cy.viewport(300, 200);
        // Popover renders correctly when the Cypress viewport is scrolled to the left
        // but not if it's scrolled to the right, hence this column workaround.
        // I can't reproduce this bug in Storybook or production datagrids 🤷
        cy.realMount(<EuiDataGrid {...props} columns={[{ id: 'B' }]} />);

        openCellPopover('B');
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]')
          .should('have.css', 'width', '225px') // 300 * .75
          .should('have.css', 'height', '100px'); // 200 * .5
      });

      it('does not exceed 400px width if the column width is smaller than 400px', () => {
        cy.viewport(1000, 500);
        cy.realMount(<EuiDataGrid {...props} />);

        openCellPopover('B');
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]')
          .should('have.css', 'width', '400px')
          .should('have.css', 'height', '88px');
      });

      it('matches the width of the column if the column width is larger than 400px', () => {
        cy.viewport(1000, 500);
        cy.realMount(
          <EuiDataGrid
            {...props}
            width={500}
            columns={[{ id: 'B', initialWidth: 500 }]}
          />
        );

        openCellPopover('B');
        cy.get('[data-test-subj="euiDataGridExpansionPopover"]')
          .should('have.css', 'width', '500px')
          .should('have.css', 'height', '64px');
      });
    });
  });
});
