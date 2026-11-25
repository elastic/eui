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

import React from 'react';
import { EuiDataGrid } from '../';
import { EuiScreenReaderOnly } from '../../accessibility';

// Which fractional widths make clientWidth round up depends on how the browser
// snaps the grid to pixels, so sweep the whole range in small steps
const PANEL_WIDTHS = Array.from({ length: 20 }, (_, i) => 500 + i * 0.05);

const UnsizedColumnsGrid = () => (
  <EuiDataGrid
    aria-label="Unsized columns grid"
    columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]}
    columnVisibility={{
      visibleColumns: ['A', 'B', 'C'],
      setVisibleColumns: () => {},
    }}
    leadingControlColumns={[
      {
        id: 'rowNumber',
        width: 40,
        headerCellRender: () => (
          <EuiScreenReaderOnly>
            <span>Row number</span>
          </EuiScreenReaderOnly>
        ),
        rowCellRender: ({ rowIndex }) => rowIndex + 1,
      },
    ]}
    rowCount={3}
    renderCellValue={({ rowIndex, columnId }) => `${columnId}, ${rowIndex}`}
    toolbarVisibility={false}
  />
);

const mountInPanel = (width: number) => {
  cy.realMount(
    // clientWidth rounding depends on the grid's position, so keep it fixed
    <div
      data-test-subj="panel"
      style={{ position: 'fixed', top: 0, left: 0, width, height: 300 }}
    >
      <UnsizedColumnsGrid />
    </div>
  );
  cy.get('.euiDataGrid__virtualized').should('exist');
};

const countStyleChanges = (element: HTMLElement, duration: number) =>
  new Cypress.Promise<number>((resolve) => {
    let changes = 0;
    const observer = new MutationObserver((records) => {
      changes += records.length;
    });
    observer.observe(element, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style'],
    });
    setTimeout(() => {
      observer.disconnect();
      resolve(changes);
    }, duration);
  });

// A retry re-mounts at a different moment and can round the other way,
// which would hide a real overflow
describe('useVirtualizeContainerWidth', { retries: 0 }, () => {
  PANEL_WIDTHS.forEach((width) => {
    describe(`in a ${width.toFixed(2)}px wide panel`, () => {
      it('sizes unsized columns to fit the fractional content width', () => {
        mountInPanel(width);

        // Compares layout widths directly, so it also catches the overflow
        // in headless Chrome, which hides scroll bars
        cy.get('.euiDataGrid__virtualized').should(($virtualized) => {
          const virtualized = $virtualized[0];
          const scrollBarWidth =
            virtualized.offsetWidth - virtualized.clientWidth;
          const contentWidth =
            parseFloat(getComputedStyle(virtualized).width) - scrollBarWidth;
          const columnsWidth = parseFloat(
            (virtualized.firstElementChild as HTMLElement).style.width
          );
          expect(columnsWidth).to.be.at.most(contentWidth);
        });
      });

      it('settles when the panel is only just tall enough for its rows', function () {
        mountInPanel(width);

        // The loop needs scroll bars that take up space, which headless
        // Chrome hides
        cy.get('.euiDataGrid__virtualized').then(($virtualized) => {
          const virtualized = $virtualized[0];
          virtualized.style.overflowY = 'scroll';
          const scrollBarWidth =
            virtualized.offsetWidth - virtualized.clientWidth;
          virtualized.style.overflowY = '';
          if (scrollBarWidth === 0) this.skip();
        });

        // Make the rows fit only while there is no horizontal scroll bar
        cy.get('[data-test-subj="panel"]').then(($panel) => {
          const panel = $panel[0];
          const virtualized = panel.querySelector<HTMLElement>(
            '.euiDataGrid__virtualized'
          )!;
          const contentHeight = (virtualized.firstElementChild as HTMLElement)
            .offsetHeight;
          const chromeHeight = panel.offsetHeight - virtualized.offsetHeight;
          panel.style.height = `${chromeHeight + contentHeight + 4}px`;
        });

        cy.wait(300); // let the layout settle after the resize
        cy.get('[data-test-subj="panel"]')
          .then(($panel) => countStyleChanges($panel[0], 500))
          .should('equal', 0);
      });
    });
  });
});
