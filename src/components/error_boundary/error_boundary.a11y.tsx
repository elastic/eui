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
import { EuiErrorBoundary } from './error_boundary';
import { EuiSpacer } from '../spacer';

const handleFocus = () => {
  const target = document.querySelector(
    'pre.euiCodeBlock__pre'
  ) as HTMLPreElement;
  target!.focus();
};

describe('EuiErrorBoundary', () => {
  describe('Automated accessibility check when an error is thrown', () => {
    const BadComponent = () => {
      throw new Error('Throw the error.');
    };

    beforeEach(() => {
      cy.on('uncaught:exception', (err) => {
        if (err.message.includes('Throw the error')) {
          return false;
        }
      });

      cy.viewport(1024, 768); // medium breakpoint
      cy.realMount(
        <>
          <EuiButton
            color="primary"
            onClick={handleFocus}
            data-test-subj="cy-error-boundary-button"
          >
            Press to focus
          </EuiButton>
          <EuiSpacer />
          <EuiErrorBoundary>
            <BadComponent />
          </EuiErrorBoundary>
        </>
      );
    });

    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations and accepts focus when the button is pressed', () => {
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('pre.euiCodeBlock__pre').should('have.focus');
      cy.checkAxe();
    });
  });

  describe('Automated accessibility check when no error is thrown', () => {
    const GoodComponent = () => (
      <div data-test-subj="cy-good-component">
        This is a properly rendered component.
      </div>
    );

    beforeEach(() => {
      cy.viewport(1024, 768); // medium breakpoint
      cy.realMount(
        <EuiErrorBoundary>
          <GoodComponent />
        </EuiErrorBoundary>
      );
    });

    it('has zero violations when no violations are thrown', () => {
      cy.get('div[data-test-subj="cy-good-component"]').should('exist');
      cy.checkAxe();
    });
  });
});
