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

import { EuiCollapsibleNav } from './collapsible_nav';
import { EuiHeader, EuiHeaderSectionItemButton } from '../header';
import { EuiIcon } from '../icon';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EuiHeader
      style={{ zIndex: 1001 }}
      position="fixed"
      sections={[
        {
          items: [
            <EuiCollapsibleNav
              style={{ top: 48 }}
              id="navSpec"
              isOpen={isOpen}
              button={
                <EuiHeaderSectionItemButton
                  data-test-subj="navSpecButton"
                  aria-label="Toggle main navigation"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <EuiIcon type={'menu'} size="m" aria-hidden="true" />
                </EuiHeaderSectionItemButton>
              }
              onClose={() => setIsOpen(false)}
            >
              <button data-test-subj="itemA">Item A</button>
              <button data-test-subj="itemB">Item B</button>
              <button data-test-subj="itemC">Item C</button>
              <input data-test-subj="itemD" />
            </EuiCollapsibleNav>,
          ],
        },
      ]}
    />
  );
};

describe('EuiCollapsibleNav', () => {
  describe('Elastic pattern', () => {
    describe('Toggle button behavior', () => {
      it('opens and closes nav when the main button is clicked', () => {
        cy.realMount(<Nav />);
        cy.get('[data-test-subj="navSpecButton"]').realClick();
        expect(cy.get('#navSpec').should('exist'));
        cy.get('[data-test-subj="navSpecButton"]').realClick();
        expect(cy.get('#navSpec').should('not.exist'));
      });

      it('closes the nav when the overlay mask is clicked', () => {
        cy.realMount(<Nav />);
        cy.get('[data-test-subj="navSpecButton"]').realClick();
        cy.get('.euiOverlayMask').realClick({ position: 'bottomRight' });
        expect(cy.get('#navSpec').should('not.exist'));
      });

      it('closes the nav when the close button is clicked', () => {
        cy.realMount(<Nav />);
        cy.get('[data-test-subj="navSpecButton"]').realClick();
        cy.get('[data-test-subj="euiFlyoutCloseButton"]').click({
          force: true,
        });
        expect(cy.get('#navSpec').should('not.exist'));
      });
    });
  });
});
