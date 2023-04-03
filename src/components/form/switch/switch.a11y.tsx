/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiSwitch } from './switch';

const Switch = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <EuiSwitch
      label="Malware protection"
      checked={checked}
      onChange={(e) => onChange(e)}
    />
  );
};

describe('EuiSwitch', () => {
  beforeEach(() => {
    cy.realMount(<Switch />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('Has zero violations after toggling switch', () => {
      cy.realPress('Tab');
      cy.get('button[role="switch"]')
        .should('have.focus')
        .invoke('attr', 'aria-checked')
        .should('equal', 'false');
      cy.realPress('Enter');
      cy.get('button[role="switch"]')
        .should('have.focus')
        .invoke('attr', 'aria-checked')
        .should('equal', 'true');
      cy.checkAxe();
    });
  });
});
