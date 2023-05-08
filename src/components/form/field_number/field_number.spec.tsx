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

    it('shows invalid state on blur', () => {
      cy.mount(<EuiFieldNumber max={1} value={2} />);
      checkIsValid();
      cy.get('input').click();
      cy.get('body').click('bottomRight');
      checkIsInvalid();
    });

    it('does not show invalid state on decimal values by default', () => {
      cy.mount(<EuiFieldNumber />);
      checkIsValid();
      cy.get('input').click().type('1.5');
      checkIsValid();
    });
  });
});
