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

import React, { useRef, useState } from 'react';
import { EuiFocusTrap } from './focus_trap';
import { EuiPortal } from '../portal';

describe('EuiFocusTrap', () => {
  describe('focus', () => {
    it('is set on the first focusable element by default', () => {
      cy.mount(
        <div>
          <input data-test-subj="outside" />
          <EuiFocusTrap>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
        </div>
      );

      cy.focused().should('have.attr', 'data-test-subj', 'input');

      cy.get('input[data-test-subj=input2]').click();
      cy.focused().should('have.attr', 'data-test-subj', 'input2');

      cy.get('input[data-test-subj=outside]').click();
      cy.focused().should('have.attr', 'data-test-subj', 'input2');
    });

    it('will not take focus when `autoFocus` is disabled', () => {
      cy.mount(
        <div>
          <input data-test-subj="outside" />
          <EuiFocusTrap autoFocus={false}>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
        </div>
      );

      cy.focused().should('not.exist');
    });

    it('is set on the element identified by `data-autofocus`', () => {
      cy.mount(
        <div>
          <input data-test-subj="outside" />
          <EuiFocusTrap>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-autofocus data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
        </div>
      );

      cy.focused().should('have.attr', 'data-test-subj', 'input2');
    });
  });

  describe('clickOutsideDisables', () => {
    it('trap remains enabled when false', () => {
      cy.mount(
        <div>
          <EuiFocusTrap>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
          <button data-test-subj="outside">outside the focus trap</button>
        </div>
      );

      // The existence of `data-focus-lock-disabled=false` indicates that the trap is enabled.
      cy.get('[data-focus-lock-disabled=false]');

      cy.get('[data-test-subj=outside]').click();
      // `react-focus-lock` relies on real DOM events to move focus about.
      // Exposed attributes are the most consistent way to attain its state.
      // See https://github.com/theKashey/react-focus-lock/blob/master/_tests/FocusLock.spec.js for the lib in use
      // Trap remains enabled
      cy.get('[data-focus-lock-disabled=false]');
    });

    it('trap remains enabled after internal clicks', () => {
      cy.mount(
        <div>
          <EuiFocusTrap clickOutsideDisables>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
          <button data-test-subj="outside">outside the focus trap</button>
        </div>
      );

      cy.get('[data-focus-lock-disabled=false]');
      cy.get('[data-test-subj=input2]').click();

      // Trap remains enabled
      cy.get('[data-focus-lock-disabled=false]');
    });

    it('trap remains enabled after internal portal clicks', () => {
      cy.mount(
        <div>
          <EuiFocusTrap clickOutsideDisables>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
              <EuiPortal>
                <input data-test-subj="input3" />
              </EuiPortal>
            </div>
          </EuiFocusTrap>
          <button data-test-subj="outside">outside the focus trap</button>
        </div>
      );

      cy.get('[data-focus-lock-disabled=false]');
      cy.get('[data-test-subj=input3]').click();

      // Trap remains enabled
      cy.get('[data-focus-lock-disabled=false]');
    });

    it('trap becomes disabled on outside clicks', () => {
      cy.mount(
        <div>
          <EuiFocusTrap clickOutsideDisables>
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
          <button data-test-subj="outside">outside the focus trap</button>
        </div>
      );

      cy.get('[data-focus-lock-disabled=false]');
      cy.get('[data-test-subj=outside]').click();

      // Trap becomes disabled
      cy.get('[data-focus-lock-disabled=false]').should('not.exist');
    });
  });

  describe('outside click handling', () => {
    const Trap = ({
      onClickOutside,
      shards,
      closeOnMouseup,
    }: {
      onClickOutside?: any;
      shards?: boolean;
      closeOnMouseup?: boolean;
    }) => {
      const buttonRef = useRef(null);
      return (
        <div>
          <EuiFocusTrap
            onClickOutside={onClickOutside}
            shards={shards ? [buttonRef] : []}
            closeOnMouseup={closeOnMouseup}
          >
            <div data-test-subj="container">
              <input data-test-subj="input" />
              <input data-test-subj="input2" />
            </div>
          </EuiFocusTrap>
          <button ref={buttonRef} data-test-subj="outside">
            outside the focus trap
          </button>
          <button data-test-subj="outside2">also outside the focus trap</button>
        </div>
      );
    };

    it('calls the callback on mousedown', () => {
      const onClickOutside = cy.stub();
      cy.mount(<Trap onClickOutside={onClickOutside} />);

      cy.get('[data-test-subj=outside]')
        .realMouseDown()
        .then(() => {
          expect(onClickOutside).to.be.called;
        });
    });

    it('calls the callback on mouseup when using closeOnMouseup', () => {
      const onClickOutside = cy.stub();
      cy.mount(<Trap onClickOutside={onClickOutside} closeOnMouseup />);

      cy.get('[data-test-subj=outside]')
        .realMouseDown()
        .then(() => {
          expect(onClickOutside).to.not.be.called;
        });
      cy.get('[data-test-subj=outside]')
        .click() // real events not  working here
        .then(() => {
          expect(onClickOutside).to.be.called;
        });
    });

    it('does not call the callback if the element is a shard', () => {
      const onClickOutside = cy.stub();
      cy.mount(<Trap onClickOutside={onClickOutside} shards />);

      cy.get('[data-test-subj=outside]')
        .realMouseDown()
        .then(() => {
          expect(onClickOutside).to.not.be.called;
        });
      // But still calls if the element is not a shard
      cy.get('[data-test-subj=outside2]')
        .realMouseDown()
        .then(() => {
          expect(onClickOutside).to.be.called;
        });
    });
  });

  describe('scrollLock', () => {
    // TODO: Use cypress-real-event's `realMouseWheel` API, whenever they release it 🥲
    const scrollSelector = (selector: string) => {
      cy.get(selector).realClick({ position: 'topRight' }).realPress('End');
      cy.wait(500); // Wait a tick to let scroll position update
    };

    // Control test to ensure Cypress isn't just giving us false positives for actual scrollLock tests
    it('does not prevent scrolling on the body if not present', () => {
      cy.realMount(
        <div style={{ height: 2000 }}>
          <EuiFocusTrap>Test</EuiFocusTrap>
        </div>
      );

      scrollSelector('body');
      cy.window().its('scrollY').should('not.equal', 0);
    });

    it('prevents scrolling on the page body', () => {
      cy.realMount(
        <div style={{ height: 2000 }}>
          <EuiFocusTrap scrollLock>Test</EuiFocusTrap>
        </div>
      );

      scrollSelector('body');
      cy.window().its('scrollY').should('equal', 0);
    });

    it('allows nested portals to be scrolled', () => {
      cy.realMount(
        <div>
          <EuiFocusTrap scrollLock>
            Test
            <EuiPortal>
              <div
                data-test-subj="scroll"
                style={{ height: 100, overflow: 'auto' }}
              >
                <div style={{ height: 500 }}>Test</div>
              </div>
            </EuiPortal>
          </EuiFocusTrap>
        </div>
      );

      scrollSelector('[data-test-subj="scroll"]');
      cy.get('[data-test-subj="scroll"]').then(($el) => {
        expect($el[0].scrollTop).not.to.equal(0);
      });
    });

    describe('scrollbar gap', () => {
      const ToggledFocusTrap = (focusTrapProps: any) => {
        const [isFocusTrapOpen, setIsFocusTrapOpen] = useState(false);

        return (
          <div style={{ height: 2000, backgroundColor: '#555' }}>
            <button
              data-test-subj="openFocusTrap"
              onClick={() => setIsFocusTrapOpen(true)}
            >
              Toggle focus trap
            </button>
            {isFocusTrapOpen && (
              <EuiFocusTrap scrollLock {...focusTrapProps}>
                Test
              </EuiFocusTrap>
            )}
          </div>
        );
      };

      // Depending on the machine running these tests, scrollbars might not
      // have a width (e.g. some Mac system settings) - if so, skip them
      const skipIfNoScrollbars = () => {
        cy.window().then((win) => {
          const htmlWidth = Cypress.$('body')[0].scrollWidth;
          const scrollBarWidth = win.innerWidth - htmlWidth;

          if (scrollBarWidth === 0) {
            cy.log('Skipping test - no scrollbars detected');
            // @ts-ignore - this works even if Cypress doesn't type it
            Cypress.mocha.getRunner().suite.ctx.skip();
          }
        });
      };

      it('preserves the scrollbar width when locked', () => {
        cy.realMount(<ToggledFocusTrap />);
        skipIfNoScrollbars();
        cy.get('[data-test-subj="openFocusTrap"]').click();

        cy.get('body').then(($body) => {
          const styles = window.getComputedStyle($body[0]);

          const padding = parseFloat(styles.getPropertyValue('padding-right'));
          expect(padding).to.be.gt(0);

          expect(styles.getPropertyValue('margin-right')).to.equal('0px');
        });
      });

      it('allows customizing gapMode', () => {
        cy.realMount(<ToggledFocusTrap gapMode="margin" />);
        skipIfNoScrollbars();
        cy.get('[data-test-subj="openFocusTrap"]').click();

        cy.get('body').then(($body) => {
          const styles = window.getComputedStyle($body[0]);

          const margin = parseFloat(styles.getPropertyValue('margin-right'));
          expect(margin).to.be.gt(0);

          expect(styles.getPropertyValue('padding-right')).to.equal('0px');
        });
      });
    });
  });
});
