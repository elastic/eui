/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiRadioGroup } from './radio_group';

const RadioGroup = () => {
  const radioGroupItemId__1 = 'cy-radio-1';
  const radioGroupItemId__2 = 'cy-radio-2';
  const radioGroupItemId__3 = 'cy-radio-3';

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
      label: 'Option three',
    },
  ];

  const [radioIdSelected, setRadioIdSelected] = useState(radioGroupItemId__1);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  return (
    <EuiRadioGroup
      options={radios}
      idSelected={radioIdSelected}
      onChange={(id) => onChange(id)}
      name="radio group"
      legend={{
        children: <span>This is a legend for a radio group</span>,
      }}
    />
  );
};

describe('EuiCheckBox', () => {
  beforeEach(() => {
    cy.realMount(<RadioGroup />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('Has zero violations after traversing radio group', () => {
      cy.realPress('Tab');
      cy.get('#cy-radio-1').should('have.focus');
      cy.realPress('Space');
      cy.get('#cy-radio-1').should('be.checked');
      cy.realPress('ArrowDown');
      cy.get('#cy-radio-2').should('be.checked');
      cy.realPress('ArrowRight');
      cy.get('#cy-radio-3').should('be.checked');
      cy.checkAxe();
    });
  });
});
