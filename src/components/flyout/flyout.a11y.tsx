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

import { EuiFlyout } from './flyout';
import { EuiButtonEmpty } from '../button';

const childrenDefault = (
  <>
    <button data-test-subj="itemA">Item A</button>
    <button data-test-subj="itemB">Item B</button>
    <button data-test-subj="itemC">Item C</button>
    <input data-test-subj="itemD" />
  </>
);

const Flyout = ({ children = childrenDefault, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClick = () => setIsOpen(!isOpen);

  const button = (
    <EuiButtonEmpty onClick={onButtonClick}>Toggle flyout</EuiButtonEmpty>
  );

  return (
    <div>
      {button}
      {isOpen ? (
        <EuiFlyout
          data-test-subj="flyoutSpec"
          onClose={() => setIsOpen(false)}
          {...rest}
        >
          {children}
        </EuiFlyout>
      ) : null}
    </div>
  );
};

beforeEach(() => {
  cy.mount(<Flyout />);
  cy.get('div.euiFlyout').should('not.exist');
});

describe('EuiFlyout', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on render', () => {
      cy.checkAxe();
    });

    it('has zero violations when flyout is opened', () => {
      cy.get('button.euiButtonEmpty').click();
      cy.get('div.euiFlyout').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when flyout is closed', () => {
      cy.get('button.euiButtonEmpty').click();
      cy.get('div.euiFlyout').should('exist');
      cy.get('button.euiFlyout__closeButton').click();
      cy.get('div.euiFlyout').should('not.exist');
      cy.checkAxe();
    });
  });
});
