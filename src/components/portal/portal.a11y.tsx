/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiButton } from '../button';
import { EuiPortal } from './portal';

const Portal = () => {
  const [isCustomFlyoutVisible, setIsCustomFlyoutVisible] = useState(false);

  const toggleCustomFlyout = () => {
    setIsCustomFlyoutVisible(!isCustomFlyoutVisible);
  };

  const closeCustomFlyout = () => {
    setIsCustomFlyoutVisible(false);
  };

  let customFlyout;

  if (isCustomFlyoutVisible) {
    customFlyout = (
      <EuiPortal>
        <div>This is the portal. Click anywhere to close.</div>
        <EuiButton onClick={closeCustomFlyout}>Close portal</EuiButton>
      </EuiPortal>
    );
  }

  return (
    <div>
      <EuiButton onClick={toggleCustomFlyout}>View guide</EuiButton>
      {customFlyout}
    </div>
  );
};

describe('EuiPortal', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<Portal />);
    cy.get('div[data-relative-to-header="above"]').should('not.exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations after the portal is activated', () => {
      cy.get('button[type="button"]').contains('View guide').realClick();
      cy.get('div[data-euiportal="true"]').should('exist');
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations when the portal is opened by keyboard', () => {
      cy.realPress('Tab');
      cy.get('button[type="button"]').should('have.focus');
      cy.realPress('Enter');
      cy.get('div[data-euiportal="true"]').should('exist');
      cy.checkAxe();
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('div[data-euiportal="true"]').should('not.exist');
      cy.checkAxe();
    });
  });
});
