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
      cy.realPress(['Shift', 'Tab']);
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
      cy.realPress('Space');
      cy.focused().invoke('attr', 'aria-expanded').should('equal', 'false');
    });
  });

  describe('focus management', () => {
    const expectChildrenIsFocused = () => {
      cy.focused()
        .should('have.class', 'euiAccordion__childWrapper')
        .should('have.attr', 'tabindex', '-1');
    };

    it('focuses the accordion content when the arrow is clicked', () => {
      cy.realMount(<EuiAccordion {...sharedProps} />);
      cy.get('.euiAccordion__arrow').realClick();
      expectChildrenIsFocused();
    });

    it('focuses the accordion content when the button is clicked', () => {
      cy.realMount(<EuiAccordion {...sharedProps} />);
      cy.realPress('Tab');
      cy.focused().contains('Click me to toggle').realPress('Enter');
      expectChildrenIsFocused();
    });

    describe('forceState', () => {
      it('does not focus the accordion when `forceState` prevents the accordion from opening', () => {
        cy.realMount(<EuiAccordion {...sharedProps} forceState="closed" />);

        cy.contains('Click me to toggle').realClick();
        // cy.focused() is flaky here and doesn't always return an element, so use document.activeElement instead
        cy.then(() => {
          expect(document.activeElement).not.to.have.class(
            'euiAccordion__childWrapper'
          );
        });
      });

      it('does not focus the accordion when programmatically toggled from outside the accordion', () => {
        const ControlledComponent = () => {
          const [accordionOpen, setAccordionOpen] = useState(false);
          return (
            <>
              <button
                data-test-subj="toggleForceState"
                onClick={() => setAccordionOpen(!accordionOpen)}
              >
                Control accordion
              </button>
              <EuiAccordion
                {...sharedProps}
                forceState={accordionOpen ? 'open' : 'closed'}
              />
            </>
          );
        };
        cy.realMount(<ControlledComponent />);

        cy.get('[data-test-subj="toggleForceState"]').realClick();
        cy.focused()
          .should('not.have.class', 'euiAccordion__childWrapper')
          .should('have.attr', 'data-test-subj', 'toggleForceState');
      });

      it('attempts to focus the accordion children when `onToggle` controls `forceState`', () => {
        const ControlledComponent = () => {
          const [accordionOpen, setAccordionOpen] = useState(false);
          return (
            <EuiAccordion
              {...sharedProps}
              onToggle={(open) => setAccordionOpen(open)}
              forceState={accordionOpen ? 'open' : 'closed'}
            />
          );
        };
        cy.realMount(<ControlledComponent />);

        cy.contains('Click me to toggle').realClick();
        expectChildrenIsFocused();
      });
    });
  });
});
