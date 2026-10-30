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

import React, { createRef, useState } from 'react';
import { EuiFormRow } from '../form_row';
import {
  EuiSuperSelect,
  EuiSuperSelectProps,
  EuiSuperSelectRef,
} from './super_select';

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

  it('navigates past disabled options', () => {
    cy.realMount(
      <EuiSuperSelect
        options={[
          { value: 'disabled1', inputDisplay: 'disabled', disabled: true },
          { value: 'enabled1', inputDisplay: 'enabled 1' },
          { value: 'disabled2', inputDisplay: 'disabled 2', disabled: true },
          { value: 'disabled2', inputDisplay: 'disabled 3', disabled: true },
          { value: 'enabled2', inputDisplay: 'enabled 2' },
          { value: 'disabled3', inputDisplay: 'disabled 4', disabled: true },
        ]}
      />
    );

    cy.realPress('Tab');
    cy.realPress('Enter');
    dropdownIsOpen();

    cy.focused().should('have.text', 'enabled 1');
    cy.realPress('ArrowDown');
    cy.focused().should('have.text', 'enabled 2');
    cy.realPress('ArrowDown');
    cy.focused().should('have.text', 'enabled 2');
    cy.realPress('ArrowUp');
    cy.focused().should('have.text', 'enabled 1');
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

  it('preserves the page and inner scroll position when switching between selects', () => {
    cy.realMount(
      <>
        <style>{'html { overflow: hidden; }'}</style>
        <div
          data-test-subj="scroller"
          style={{ height: 350, overflow: 'auto' }}
        >
          <div style={{ height: 1400, padding: 16 }}>
            <EuiSuperSelect
              options={options}
              data-test-subj="firstSelect"
              aria-label="First select"
            />
            <div style={{ height: 600 }} />
            <EuiSuperSelect
              options={options}
              data-test-subj="secondSelect"
              aria-label="Second select"
            />
          </div>
        </div>
      </>
    );

    cy.get('[data-test-subj="firstSelect"]').click();
    dropdownIsOpen();
    cy.get('[data-test-subj="scroller"]').scrollTo(0, 500);
    cy.get('[data-test-subj="secondSelect"]').click({ scrollBehavior: false });
    cy.get('[data-test-subj="secondSelect"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    cy.focused().should('have.attr', 'role', 'option');
    cy.get('[data-test-subj="scroller"]').should('have.prop', 'scrollTop', 500);
    cy.window().its('scrollY').should('eq', 0);
  });

  it('does not scroll the page when opening a select below the viewport', () => {
    const ref = createRef<EuiSuperSelectRef>();
    cy.realMount(
      <>
        <style>{'html { overflow: hidden; }'}</style>
        <button onClick={() => ref.current?.openPopover()}>Open select</button>
        <div style={{ height: 1200 }} />
        <EuiSuperSelect
          ref={ref}
          options={options}
          aria-label="Offscreen select"
        />
      </>
    );

    cy.window().its('scrollY').should('eq', 0);
    cy.contains('button', 'Open select').click({ scrollBehavior: false });
    cy.focused().should('have.attr', 'role', 'option');
    cy.window().its('scrollY').should('eq', 0);
  });

  it('keeps the selected option and keyboard navigation visible in a long list', () => {
    const longOptions = Array.from({ length: 30 }, (_, index) => ({
      value: String(index),
      inputDisplay: `Option ${index}`,
    }));
    cy.realMount(
      <EuiSuperSelect
        options={longOptions}
        valueOfSelected="29"
        aria-label="Long select"
      />
    );

    cy.realPress('Tab');
    cy.realPress('Enter');
    dropdownIsOpen();
    cy.focused().should('have.text', 'Option 29').and('be.visible');
    cy.get('[role="listbox"]').should(($list) => {
      expect($list[0].scrollTop).to.be.greaterThan(0);
    });

    for (let index = 0; index < 29; index++) {
      cy.realPress('ArrowUp');
    }
    cy.focused().should('have.text', 'Option 0').and('be.visible');
    cy.get('[role="listbox"]').should('have.prop', 'scrollTop', 0);
  });
});
