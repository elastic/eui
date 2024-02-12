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
import { EuiButton } from '../button';
import { EuiPortal } from './portal';

const Portal = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  const closePortal = () => {
    setIsPortalVisible(false);
  };

  let customPortal;

  if (isPortalVisible) {
    customPortal = (
      <EuiPortal>
        <div>This is the portal. Click anywhere to close.</div>
        <EuiButton onClick={closePortal}>Close portal</EuiButton>
      </EuiPortal>
    );
  }

  return (
    <div>
      <EuiButton onClick={togglePortal}>View guide</EuiButton>
      {customPortal}
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
});
