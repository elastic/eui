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
import { EuiAccordion, EuiAccordionProps } from './index';

const sharedProps: EuiAccordionProps = {
  buttonContent: 'Click me to toggle',
  id: 'cypress-accordion',
  initialIsOpen: false,
  children: (
    <>
      Test accordion content.{' '}
      <a data-test-subj="childLink" href="#">
        Focusable link inside content
      </a>
    </>
  ),
};

describe('EuiAccordion', () => {
  describe('keyboard and screen reader accessibility', () => {
    it('does not tab to the arrow if the button is interactive', () => {
      cy.realMount(<EuiAccordion {...sharedProps} initialIsOpen={true} />);
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle');
      cy.realPress('Tab');
      cy.focused().contains('Focusable link inside content');
    });

    it('does tab to the arrow if the button is not interactive', () => {
      cy.realMount(<EuiAccordion {...sharedProps} buttonElement="div" />);
      cy.realPress('Tab');
      cy.focused().should('have.class', 'euiAccordion__arrow');
    });

    it('opens and closes the accordion on keypress', () => {
      cy.realMount(<EuiAccordion {...sharedProps} />);
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
      cy.realPress('Space');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'false');
    });
  });

  // Note: we used to move focus automatically to the accordion contents on open/
  // toggle button click, but we no longer do so after receiving a11y audit feedback
  // that the change of context was confusing/not helpful
  it('maintains focus on the toggle button when opened', () => {
    cy.realMount(<EuiAccordion {...sharedProps} />);
    cy.get('.euiAccordion__button').realClick();
    cy.focused().should('have.class', 'euiAccordion__button');
  });
});
