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

import { EuiSuggest, EuiSuggestionProps } from './suggest';

const sampleItems: EuiSuggestionProps[] = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
    description: 'Description',
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: 'Description',
  },
];

describe('EuiSuggest', () => {
  describe('onItemClick', () => {
    it('is called when an option is clicked', () => {
      const handler = cy.stub();
      cy.mount(
        <EuiSuggest
          aria-label="onItemClick"
          suggestions={sampleItems}
          onItemClick={handler}
        />
      );

      cy.get('input')
        .click()
        .then(() => {
          expect(cy.get('ul')).to.exist;
        });
      cy.get('li[role=option]')
        .first()
        .click()
        .then(() => {
          expect(handler).to.be.calledWith(sampleItems[0]);
        });
    });

    it('is called when an option is pressed via the Enter key', () => {
      const handler = cy.stub();
      cy.mount(
        <EuiSuggest
          aria-label="onItemClick"
          suggestions={sampleItems}
          onItemClick={handler}
        />
      );

      cy.get('input')
        .click()
        .then(() => {
          expect(cy.get('ul')).to.exist;
        });
      cy.realPress('ArrowDown');
      cy.realPress('Enter').then(() => {
        expect(handler).to.be.calledWith(sampleItems[0]);
      });
    });
  });

  describe('onInput', () => {
    it('is called on each key input value change', () => {
      const handler = cy.stub();
      cy.mount(
        <EuiSuggest
          aria-label="onInputChange"
          suggestions={sampleItems}
          onInput={handler}
        />
      );

      cy.get('input')
        .type('search')
        .type('{backspace}')
        .then(() => {
          expect(handler).to.have.callCount(7);
        });
    });
  });

  describe('onSearch', () => {
    it('is called on each key input value change', () => {
      const handler = cy.stub();
      cy.mount(
        <EuiSuggest
          aria-label="onSearchChange"
          suggestions={sampleItems}
          onSearch={handler}
        />
      );

      cy.get('input')
        .type('search')
        .type('{backspace}')
        .then(() => {
          expect(handler).to.have.callCount(8);
        });
    });
  });

  describe('filtering', () => {
    it('filters the list via search', () => {
      cy.mount(<EuiSuggest aria-label="filtering" suggestions={sampleItems} />);

      cy.get('input')
        .type('v')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Value sample');
        });
    });
  });
});
