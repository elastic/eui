/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';

import { EuiContextMenu } from './context_menu';
import { EuiContextMenuItem } from './context_menu_item';
import { EuiContextMenuPanel } from './context_menu_panel';

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

describe('EuiContextMenuPanel', () => {
  describe('Focus behavior', () => {
    it('is set on the first focusable element by default if there are no items and hasFocus is true', () => {
      cy.mount(
        <EuiContextMenuPanel>
          <button data-test-subj="button">Hello world</button>
        </EuiContextMenuPanel>
      );
      cy.focused().should('have.attr', 'data-test-subj', 'button');
    });
  });

  describe('Keyboard navigation of items', () => {
    describe('Up/down keys', () => {
      beforeEach(() => {
        cy.mount(<EuiContextMenuPanel items={items} />);
      });

      it('focuses the panel by default', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
      });

      it('down arrow key focuses the first menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, down arrow key focuses the next menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.repeatRealPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('up arrow key wraps to last menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.realPress('{uparrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      });

      it('down arrow key wraps to first menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.repeatRealPress('{downarrow}', 4);
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, up arrow key focuses the previous menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.repeatRealPress('{uparrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });
    });

    describe('Left/right arrow keys', () => {
      it("right arrow key shows next panel with focused item's index", () => {
        const showNextPanelHandler = cy.stub();
        cy.mount(
          <EuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
          />
        );
        cy.realPress('{downarrow}');
        cy.realPress('{rightarrow}').then(() => {
          expect(showNextPanelHandler).to.be.called;
        });
      });

      it('left arrow key shows previous panel', () => {
        const showPreviousPanelHandler = cy.stub();
        cy.mount(
          <EuiContextMenuPanel
            items={items}
            showPreviousPanel={showPreviousPanelHandler}
          />
        );
        cy.realPress('{downarrow}');
        cy.realPress('{leftarrow}').then(() => {
          expect(showPreviousPanelHandler).to.be.called;
        });
      });

      it('does not lose focus while using left/right arrow navigation between panels', () => {
        const panels = [
          {
            id: 0,
            title: 'First panel',
            items: [
              {
                name: 'Go to second panel',
                panel: 1,
                'data-test-subj': 'itemA',
              },
            ],
          },
          {
            id: 1,
            title: 'Second panel',
            items: [
              {
                name: 'Go to third panel',
                panel: 2,
                'data-test-subj': 'itemB',
              },
            ],
            initialFocusedItemIndex: 0,
          },
          {
            id: 2,
            title: 'Third panel',
            items: [
              {
                name: 'End',
                'data-test-subj': 'itemC',
              },
            ],
            initialFocusedItemIndex: 0,
          },
        ];
        cy.mount(<EuiContextMenu panels={panels} initialPanelId={0} />);
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
        cy.realPress('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
        cy.realPress('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');

        // Test extremely rapid left/right arrow usage
        cy.repeatRealPress('{leftarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
        cy.repeatRealPress('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
        cy.repeatRealPress('{leftarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });
    });

    describe('tab key', () => {
      beforeEach(() => {
        cy.mount(<EuiContextMenuPanel items={items} />);
      });

      it('tab key focuses the first menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, tab key focuses the next menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.repeatRealPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('shift+tab key focuses the previous menu item', () => {
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
        cy.repeatRealPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });
    });
  });

  describe('Automated accessibility check', () => {
    it('has zero violations', () => {
      const showNextPanelHandler = cy.stub();
      cy.mount(
        <EuiContextMenuPanel
          items={items}
          showNextPanel={showNextPanelHandler}
        />
      );
      cy.checkAxe();
    });
  });
});
