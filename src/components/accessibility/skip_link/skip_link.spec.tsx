/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React from 'react';
import { EuiSkipLink } from './';

describe('EuiSkipLink', () => {
  describe('overrideLinkBehavior', () => {
    describe('focus/tab behavior', () => {
      it('manually focuses the target element', () => {
        cy.realMount(
          <div>
            <EuiSkipLink
              destinationId="start-of-content"
              overrideLinkBehavior
            />
            <main id="start-of-content">Hello world</main>
          </div>
        );

        cy.realPress('Tab');
        cy.focused().should('have.class', 'euiSkipLink');

        cy.realPress('Enter');
        cy.focused().should('have.id', 'start-of-content');
      });

      it('removes the manual tabindex on the target element after the user moves away from it', () => {
        cy.realMount(
          <div>
            <EuiSkipLink
              destinationId="start-of-content"
              overrideLinkBehavior
            />
            <main id="start-of-content">
              Hello world
              <button id="button">Next focus</button>
            </main>
          </div>
        );
        cy.realPress('Tab');
        cy.realPress('Enter');

        cy.focused()
          .should('have.id', 'start-of-content')
          .should('have.attr', 'tabindex', '-1');

        cy.realPress('Tab');

        cy.focused().should('have.id', 'button');
        cy.get('#start-of-content').should('not.have.attr', 'tabindex');
      });

      it('does not add tabindex -1 to target elements that are already tabbable', () => {
        cy.realMount(
          <div>
            <EuiSkipLink destinationId="button" overrideLinkBehavior />
            <button id="button">Button</button>

            <EuiSkipLink destinationId="negativeOne" overrideLinkBehavior />
            <div id="negativeOne" tabIndex={0}>
              tabIndex -1
            </div>
          </div>
        );

        cy.realPress('Tab');
        cy.realPress('Enter');
        cy.focused()
          .should('have.id', 'button')
          .should('not.have.attr', 'tabindex', '-1');

        cy.realPress('Tab');
        cy.realPress('Enter');
        cy.focused()
          .should('have.id', 'negativeOne')
          .should('have.attr', 'tabindex', '0');
      });
    });
  });
});
