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

import React, { useState } from 'react';

import { EuiFieldNumber } from './field_number';

describe('EuiFieldNumber', () => {
  describe('isNativelyInvalid', () => {
    const checkIsValid = () => {
      cy.get('[aria-invalid="true"]').should('not.exist');
      cy.get('.euiFormControlLayoutIcons').should('not.exist');
    };
    const checkIsInvalid = () => {
      cy.get('[aria-invalid="true"]').should('exist');
      cy.get('.euiFormControlLayoutIcons').should('exist');
    };

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

    it('sets invalid state when the value is not a valid step', () => {
      cy.mount(<EuiFieldNumber step={3} />);
      checkIsValid();
      cy.get('input').click().type('2');
      checkIsInvalid();
    });

    it('does not show invalid state on decimal values by default', () => {
      cy.mount(<EuiFieldNumber />);
      checkIsValid();
      cy.get('input').click().type('1.5');
      checkIsValid();
    });

    it('checks/updates invalid state for controlled components', () => {
      const ControlledEuiFieldNumber = () => {
        const [value, setValue] = useState('0');
        return (
          <>
            <EuiFieldNumber
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min={0}
              max={5}
            />
            <button id="setToInvalidValue" onClick={() => setValue('10')}>
              Set to invalid value
            </button>
            <button id="setToValidValue" onClick={() => setValue('3')}>
              Set to valid value
            </button>
          </>
        );
      };
      cy.mount(<ControlledEuiFieldNumber />);
      checkIsValid();

      // Controlled value changes should work as expected
      cy.get('#setToInvalidValue').click();
      checkIsInvalid();
      cy.get('#setToValidValue').click();
      checkIsValid();

      // (regression test) User input changes should still work as expected w/ onChange
      cy.get('input').clear().type('-2');
      checkIsInvalid();
      cy.get('input').clear().type('2');
      checkIsValid();
    });

    describe('checks/updates invalid state when props that would affect validity change', () => {
      it('min', () => {
        const UpdatedEuiFieldNumber = () => {
          const [min, setMin] = useState<number | undefined>();
          return (
            <>
              <EuiFieldNumber min={min} />
              <button id="setInvalidMin" onClick={() => setMin(100)}>
                Set invalid min
              </button>
              <button id="setValidMin" onClick={() => setMin(0)}>
                Change valid min
              </button>
            </>
          );
        };
        cy.mount(<UpdatedEuiFieldNumber />);
        cy.get('input').type('1');
        checkIsValid();

        cy.get('#setInvalidMin').click();
        checkIsInvalid();
        cy.get('#setValidMin').click();
        checkIsValid();
      });

      it('max', () => {
        const UpdatedEuiFieldNumber = () => {
          const [max, setMax] = useState<number | undefined>();
          return (
            <>
              <EuiFieldNumber max={max} />
              <button id="setInvalidMax" onClick={() => setMax(0)}>
                Set invalid max
              </button>
              <button id="setValidMax" onClick={() => setMax(10)}>
                Change valid max
              </button>
            </>
          );
        };
        cy.mount(<UpdatedEuiFieldNumber />);
        cy.get('input').type('1');
        checkIsValid();

        cy.get('#setInvalidMax').click();
        checkIsInvalid();
        cy.get('#setValidMax').click();
        checkIsValid();
      });

      it('step', () => {
        const UpdatedEuiFieldNumber = () => {
          const [step, setStep] = useState<number | undefined>();
          return (
            <>
              <EuiFieldNumber step={step} />
              <button id="setInvalidStep" onClick={() => setStep(1.5)}>
                Set invalid step
              </button>
              <button id="setValidStep" onClick={() => setStep(1)}>
                Change valid step
              </button>
            </>
          );
        };
        cy.mount(<UpdatedEuiFieldNumber />);
        cy.get('input').type('1');
        checkIsValid();

        cy.get('#setInvalidStep').click();
        checkIsInvalid();
        cy.get('#setValidStep').click();
        checkIsValid();
      });
    });
  });
});
