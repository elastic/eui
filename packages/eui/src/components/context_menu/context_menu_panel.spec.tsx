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

import React, { useState } from 'react';

import { EuiPopover } from '../popover';
import { EuiContextMenu } from './context_menu';
import { EuiContextMenuItem } from './context_menu_item';
import { EuiContextMenuPanel } from './context_menu_panel';

const items = [
  <EuiContextMenuItem key="A" data-test-subj="itemA" href="#">
    Option A
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="B" data-test-subj="itemB" href="#">
    Option B
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="C" data-test-subj="itemC" href="#">
    Option C
  </EuiContextMenuItem>,
];

const children = (
  <>
    <button data-test-subj="itemA" onClick={() => {}}>
      Item A
    </button>
    <button data-test-subj="itemB" onClick={() => {}}>
      Item B
    </button>
    <button data-test-subj="itemC" onClick={() => {}}>
      Item C
    </button>
  </>
);

describe('EuiContextMenuPanel', () => {
  describe('Focus behavior', () => {
    it('focuses the panel by default', () => {
      cy.mount(<EuiContextMenuPanel>{children}</EuiContextMenuPanel>);
      cy.focused().should('have.class', 'euiContextMenuPanel');
    });

    describe('with `children`', () => {
      it('ignores arrow key navigation, which only toggles for `items`', () => {
        cy.mount(<EuiContextMenuPanel>{children}</EuiContextMenuPanel>);
        cy.realPress('{downarrow}');
        cy.focused().should('have.class', 'euiContextMenuPanel');
      });
    });

    describe('with `items`', () => {
      it('sets initial focus from `initialFocusedItemIndex`', () => {
        cy.mount(
          <EuiContextMenuPanel items={items} initialFocusedItemIndex={2} />
        );
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      });

      it('falls back to the panel if given an invalid `focusedItemIndex`', () => {
        cy.mount(
          <EuiContextMenuPanel items={items} initialFocusedItemIndex={99} />
        );
        cy.focused().should('have.class', 'euiContextMenuPanel');
      });

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
        cy.get('.euiContextMenuPanel').should('be.focused');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('correctly re-finds navigable menu items if `items` changes', () => {
        const DynanicItemsTest = () => {
          const [dynamicItems, setDynamicItems] = useState([
            items[0],
            items[1],
          ]);
          const appendItems = () => setDynamicItems(items);
          return (
            <>
              <EuiContextMenuPanel items={dynamicItems} />
              <button data-test-subj="appendItems" onClick={appendItems}>
                Append more items
              </button>
            </>
          );
        };
        cy.mount(<DynanicItemsTest />);
        cy.get('.euiContextMenuPanel').should('be.focused');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');

        cy.get('[data-test-subj="appendItems"]').click();
        cy.get('[data-test-subj="itemA"]').click();
        cy.realPress('{uparrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      });
    });

    describe('with `panels`', () => {
      const panels = [
        {
          id: 'A',
          title: 'Panel A',
          items: [
            { name: 'Lorem', href: '#' },
            { name: 'Go to Panel B', panel: 'B', 'data-test-subj': 'panelA' },
            { name: 'Ipsum', href: '#' },
          ],
        },
        {
          id: 'B',
          title: 'Panel B',
          items: [
            { name: 'Go to Panel C', panel: 'C', 'data-test-subj': 'panelB' },
            { name: 'Lorem', href: '#' },
            { name: 'Ipsum', href: '#' },
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
        cy.get('.euiContextMenuPanel').should('be.focused');
        cy.realPress('{downarrow}');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelA');
        cy.realPress('{rightarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelB'); // has initialFocusedItemIndex
        cy.realPress('{rightarrow}');
        cy.focused().should('have.class', 'euiContextMenuPanel__title');
      });

      it('focuses the correct toggling item when using the left arrow key to navigate to the previous panel', () => {
        cy.mount(<EuiContextMenu panels={panels} initialPanelId="B" />);
        cy.get('[data-test-subj="panelB"]').should('be.focused');
        cy.realPress('{leftarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'panelA');
      });
    });

    describe('within an EuiPopover', () => {
      const ContextMenuInPopover: React.FC<any> = ({ children, ...rest }) => {
        const [isOpen, setIsOpen] = useState(false);
        const closePopover = () => setIsOpen(false);
        const openPopover = () => setIsOpen(true);
        return (
          <EuiPopover
            isOpen={isOpen}
            closePopover={closePopover}
            button={
              <button data-test-subj="popoverToggle" onClick={openPopover}>
                Toggle popover
              </button>
            }
            {...rest}
          >
            <EuiContextMenuPanel>
              {children}
              <button onClick={closePopover}>
                Closes popover from context menu
              </button>
            </EuiContextMenuPanel>
          </EuiPopover>
        );
      };

      const mountAndOpenPopover = (component = <ContextMenuInPopover />) => {
        cy.realMount(component);
        cy.get('[data-test-subj="popoverToggle"]').click();
        cy.wait(350); // EuiPopover's initial/autoFocus takes ~350ms to run
      };

      it('reclaims focus from the parent popover panel', () => {
        mountAndOpenPopover();
        cy.focused().should('not.have.class', 'euiPopover__panel');
        cy.focused().should('have.class', 'euiContextMenuPanel');
      });

      it('does not hijack focus from the EuiPopover if `initialFocus` is set', () => {
        mountAndOpenPopover(
          <ContextMenuInPopover initialFocus="#testInitialFocus">
            <input id="testInitialFocus" />
          </ContextMenuInPopover>
        );
        cy.focused().should('not.class', 'euiContextMenuPanel');
        cy.focused().should('have.attr', 'id', 'testInitialFocus');
      });

      it('restores focus to the toggling button on popover close', () => {
        mountAndOpenPopover();
        cy.realPress('Tab');
        cy.realPress('Enter');
        cy.focused().should('have.attr', 'data-test-subj', 'popoverToggle');
      });

      it('restores focus to the toggling button on popover escape key', () => {
        mountAndOpenPopover();
        cy.realPress('{esc}');
        cy.focused().should('have.attr', 'data-test-subj', 'popoverToggle');
      });
    });

    describe('disabling auto focus', () => {
      it('does not focus anything if initialFocusedItemIndex is set to -1', () => {
        cy.mount(
          <EuiContextMenuPanel initialFocusedItemIndex={-1}>
            {children}
          </EuiContextMenuPanel>
        );
        cy.focused().should('not.exist');
      });

      it('does not focus the back button if it exists', () => {
        cy.mount(
          <EuiContextMenuPanel
            initialFocusedItemIndex={-1}
            onClose={() => {}}
            title="Test"
            items={items}
          />
        );
        cy.focused().should('not.exist');
      });

      it('still allows for manually tabbing to the panel and using up/down key navigation', () => {
        cy.realMount(
          <EuiContextMenuPanel initialFocusedItemIndex={-1} items={items} />
        );
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('other children with `autoFocus` should take focus', () => {
        cy.mount(
          <EuiContextMenuPanel
            initialFocusedItemIndex={-1}
            items={[
              ...items,
              <input type="text" value="Auto focus test" autoFocus />,
            ]}
          />
        );
        cy.focused().should('have.value', 'Auto focus test');
      });
    });
  });

  describe('Keyboard navigation of items', () => {
    describe('Up/down keys', () => {
      beforeEach(() => {
        cy.mount(<EuiContextMenuPanel items={items} />);
      });

      it('focuses the panel by default', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
      });

      it('down arrow key focuses the first menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.realPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, down arrow key focuses the next menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.repeatRealPress('{downarrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('up arrow key wraps to last menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.realPress('{uparrow}');
        cy.focused().should('have.attr', 'data-test-subj', 'itemC');
      });

      it('down arrow key wraps to first menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.repeatRealPress('{downarrow}', 4);
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, up arrow key focuses the previous menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
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

      describe('panels', () => {
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
                href: '#',
                'data-test-subj': 'itemC',
              },
            ],
            initialFocusedItemIndex: 0,
          },
        ];

        const FLAKY_WAIT = 200; // For some reason CI is flaking on these two tests in way that is hard to repro locally

        it('does not lose focus while using left/right arrow navigation between panels', () => {
          cy.mount(<EuiContextMenu panels={panels} initialPanelId={0} />);
          cy.wait(FLAKY_WAIT);
          cy.realPress('{downarrow}');
          cy.focused().should('have.attr', 'data-test-subj', 'itemA');
          cy.realPress('{rightarrow}');
          cy.wait(FLAKY_WAIT);
          cy.focused().should('have.attr', 'data-test-subj', 'itemB');
          cy.realPress('{rightarrow}');
          cy.wait(FLAKY_WAIT);
          cy.focused().should('have.attr', 'data-test-subj', 'itemC');
        });

        it('does not lose focus when inside an EuiPopover and during rapid left/right arrow usage', () => {
          cy.mount(
            <EuiPopover isOpen={true} button={<button />}>
              <EuiContextMenu panels={panels} initialPanelId={0} />
            </EuiPopover>
          );
          cy.wait(350); // Wait for EuiContextMenuPanel to reclaim focus from popover
          cy.realPress('{downarrow}');
          cy.focused().should('have.attr', 'data-test-subj', 'itemA');
          cy.repeatRealPress('{rightarrow}');
          cy.wait(FLAKY_WAIT);
          cy.focused().should('have.attr', 'data-test-subj', 'itemC');
          cy.repeatRealPress('{leftarrow}');
          cy.wait(FLAKY_WAIT);
          cy.focused().should('have.attr', 'data-test-subj', 'itemA');
        });
      });
    });

    describe('tab key', () => {
      beforeEach(() => {
        cy.mount(<EuiContextMenuPanel items={items} />);
      });

      it('tab key focuses the first menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.realPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });

      it('subsequently, tab key focuses the next menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.repeatRealPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
      });

      it('shift+tab key focuses the previous menu item', () => {
        cy.focused().should('have.class', 'euiContextMenuPanel');
        cy.repeatRealPress('Tab');
        cy.focused().should('have.attr', 'data-test-subj', 'itemB');
        cy.realPress(['Shift', 'Tab']);
        cy.focused().should('have.attr', 'data-test-subj', 'itemA');
      });
    });
  });
});
