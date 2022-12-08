/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiButton } from '../button';
import { EuiErrorBoundary } from './error_boundary';
import { EuiSpacer } from '../spacer';

const BadComponent = () => {
  throw new Error('Throw the error.');
};

const handleFocus = () => {
  const target = document.querySelector(
    'pre.euiCodeBlock__pre'
  ) as HTMLPreElement;
  target!.focus();
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

describe('EuiErrorBoundary', () => {
  describe('Automated accessibility check', () => {
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
});
