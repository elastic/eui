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

const EXPECTED_HOVER_COLOR = 'rgb(90, 109, 140)';
const EXPECTED_FOCUS_COLOR = 'rgb(11, 100, 221)';
const ANIMATION = {
  DELAY: 350,
  DURATION: 150,
  BUFFER: 25, // extra wait buffer to reduce flakiness
};

describe('Cell outline styles', () => {
  const baseProps = {
    'aria-label': 'Test',
    width: 300,
    rowCount: 1,
    renderCellValue: () => (
      <>
        <button data-test-subj="interactiveChildA">A</button>
        <button data-test-subj="interactiveChildB">B</button>
      </>
    ),
    columns: [
      { id: 'expandable', isExpandable: true },
      {
        id: 'notExpandable',
        isExpandable: false,
        display: (
          <button data-test-subj="interactiveHeader">interactive</button>
        ),
      },
    ],
    columnVisibility: {
      setVisibleColumns: () => {},
      visibleColumns: ['expandable', 'notExpandable'],
    },
  };

  // Test utils
  const getExpandableRowCell = () =>
    cy.get('.euiDataGridRowCell[data-gridcell-column-id="expandable"]');
  const getCellExpansionPopover = () => cy.get('.euiDataGridRowCell__popover');
  const getActions = () => cy.get('.euiDataGridRowCell__actions');
  const getActionsHeight = () =>
    getActions().then(($el) => {
      const { height } = $el[0].getBoundingClientRect();
      return height;
    });
  const getOutlineColor = (el: HTMLElement) => {
    // get Window reference from element
    const win = el.ownerDocument.defaultView!;
    // use getComputedStyle to read the pseudo selector
    const pseudoElement = win.getComputedStyle(el, 'after');

    return pseudoElement.getPropertyValue('border-color');
  };

  it('does not show cell actions if not focused or hovered', () => {
    cy.realMount(<EuiDataGrid {...baseProps} />);
    getActions().should('not.exist');
  });

  describe('keyboard UI/UX', () => {
    const tabToDataGrid = () => {
      cy.repeatRealPress('Tab', 4);
    };
    const moveToRowCell = () => {
      cy.realPress('ArrowDown');
    };

    it('shows the cell outline and actions as blue on focus', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      tabToDataGrid();
      moveToRowCell();

      getExpandableRowCell().then(($el) => {
        expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
      });
      getActions().should('have.css', 'background-color', EXPECTED_FOCUS_COLOR);
    });

    it('runs the actions height animation without a delay on focus', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      tabToDataGrid();
      moveToRowCell();

      cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsHeight().then((height) => expect(height).to.eq(22));
    });

    it('does not re-run the actions height animation on popover keyboard close', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);
      tabToDataGrid();
      moveToRowCell();

      cy.realPress('Enter');
      getCellExpansionPopover().should('be.visible');
      cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsHeight().then((height) => expect(height).to.eq(22));

      cy.realPress('Escape');
      getCellExpansionPopover().should('not.exist');
      getActionsHeight().then((height) => expect(height).to.eq(22));
    });

    describe('focus trap', () => {
      it('should show gray hover styles on header cells when the focus trap is entered', () => {
        const getHeaderCell = () =>
          cy.get(
            '.euiDataGridHeaderCell[data-gridcell-column-id="notExpandable"]'
          );

        cy.realMount(<EuiDataGrid {...baseProps} />);
        tabToDataGrid();
        cy.realPress('ArrowRight');
        getHeaderCell()
          .should('be.focused')
          .then(($el) => {
            expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
          });

        cy.realPress('Enter');
        cy.wait(50);
        getHeaderCell().then(($el) => {
          expect(getOutlineColor($el[0])).to.eq(EXPECTED_HOVER_COLOR);
        });
        cy.get('[data-test-subj="interactiveHeader"]').should('be.focused');

        cy.realPress('Escape');
        getHeaderCell()
          .should('be.focused')
          .then(($el) => {
            expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
          });
      });

      it('should show gray hover styles on row cells when the focus trap is entered', () => {
        const getRowCell = () =>
          cy.get(
            '.euiDataGridRowCell[data-gridcell-column-id="notExpandable"]'
          );

        cy.realMount(<EuiDataGrid {...baseProps} />);
        tabToDataGrid();
        cy.realPress('ArrowRight');
        moveToRowCell();
        getRowCell()
          .should('be.focused')
          .then(($el) => {
            expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
          });

        cy.realPress('Enter');
        cy.wait(50);
        getRowCell().then(($el) => {
          expect(getOutlineColor($el[0])).to.eq(EXPECTED_HOVER_COLOR);
        });
        cy.get('[data-test-subj="interactiveChildA"]').should('be.focused');

        cy.realPress('Escape');
        getRowCell()
          .should('be.focused')
          .then(($el) => {
            expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
          });
      });
    });

    describe('open popovers', () => {
      it('should always show the focus color state when the cell header actions popover is open', () => {
        cy.realMount(<EuiDataGrid {...baseProps} />);
        tabToDataGrid();

        cy.realPress('Enter');
        cy.get(
          '[data-test-subj="dataGridHeaderCellActionGroup-expandable"]'
        ).should('be.visible');

        cy.get(
          '.euiDataGridHeaderCell[data-gridcell-column-id="expandable"]'
        ).then(($el) => {
          expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
        });
      });

      it('should always show the focus color state when the cell expansion popover is open', () => {
        cy.realMount(<EuiDataGrid {...baseProps} />);
        tabToDataGrid();
        moveToRowCell();

        cy.realPress('Enter');
        getCellExpansionPopover().should('be.visible');

        getExpandableRowCell().then(($el) => {
          expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
        });
      });
    });

    describe('column header dragging', () => {
      const propsWithDrag = {
        ...baseProps,
        columnVisibility: {
          ...baseProps.columnVisibility,
          canDragAndDropColumns: true,
        },
      };
      const getHeaderCell = () =>
        cy.get('.euiDataGridHeaderCell[data-gridcell-column-id="expandable"]');
      const getDragIconWidth = () =>
        getHeaderCell()
          .find('.euiDataGridHeaderCell__draggableIcon')
          .then(($el) => {
            const { width } = $el[0].getBoundingClientRect();
            return width;
          });

      it('should show focus state when dragging', () => {
        cy.realMount(<EuiDataGrid {...propsWithDrag} />);
        getDragIconWidth().then((width) => expect(width).to.eq(0));

        tabToDataGrid();
        cy.realPress('Space');
        getHeaderCell().should('have.attr', 'data-column-moving', 'true');

        cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
        getHeaderCell().then(($el) => {
          expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
        });
        getDragIconWidth().then((width) => expect(width).to.eq(12));
      });

      it('should not re-flash the header actions transition after drop', () => {
        cy.realMount(<EuiDataGrid {...propsWithDrag} />);

        tabToDataGrid();
        cy.realPress('Space');
        getDragIconWidth().then((width) => expect(width).to.eq(12));

        cy.realPress('Space');
        getDragIconWidth().then((width) => expect(width).to.eq(12));
        getHeaderCell().should('not.have.attr', 'data-column-moving');
      });
    });
  });

  describe('mouse UI/UX', () => {
    it('shows the cell outline and actions as gray on hover', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);

      getExpandableRowCell().realHover();

      getExpandableRowCell().then(($el) => {
        expect(getOutlineColor($el[0])).to.eq(EXPECTED_HOVER_COLOR);
      });
      getActions().should('have.css', 'background-color', EXPECTED_HOVER_COLOR);
    });

    it('waits to run the actions height animation on hover', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);

      getExpandableRowCell().realHover();
      getActionsHeight().then((height) => expect(height).to.eq(0));

      cy.wait(ANIMATION.DELAY + ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsHeight().then((height) => expect(height).to.eq(22));
    });

    it('immediately runs the actions height animation if clicked after hover', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);

      getExpandableRowCell().realHover();
      getActionsHeight().then((height) => expect(height).to.eq(0));

      getExpandableRowCell().realClick();
      cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsHeight().then((height) => expect(height).to.eq(22));
    });

    it('does not flash between hover and focus colors when cell expansion is toggled via click', () => {
      const clickExpandAction = () =>
        cy
          .get('[data-test-subj="euiDataGridCellExpandButton"]')
          .realMouseMove(0, 0, { position: 'center' })
          .realClick();

      cy.realMount(<EuiDataGrid {...baseProps} />);

      getExpandableRowCell().realHover();
      cy.wait(ANIMATION.DELAY + ANIMATION.DURATION + ANIMATION.BUFFER);
      clickExpandAction();
      getCellExpansionPopover().should('be.visible');
      getActions().should('have.css', 'background-color', EXPECTED_FOCUS_COLOR);

      clickExpandAction();
      getCellExpansionPopover().should('not.exist');
      getActions().should('have.css', 'background-color', EXPECTED_FOCUS_COLOR);
    });

    it('has an invisible hover zone to the right of the cell actions', () => {
      cy.realMount(<EuiDataGrid {...baseProps} />);

      getExpandableRowCell().realHover();
      getActions().should('be.visible');

      getActions()
        .realMouseMove(16, 0, { position: 'right' })
        .should('be.visible')
        .realMouseMove(80, 0, { position: 'right' }) // ~50% of cell width
        .should('not.exist');
    });

    it('shows column actions on cell header hover/focus', () => {
      const getHeaderCell = () =>
        cy.get('.euiDataGridHeaderCell[data-gridcell-column-id="expandable"]');
      const getHeaderActions = () =>
        cy.get('[data-test-subj="dataGridHeaderCellActionButton-expandable"]');
      const getActionsWidth = () =>
        getHeaderActions().then(($el) => {
          const { width } = $el[0].getBoundingClientRect();
          return width;
        });

      cy.realMount(<EuiDataGrid {...baseProps} />);
      getActionsWidth().then((width) => expect(width).to.eq(0));

      // Hovering over the header cell should slide in the actions from the right
      getHeaderCell().realHover();
      cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsWidth().then((width) => expect(width).to.eq(24));

      // Toggling the actions popover should render the focus outline
      getHeaderCell().then(($el) => {
        expect(getOutlineColor($el[0])).not.to.eq(EXPECTED_FOCUS_COLOR);
      });
      getHeaderActions().realClick();
      getHeaderCell().then(($el) => {
        expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
      });
      getHeaderActions().realClick();

      // Mousing off the cell should still show outline+actions since the button is still focused
      getHeaderActions().realMouseMove(100, 0, { position: 'right' });
      cy.wait(ANIMATION.DURATION + ANIMATION.BUFFER);
      getActionsWidth().then((width) => expect(width).to.eq(24));
      getHeaderCell().then(($el) => {
        expect(getOutlineColor($el[0])).to.eq(EXPECTED_FOCUS_COLOR);
      });
    });
  });
});
