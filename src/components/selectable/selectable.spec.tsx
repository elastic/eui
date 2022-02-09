/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiSelectable, EuiSelectableProps } from './selectable';

const options: EuiSelectableProps['options'] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
];

describe('EuiSelectable', () => {
  describe('with a `searchable` configuration', () => {
    it('filters the list with search', () => {
      cy.realMount(
        <EuiSelectable searchable options={options}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      // Focus the second option
      cy.get('input')
        .click()
        .type('{downarrow}')
        .type('{downarrow}')
        .then(() => {
          cy.get('li[role=option]')
            .eq(1)
            .should('have.attr', 'aria-selected', 'true');
        });

      // Focus remains on the second option
      cy.get('input')
        .type('{alt}')
        .type('{ctrl}')
        .type('{meta}')
        .type('{Shift}')
        .then(() => {
          cy.get('li[role=option]')
            .eq(1)
            .should('have.attr', 'aria-selected', 'true');
        });

      // Filter the list
      cy.get('input')
        .type('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });
    });

    it('can clear the input', () => {
      cy.mount(
        <EuiSelectable searchable options={options}>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      cy.get('input')
        .type('enc')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Enceladus');
        });

      cy.get('[data-test-subj="clearSearchButton"]')
        .type('{enter}')
        .then(() => {
          cy.get('li[role=option]')
            .first()
            .should('have.attr', 'title', 'Titan');
        });
    });
  });
});
