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
import { EuiFormRow } from '../form_row';
import { EuiSuperSelect, EuiSuperSelectProps } from './super_select';

const options = [
  { value: '1', inputDisplay: <strong>Option #1</strong> },
  { value: '2', inputDisplay: 'Option #2' },
];

const ControlledSuperSelect = (props: Partial<EuiSuperSelectProps>) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const onChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <EuiSuperSelect
      options={options}
      valueOfSelected={selectedValue}
      onChange={onChange}
      {...props}
    />
  );
};

describe('EuiSuperSelect', () => {
  const dropdownIsOpen = () =>
    cy.get('.euiSuperSelect__listbox').should('be.visible');
  const dropdownIsClosed = () =>
    cy.get('.euiSuperSelect__listbox').should('not.exist');

  it('opens the popover on specific key presses', () => {
    cy.realMount(
      <>
        <EuiSuperSelect options={options} />
        <button>other focusable element</button>
      </>
    );

    cy.realPress('Tab');
    cy.focused().should('have.class', 'euiSuperSelectControl');

    const keys = ['ArrowUp', 'ArrowDown', 'Space', 'Enter'] as const; // Enter technically isn't supported by native `<select>` elements but `<buttons>` naturally support it, so we can test it anyway
    keys.forEach((key) => {
      cy.realPress(key);
      dropdownIsOpen();
      cy.realPress('Escape');
      dropdownIsClosed();
    });
    cy.focused().should('have.class', 'euiSuperSelectControl');

    // Should allow tabbing away from the super select when the dropdown is closed
    cy.realPress('Tab');
    cy.focused().should('not.have.class', 'euiSuperSelectControl');
  });

  it('closes the popover and selects the currently focused item on Enter or Tab keypress', () => {
    cy.realMount(
      <ControlledSuperSelect options={options} placeholder="Placeholder" />
    );

    cy.realPress('Tab');
    cy.focused().should('have.text', 'Placeholder');

    cy.realPress('Enter');
    dropdownIsOpen();
    cy.realPress('ArrowDown');
    cy.realPress('Enter');
    dropdownIsClosed();
    cy.focused().should('have.text', 'Option #2');

    cy.realPress('Enter');
    dropdownIsOpen();
    cy.realPress('ArrowUp');
    cy.realPress('Tab');
    dropdownIsClosed();
    cy.focused().should('have.text', 'Option #1');
  });

  it('closes the popover without selecting the current item on Escape key', () => {
    cy.realMount(
      <ControlledSuperSelect options={options} valueOfSelected="1" />
    );

    cy.realPress('Tab');
    cy.focused().should('have.text', 'Option #1');

    cy.realPress('Enter');
    dropdownIsOpen();
    cy.realPress('ArrowDown');
    cy.realPress('Escape');
    dropdownIsClosed();
    cy.focused().should('have.text', 'Option #1');
  });

  it('does not allow keyboard navigating past first or last options', () => {
    cy.realMount(<EuiSuperSelect options={options} />);

    cy.realPress('Tab');
    cy.realPress('Enter');
    dropdownIsOpen();

    cy.focused().should('have.text', 'Option #1');
    cy.realPress('ArrowUp');
    cy.focused().should('have.text', 'Option #1');
    cy.realPress('ArrowDown');
    cy.focused().should('have.text', 'Option #2');
    cy.realPress('ArrowDown');
    cy.focused().should('have.text', 'Option #2');
  });

  it('retains form row focus state on dropdown navigation', () => {
    cy.realMount(
      <EuiFormRow label="test">
        <EuiSuperSelect options={options} />
      </EuiFormRow>
    );

    cy.realPress('Tab');
    cy.get('.euiFormLabel').should('have.class', 'euiFormLabel-isFocused');
    cy.realPress('Enter');
    dropdownIsOpen();
    cy.realPress('ArrowDown');
    cy.get('.euiFormLabel').should('have.class', 'euiFormLabel-isFocused');
  });
});
