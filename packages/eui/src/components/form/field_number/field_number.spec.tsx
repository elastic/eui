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

import React, { ChangeEventHandler, useState } from 'react';

import { EuiForm } from '../form';
import { EuiFormRow } from '../form_row';
import { EuiFieldNumber } from './field_number';
import { EuiText } from '../../text';

describe('EuiFieldNumber', () => {
  describe('isNativelyInvalid', () => {
    const checkIsValid = (selector = 'input') => {
      cy.get(selector)
        .then(($el) => ($el[0] as HTMLInputElement).checkValidity())
        .should('be.true');
      cy.get(selector).should('not.have.attr', 'aria-invalid', 'true');
      cy.get(selector)
        .parent()
        .find('.euiFormControlLayoutIcons')
        .should('not.exist');
    };

    const checkIsInvalid = (selector = 'input') => {
      cy.get(selector)
        .then(($el) => ($el[0] as HTMLInputElement).checkValidity())
        .should('be.false');
      cy.get(selector).should('have.attr', 'aria-invalid', 'true');
      cy.get(selector)
        .parent()
        .find('.euiFormControlLayoutIcons')
        .should('exist');
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

      it('isInvalid', () => {
        const FieldNumberValidationComponent = () => {
          const [value1, setValue1] = useState('5');
          const [value2, setValue2] = useState('4');

          const onChange1: ChangeEventHandler<HTMLInputElement> = (e) => {
            const newValue = e.target.value;
            setValue1(newValue);
          };

          const onChange2: ChangeEventHandler<HTMLInputElement> = (e) => {
            const newValue = e.target.value;
            setValue2(newValue);
          };

          const isValue2GreaterThanValue1 = value2 > value1;

          return (
            <EuiForm component="form">
              <EuiFormRow label="Value 1">
                <EuiFieldNumber
                  data-test-subj="value1"
                  placeholder="Placeholder text"
                  value={value1}
                  min={1}
                  onChange={onChange1}
                />
              </EuiFormRow>

              <EuiFormRow isInvalid={isValue2GreaterThanValue1} label="Value 2">
                <>
                  <EuiFieldNumber
                    data-test-subj="value2"
                    isInvalid={isValue2GreaterThanValue1}
                    placeholder="Placeholder text"
                    value={value2}
                    onChange={onChange2}
                  />
                  {isValue2GreaterThanValue1 && (
                    <EuiText color="danger" size="s">
                      value2 should be smaller than value1
                    </EuiText>
                  )}
                </>
              </EuiFormRow>
            </EuiForm>
          );
        };

        const value1Selector = '[data-test-subj="value1"]';
        const value2Selector = '[data-test-subj="value2"]';

        cy.mount(<FieldNumberValidationComponent />);
        checkIsValid(value1Selector);
        checkIsValid(value2Selector);

        // Set `value2` to a value greater than `value1` (5 < 6) => invalid
        cy.get(value2Selector).clear();
        cy.get(value2Selector).focus().realType('6');
        checkIsValid(value1Selector);
        checkIsInvalid(value2Selector);

        // Set `value1` to a value greater than `value2` (6 > 5) => valid
        cy.get(value1Selector).clear();
        cy.get(value1Selector).focus().realType('6');
        checkIsValid(value1Selector);
        checkIsValid(value2Selector);
      });
    });
  });
});
