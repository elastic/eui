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

import React, { useState } from 'react';
import { EuiDataGrid, EuiDataGridProps } from '../../index';
import { EuiModal, EuiModalBody } from '../../../modal';

describe('draggable columns', () => {
  const columns = [
    { id: 'a', display: 'First' },
    { id: 'b', display: <button data-test-subj="b">Second</button> },
  ];

  const StatefulDataGrid = (props: Partial<EuiDataGridProps>) => {
    const [visibleColumns, setVisibleColumns] = useState(['a', 'b']);

    return (
      <EuiDataGrid
        rowCount={3}
        renderCellValue={({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`}
        {...props}
        columns={columns}
        columnVisibility={{
          visibleColumns,
          setVisibleColumns,
          canDragAndDropColumns: true,
        }}
        // ExclusiveUnion shenanigans :|
        aria-label="Testing"
        aria-labelledby={undefined}
      />
    );
  };

  it('should reorder columns on header cell drag and drop', () => {
    cy.realMount(<StatefulDataGrid />);

    cy.get('[data-test-subj=dataGridHeaderCell-a]')
      .realHover()
      .realMouseDown({ position: 'center' })
      .realMouseMove(0, 0) // start drag
      .realMouseMove(200, 34) // move (absolute coordinates)
      .realMouseUp();

    cy.get('[data-test-subj=dataGridHeaderCell-a]').should(
      'have.attr',
      'data-gridcell-column-index',
      '1'
    );
    cy.get('[data-test-subj=dataGridHeaderCell-b]').should(
      'have.attr',
      'data-gridcell-column-index',
      '0'
    );

    cy.get('[data-test-subj=dataGridHeaderCell-a]')
      .realHover()
      .realMouseDown({ position: 'center' })
      .realMouseMove(0, 0) // start drag
      .realMouseMove(0, 34) // move (absolute coordinates)
      .realMouseUp();

    cy.get('[data-test-subj=dataGridHeaderCell-a]').should(
      'have.attr',
      'data-gridcell-column-index',
      '0'
    );
    cy.get('[data-test-subj=dataGridHeaderCell-b]').should(
      'have.attr',
      'data-gridcell-column-index',
      '1'
    );
  });

  it('should reorder columns on header cell drag and drop with keyboard', () => {
    cy.realMount(<StatefulDataGrid />);

    cy.get('[data-test-subj=dataGridHeaderCell-a]')
      .focus()
      .realPress('Space')
      .realPress('ArrowRight')
      .realPress('Space');

    cy.get('[data-test-subj=dataGridHeaderCell-a]').should(
      'have.attr',
      'data-gridcell-column-index',
      '1'
    );
    cy.get('[data-test-subj=dataGridHeaderCell-b]').should(
      'have.attr',
      'data-gridcell-column-index',
      '0'
    );

    cy.realPress('Space');
    cy.realPress('ArrowLeft');
    cy.realPress('Space');

    cy.get('[data-test-subj=dataGridHeaderCell-a]').should(
      'have.attr',
      'data-gridcell-column-index',
      '0'
    );
    cy.get('[data-test-subj=dataGridHeaderCell-b]').should(
      'have.attr',
      'data-gridcell-column-index',
      '1'
    );
  });

  it('should refocus cells on drag cancel', () => {
    cy.realMount(<StatefulDataGrid />);

    // Keyboard drag cancel
    cy.get('[data-test-subj=dataGridHeaderCell-a]')
      .realClick()
      .realPress('Space')
      .realPress('Escape');
    cy.focused()
      .should('have.attr', 'data-test-subj', 'dataGridHeaderCell-a')
      .should('have.attr', 'data-gridcell-column-index', '0');

    // Should be able to tab in and out of the grid and have focus be restored to the correct header cell
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should(
      'have.attr',
      'data-test-subj',
      'dataGridFullScreenButton'
    );
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'data-test-subj', 'dataGridHeaderCell-a');

    // Mouse drag cancel
    cy.get('[data-test-subj=dataGridHeaderCell-a]')
      .realHover()
      .realMouseDown({ position: 'center' })
      .realMouseMove(0, 0) // start drag
      .realMouseMove(0, 34) // move (absolute coordinates)
      .realMouseUp();
    cy.wait(100);
    cy.focused().should('have.attr', 'data-test-subj', 'dataGridHeaderCell-a');
  });

  describe('headers with interactive children', () => {
    it('should not interfere with focus traps', () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get('[data-test-subj=dataGridHeaderCell-b]')
        .focus()
        .realPress('Enter');

      cy.focused().should('have.text', 'Second');
      cy.realPress('Tab');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCellActionButton-b'
      );
      cy.realPress('Tab');
      cy.focused().should('have.text', 'Second');

      cy.realPress('Escape');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-b'
      );
    });

    it('correctly re-focuses dragged cells if an interactive child has focus on drag start', () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get('[data-test-subj="b"]').focus();
      cy.focused().should('have.attr', 'data-test-subj', 'b');

      cy.get('[data-test-subj=dataGridHeaderCell-b]')
        .realMouseDown({ position: 'center' })
        .realMouseMove(0, 0) // start drag
        .realMouseMove(0, 34) // move (absolute coordinates)
        .realMouseUp();

      cy.focused()
        .should('have.attr', 'data-test-subj', 'dataGridHeaderCell-b')
        .should('have.attr', 'tabindex', '0');
    });

    it('should not open focus traps when dragging', () => {
      cy.realMount(<StatefulDataGrid />);

      // Start drag
      cy.get('[data-test-subj=dataGridHeaderCell-b]')
        .focus()
        .realPress('Space');

      // Should not enter focus trap
      cy.realPress('Enter');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-b'
      );

      // Cancel drag
      cy.realPress('Escape');
      cy.focused().should(
        'have.attr',
        'data-test-subj',
        'dataGridHeaderCell-b'
      );

      // Should still be able to enter focus trap
      cy.realPress('Enter');
      cy.focused().should('have.text', 'Second');
    });
  });

  describe('clicking a draggable cell', () => {
    it('should close its own column actions popover', () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realClick();
      cy.realPress('Enter');
      cy.get('[data-popover-open]').should('have.focus');

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realClick();
      cy.get('[data-test-subj=dataGridHeaderCell-a]').should('have.focus');
      cy.get('[data-popover-open]').should('not.exist');

      // Should not interefere with column actions popover toggle
      cy.wait(250);
      cy.get('[data-test-subj=dataGridHeaderCellActionButton-a]').realClick();
      cy.get('[data-popover-open]').should('have.focus');
      cy.get('[data-test-subj=dataGridHeaderCellActionButton-a]').realClick();
      cy.get('[data-popover-open]').should('not.exist');
    });

    it("should close another column's actions popover", () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realHover();
      cy.wait(50); // wait until actions button transition is progressed enough for the button to be clickable
      cy.get('[data-test-subj=dataGridHeaderCellActionButton-a]').realClick();
      cy.get('[data-popover-open]').should('have.focus');

      cy.get('[data-test-subj=dataGridHeaderCell-b]').realClick();
      cy.get('[data-test-subj=dataGridHeaderCell-b]').should('have.focus');
      cy.get('[data-popover-open]').should('not.exist');
    });

    it('should close row cell expansion popovers', () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get(
        '[data-gridcell-column-index=1][data-gridcell-row-index=0]'
      ).realClick();
      cy.realPress('Enter');
      cy.get('[data-popover-open]').should('have.focus');

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realClick({
        position: 'right',
      });
      cy.get('[data-test-subj=dataGridHeaderCell-a]').should('have.focus');
      cy.get('[data-popover-open]').should('not.exist');
    });

    it('should close data grid toolbar popovers', () => {
      cy.realMount(<StatefulDataGrid />);

      cy.get('[data-test-subj="dataGridColumnSelectorButton"]').realClick();
      cy.get('[data-popover-open]').should('have.focus');

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realClick({
        position: 'right',
      });
      cy.get('[data-test-subj=dataGridHeaderCell-a]').should('have.focus');
      cy.get('[data-popover-open]').should('not.exist');
    });
  });

  describe('inside a modal', () => {
    it('should execute column actions on click', () => {
      cy.realMount(
        <EuiModal onClose={() => {}}>
          <EuiModalBody>
            <StatefulDataGrid />
          </EuiModalBody>
        </EuiModal>
      );

      cy.get('[data-test-subj=dataGridHeaderCell-a]').realHover();
      cy.wait(50); // wait until actions button transition is progressed enough for the button to be clickable
      cy.get('[data-test-subj=dataGridHeaderCellActionButton-a]').realClick();
      cy.get('[data-popover-open]').should('have.focus');

      cy.get(
        '.euiListGroupItem:last-child .euiListGroupItem__button'
      ).realClick();

      cy.get('[data-test-subj=dataGridHeaderCell-a]').should(
        'have.attr',
        'data-gridcell-column-index',
        '1'
      );
      cy.get('[data-test-subj=dataGridHeaderCell-b]').should(
        'have.attr',
        'data-gridcell-column-index',
        '0'
      );

      cy.get('[data-test-subj=euiDataGridHeaderColumnActions]').should(
        'not.exist'
      );
    });
  });
});
