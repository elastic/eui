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

import React from 'react';
import { EuiFormRow } from '../form';
import { EuiSuggest } from './suggest';
import { EuiSuggestItemProps } from './suggest_item';

const Suggest = () => {
  const suggestedItems: EuiSuggestItemProps[] = [
    {
      type: {
        iconType: 'accessibility',
        color: 'tint1',
      },
      label: 'Accessibility',
      description: 'A short description',
    },
    {
      type: {
        iconType: 'image',
        color: 'tint2',
      },
      label: 'Images',
      description: 'Another short description',
    },
    {
      type: {
        iconType: 'lock',
        color: 'tint3',
      },
      label: 'Locks',
      description: 'A third short description',
    },
  ];
  return (
    <EuiFormRow label="Suggest a topic" id="cy-label-suggest-1">
      <EuiSuggest
        aria-labelledby="cy-label-suggest-1-label"
        suggestions={suggestedItems}
      />
    </EuiFormRow>
  );
};

describe('EuiSuggest', () => {
  beforeEach(() => {
    cy.realMount(<Suggest />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when rendered', () => {
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations after traversing list items', () => {
      cy.realPress('Tab');
      cy.get('#cy-label-suggest-1').should('have.focus');
      cy.get('ul[role="listbox"]').should('exist');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowUp');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowLeft');
      cy.get('li[role="option"]')
        .first()
        .should('have.attr', 'aria-selected', 'true');
      cy.checkAxe();
    });
  });
});
