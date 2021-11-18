/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from '@cypress/react';
import { EuiFocusTrap } from './focus_trap';
import { EuiPortal } from '../portal';

describe('EuiFocusTrap', () => {
  describe('focus', () => {
    it('is set on the first focusable element by default', () => {
      mount(
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
      mount(
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
      mount(
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
      mount(
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
      mount(
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
      mount(
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
      mount(
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
});
