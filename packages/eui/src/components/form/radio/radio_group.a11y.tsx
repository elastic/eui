/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../../cypress/support" />

import React, { useState } from 'react';
import { EuiRadioGroup } from './radio_group';

const RadioGroup = () => {
  const radioGroupItemId__1 = 'cy-radio-id-1';
  const radioGroupItemId__2 = 'cy-radio-id-2';
  const radioGroupItemId__3 = 'cy-radio-id-3';
  const radioGroupItemId__4 = 'cy-radio-id-4';

  const radios = [
    {
      id: radioGroupItemId__1,
      label: 'Option one',
    },
    {
      id: radioGroupItemId__2,
      label: 'Option two',
    },
    {
      id: radioGroupItemId__3,
      label: 'Option three is disabled',
      disabled: true,
    },
    {
      id: radioGroupItemId__4,
      label: 'Option four',
    },
  ];

  const [radioIdSelected, setRadioIdSelected] = useState(radioGroupItemId__1);

  return (
    <EuiRadioGroup
      options={radios}
      idSelected={radioIdSelected}
      onChange={(id) => setRadioIdSelected(id)}
      name="radio group"
      legend={{
        children: <span>This is a legend for a radio group</span>,
      }}
    />
  );
};

describe('EuiRadioGroup', () => {
  beforeEach(() => {
    cy.realMount(<RadioGroup />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations after traversing radio group', () => {
      cy.realPress('Tab');
      cy.get('#cy-radio-id-1').should('have.focus');
      cy.realPress('Space');
      cy.get('#cy-radio-id-1').should('be.checked');
      cy.realPress('ArrowDown');
      cy.get('#cy-radio-id-2').should('be.checked');
      cy.realPress('ArrowRight');
      cy.get('#cy-radio-id-3').should('not.be.checked');
      cy.get('#cy-radio-id-4').should('be.checked');
      cy.checkAxe();
    });
  });

  describe('Disabled radio button accessibility', () => {
    it('affects no change after clicking the disabled radio button', () => {
      cy.get('#cy-radio-id-3').realClick();
      cy.get('#cy-radio-id-3').should('not.be.checked');
      cy.checkAxe();
    });
  });
});
