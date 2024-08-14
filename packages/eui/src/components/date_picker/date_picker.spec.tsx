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

import React from 'react';

import { EuiDatePicker } from './date_picker';

describe('EuiDatePicker', () => {
  describe('inline', () => {
    // TODO: These might be better as storybook/visual snapshot tests

    it('renders a calendar inline', () => {
      cy.realMount(<EuiDatePicker inline />);

      cy.get('[class*="euiDatePicker-inline-shadow"').should('exist');
      cy.get('.react-datepicker').should('exist');

      cy.realPress('Tab');
      cy.focused().should(
        'have.class',
        'react-datepicker__navigation--previous'
      );
    });

    it('renders without a shadow', () => {
      cy.realMount(<EuiDatePicker inline shadow={false} />);

      cy.get('[class*="euiDatePicker-inline"').should('exist');
      cy.get('[class*="euiDatePicker-inline-shadow"').should('not.exist');
    });

    it('renders form control icons below the date picker', () => {
      cy.realMount(<EuiDatePicker inline isLoading isInvalid />);

      cy.get('.euiFormControlLayoutIcons')
        .invoke('attr', 'class')
        .should('contain', 'euiFormControlLayoutIcons-static');
    });

    it('renders as disabled', () => {
      cy.realMount(<EuiDatePicker inline disabled />);

      cy.get('.euiFormControlLayout-isDisabled').should('exist');

      cy.realPress('Tab');
      cy.focused().should('not.exist');
    });

    it('renders as readonly', () => {
      cy.realMount(<EuiDatePicker inline readOnly />);

      cy.get('.euiFormControlLayout-readOnly').should('exist');

      cy.realPress('Tab');
      cy.focused().should('not.exist');
    });
  });
});
