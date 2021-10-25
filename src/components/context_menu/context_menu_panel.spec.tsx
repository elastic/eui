/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from '@cypress/react';

import { EuiContextMenuItem } from './context_menu_item';
import { EuiContextMenuPanel } from './context_menu_panel';

describe('EuiContextMenuPanel', () => {
  describe('focus behavior', () => {
    it('is set on the first focusable element by default if there are no items and hasFocus is true', () => {
      mount(
        <EuiContextMenuPanel>
          <button data-test-subj="button">Hello world</button>
        </EuiContextMenuPanel>
      );

      cy.focused().should('have.attr', 'data-test-subj', 'button');
    });

    it('is not set on anything if hasFocus is false', () => {
      mount(
        <EuiContextMenuPanel hasFocus={false}>
          <button data-test-subj="button">Hello world</button>
        </EuiContextMenuPanel>
      );

      cy.focused().should('not.exist');
    });
  });

  describe('keyboard navigation of items', () => {
    const items = [
      <EuiContextMenuItem key="A" data-test-subj="itemA">
        Option A
      </EuiContextMenuItem>,
      <EuiContextMenuItem key="B" data-test-subj="itemB">
        Option B
      </EuiContextMenuItem>,
      <EuiContextMenuItem key="C" data-test-subj="itemC">
        Option C
      </EuiContextMenuItem>,
    ];

    // Intermittent flake workaround: without this, the first downarrow key does not always focus into the menu items as expected
    const FLAKE_WAIT = 200;

    describe('up/down keys', () => {
      beforeEach(() => {
        mount(<EuiContextMenuPanel items={items} />);
        cy.wait(FLAKE_WAIT);
      });

      it('focuses the panel by default', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
      });

      it('down arrow key focuses the first menu item', () => {
        cy.get('body').type('{downarrow}');

        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, down arrow key focuses the next menu item', () => {
        cy.get('body').type('{downarrow}');
        cy.get('body').type('{downarrow}');

        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('up arrow key wraps to last menu item', () => {
        cy.get('body').type('{uparrow}');

        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      });

      it('down arrow key wraps to first menu item', () => {
        cy.get('body').type('{uparrow}');
        cy.get('body').type('{downarrow}');

        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, up arrow key focuses the previous menu item', () => {
        cy.get('body').type('{uparrow}');
        cy.get('body').type('{uparrow}');

        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });
    });

    describe('left/right arrow keys', () => {
      it("right arrow key shows next panel with focused item's index", () => {
        const showNextPanelHandler = cy.stub();
        mount(
          <EuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
          />
        );
        cy.wait(FLAKE_WAIT);

        cy.get('body')
          .type('{downarrow}')
          .type('{rightarrow}')
          .then(() => {
            expect(showNextPanelHandler).to.be.called;
          });
      });

      it('left arrow key shows previous panel', () => {
        const showPreviousPanelHandler = cy.stub();
        mount(
          <EuiContextMenuPanel
            items={items}
            showPreviousPanel={showPreviousPanelHandler}
          />
        );
        cy.wait(FLAKE_WAIT);

        cy.get('body')
          .type('{downarrow}')
          .type('{leftarrow}')
          .then(() => {
            expect(showPreviousPanelHandler).to.be.called;
          });
      });
    });
  });
});
