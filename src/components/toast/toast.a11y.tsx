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
import { EuiButton } from '../button';
import { EuiToast } from './toast';

describe('EuiToast', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
  });

  describe('Automated accessibility check', () => {
    it('renders with default props', () => {
      cy.mount(
        <div style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          <EuiToast title="Generic toast">
            <p>This is a generic toast message. It is read-only.</p>
          </EuiToast>
        </div>
      );
      cy.checkAxe();
    });
  });

  describe('Keyboard and screen reader accessibility', () => {
    it('renders with autoFocus', () => {
      const toastActionSpy = cy.spy().as('toastActionSpy');
      cy.mount(
        <div style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          <EuiToast title="Actionable toast" onClose={() => {}} isAutoFocused>
            <>
              <p>This is a security measure.</p>
              <p>
                Please click the button below or move your mouse to show that
                you&rsquo;re still using Kibana.
              </p>
              <EuiButton
                data-test-subj="toastActionButton"
                onClick={toastActionSpy}
              >
                Extend my session
              </EuiButton>
            </>
          </EuiToast>
        </div>
      );
      cy.get('[data-test-subj="toastCloseButton"]').should('have.focus');
      cy.realPress('Tab');
      cy.get('[data-test-subj="toastActionButton"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('@toastActionSpy').should('have.been.called');
      cy.checkAxe();
    });
  });
});
