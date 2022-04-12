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

const children = (
  <>
    <button data-test-subj="itemA">Item A</button>
    <button data-test-subj="itemB">Item B</button>
    <button data-test-subj="itemC">Item C</button>
  </>
);

describe('EuiContextMenuPanel', () => {
  describe('Focus behavior', () => {
    it('focuses the panel by default', () => {
      cy.mount(<EuiContextMenuPanel>{children}</EuiContextMenuPanel>);
      cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
    });

    it('sets initial focus from `initialFocusedItemIndex`', () => {
      cy.mount(
        <EuiContextMenuPanel initialFocusedItemIndex={2}>
          {children}
        </EuiContextMenuPanel>
      );
      cy.focused().should('have.attr', 'data-test-subj', 'itemC');
    });

    describe('with `children`', () => {
      it('ignores arrow key navigation, which only toggles for `items`', () => {
        cy.mount(<EuiContextMenuPanel>{children}</EuiContextMenuPanel>);
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanel');
      });
    });

    describe('with `items`', () => {
      it('focuses and registers any tabbable child as navigable menu items', () => {
        cy.mount(
          <EuiContextMenuPanel
            items={[
              <button data-test-subj="itemA">A</button>,
              <button data-test-subj="itemB">B</button>,
              <a href="#" data-test-subj="itemC">
                C
              </a>,
            ]}
          />
        );
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });
    });

    describe('with `panels`', () => {
      const panels = [
        {
          id: 'A',
          title: 'Panel A',
          items: [
            { name: 'Lorem' },
            { name: 'Go to Panel B', panel: 'B', 'data-test-subj': 'panelA' },
            { name: 'Ipsum' },
          ],
        },
        {
          id: 'B',
          title: 'Panel B',
          items: [
            { name: 'Go to Panel C', panel: 'C', 'data-test-subj': 'panelB' },
            { name: 'Lorem' },
            { name: 'Ipsum' },
          ],
          initialFocusedItemIndex: 0,
        },
        {
          id: 'C',
          title: 'Panel C',
          content: <>Hello world</>,
        },
      ];

      it('focuses the back button panel title by default when no initialFocusedItemIndex is passed', () => {
        cy.mount(<EuiContextMenu panels={panels} initialPanelId="A" />);
        cy.realPress('{downarrow}');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelA');
        cy.realPress('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelB'); // has initialFocusedItemIndex
        cy.realPress('{rightarrow}');
        cy.focused().should('have.attr', 'class', 'euiContextMenuPanelTitle');
      });

      it('focuses the correct toggling item when using the left arrow key to navigate to the previous panel', () => {
        cy.mount(<EuiContextMenu panels={panels} initialPanelId="B" />);
        cy.realPress('{leftarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelA');
      });
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
            onClose={() => {}}
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
