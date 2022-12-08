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
import { EuiEmptyPrompt } from './empty_prompt';
import { EuiLink } from '../link';
import { EuiTitle } from '../title';

const EmptyPrompt = ({ addCaseSpy, addLinkSpy }) => {
  return (
    <EuiEmptyPrompt
      iconType="logoSecurity"
      title={<h2>Start adding cases</h2>}
      body={<p>Add a new case or change your filter settings.</p>}
      actions={
        <EuiButton color="primary" onClick={addCaseSpy} fill>
          Add a case
        </EuiButton>
      }
      footer={
        <>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <EuiLink href="#" onClick={addLinkSpy}>
            Read the docs
          </EuiLink>
        </>
      }
    />
  );
};

beforeEach(() => {
  const addCaseSpy = cy.spy().as('addCaseSpy');
  const addLinkSpy = cy.spy().as('addLinkSpy');
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<EmptyPrompt addCaseSpy={addCaseSpy} addLinkSpy={addLinkSpy} />);
});

describe('EuiEmptyPrompt', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations after clicking Add a case button', () => {
      cy.get('button.euiButton').contains('Add a case').realClick();
      cy.get('@addCaseSpy').should('have.been.called');
      cy.checkAxe();
    });

    it('has zero violations after clicking Read the docs link', () => {
      cy.get('a.euiLink').contains('Read the docs').realClick();
      cy.get('@addLinkSpy').should('have.been.called');
      cy.checkAxe();
    });
  });
});
