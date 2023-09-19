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
import { EuiFieldNumber } from './field_number';

describe('EuiFieldNumber', () => {
  const checkIsValid = () => {
    cy.get('[aria-invalid="true"]').should('not.exist');
    cy.get('.euiFormControlLayoutIcons').should('not.exist');
  };
  const checkIsInvalid = () => {
    cy.get('[aria-invalid="true"]').should('exist');
    cy.get('.euiFormControlLayoutIcons').should('exist');
  };

  describe('isNativelyInvalid', () => {
    it('when the value is not a valid number', () => {
      cy.mount(<EuiFieldNumber />);
      checkIsValid();
      cy.get('input').click().realType('-.');
      checkIsInvalid();
    });

    it('sets invalid state when the value is less than the passed min', () => {
      cy.mount(<EuiFieldNumber min={0} />);
      checkIsValid();
      cy.get('input').click().type('-10');
      checkIsInvalid();
    });

    it('sets invalid state when the value is greater than the passed max', () => {
      cy.mount(<EuiFieldNumber max={100} />);
      checkIsValid();
      cy.get('input').click().type('101');
      checkIsInvalid();
    });

    it('shows invalid state on blur', () => {
      cy.mount(<EuiFieldNumber max={1} value={2} />);
      checkIsValid();
      cy.get('input').click();
      cy.get('body').click('bottomRight');
      checkIsInvalid();
    });
  });

  describe('isStepInvalid', () => {
    const checkHasInvalidMessage = (message: string) => {
      cy.get('input[type="number"]').should(($el) => {
        const inputEl = $el[0] as HTMLInputElement;
        expect(inputEl.validationMessage).to.equal(message);
      });
    };

    it('does not show invalid state on decimal values by default', () => {
      cy.mount(<EuiFieldNumber />);
      checkIsValid();
      cy.get('input').click().type('1.5');
      checkIsValid();
    });

    it('shows invalid state on user input', () => {
      cy.mount(<EuiFieldNumber step={1} />);
      checkIsValid();
      cy.get('input').click().type('1.5');
      cy.get('body').click('bottomRight');
      checkIsInvalid();
      checkHasInvalidMessage(
        'Please enter a valid value. The two nearest valid values are 1 and 2.'
      );
    });

    it('restores valid state when step is corrected', () => {
      cy.mount(<EuiFieldNumber step={3} />);
      checkIsValid();
      cy.get('input').click().type('2');
      checkIsInvalid();
      cy.realType('{backspace}3');
      checkIsValid();
    });

    describe('invalid step/values on mount', () => {
      beforeEach(() => {
        cy.window().then((win) => {
          cy.wrap(cy.spy(win.console, 'warn')).as('spyConsoleWarn');
        });
      });

      it('warns and does not validate step if an invalid step/value combo is passed', () => {
        cy.mount(<EuiFieldNumber step={10} value={5} />);
        checkIsValid();
        cy.get('@spyConsoleWarn').should(
          'be.calledOnceWith',
          'Disabling step validity checking. The passed `step` value does not match the initial component value.'
        );
      });

      it('warns and does not validate step if an invalid step/defaultValue combo is passed', () => {
        cy.mount(<EuiFieldNumber step={3} defaultValue={4} />);
        checkIsValid();

        // Default browser behavior: browsers will automatically adjust the valid internal `step` value
        cy.get('input').click().type('{backspace}2');
        checkIsInvalid();
        checkHasInvalidMessage(
          'Please enter a valid value. The two nearest valid values are 1 and 4.'
        );
        cy.get('input').click().type('{backspace}7');
        checkIsValid();

        // Console warn should only have been called once on mount
        cy.get('@spyConsoleWarn').should(
          'be.calledOnceWith',
          'Disabling step validity checking. The passed `step` value does not match the initial component value.'
        );
      });
    });
  });
});
