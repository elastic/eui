/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useRef } from 'react';
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
      const buttonRef = useRef();
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
});
