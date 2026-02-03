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

import { useEuiContainerQuery } from './container_query_hook';

const TestComponent = ({
  condition,
  name,
}: {
  condition: string;
  name?: string;
}) => {
  const { ref, matches } = useEuiContainerQuery<HTMLDivElement>(
    condition,
    name
  );

  return (
    <div
      data-test-subj="container"
      style={
        {
          container: `${name ?? 'none'} / inline-size`,
          width: '400px',
        } as React.CSSProperties
      }
    >
      <div
        ref={ref}
        data-matches={matches}
        data-test-subj="child"
        style={{ outline: '1px solid lime' }}
      >
        Matches: {matches ? 'yes' : 'no'}
      </div>
    </div>
  );
};

describe('useEuiContainerQuery', () => {
  it('matches according to container query', () => {
    cy.realMount(<TestComponent condition="(width > 100px)" />);

    cy.get('[data-test-subj="child"]')
      .should('exist')
      .invoke('attr', 'data-matches')
      .should('eq', 'true');

    cy.get('[data-test-subj="container"]').should(
      'have.css',
      'container',
      'none / inline-size'
    );
  });

  it('matches updates when container resizes', () => {
    cy.mount(<TestComponent condition="(width > 250px)" />);

    // initial state
    cy.get('[data-test-subj="child"]')
      .invoke('attr', 'data-matches')
      .should('eq', 'true');

    // resize to smaller width
    cy.get('[data-test-subj="container"]')
      .invoke('css', 'width', '200px')
      .wait(100);

    cy.get('[data-test-subj="child"]')
      .invoke('attr', 'data-matches')
      .should('eq', 'false');

    // resize back to larger width
    cy.get('[data-test-subj="container"]')
      .invoke('css', 'width', '300px')
      .wait(100);

    cy.get('[data-test-subj="child"]')
      .invoke('attr', 'data-matches')
      .should('eq', 'true');
  });

  it('supports name in the container query', () => {
    cy.mount(
      <div
        style={
          {
            containerType: 'inline-size',
            width: '200px',
            outline: '1px solid cyan',
          } as React.CSSProperties
        }
      >
        <TestComponent condition="(width > 300px)" name="my-container" />
      </div>
    );

    // targets the container named
    cy.get('[data-test-subj="child"]')
      .invoke('attr', 'data-matches')
      .should('eq', 'true');

    // resize back to larger width
    cy.get('[data-test-subj="container"]')
      .invoke('css', 'width', '250px')
      .wait(100);

    cy.get('[data-test-subj="child"]')
      .invoke('attr', 'data-matches')
      .should('eq', 'false');

    cy.get('[data-test-subj="container"]').should(
      'have.css',
      'container',
      'my-container / inline-size'
    );
  });
});
