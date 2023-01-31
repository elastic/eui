/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React from 'react';
import { EuiBreadcrumbs } from './breadcrumbs';

const breadcrumbs = [
  {
    text: 'Animals',
    href: '#',
  },
  {
    text: 'Metazoans',
    href: '#',
  },
  {
    text: 'Chordates',
    href: '#',
  },
  {
    text: 'Vertebrates',
    href: '#',
  },
  {
    text: 'Tetrapods',
    href: '#',
  },
  {
    text: 'Reptiles',
    href: '#',
  },
  {
    text: 'Boa constrictor',
    href: '#',
  },
  {
    text: 'Nebulosa subspecies',
  },
];

beforeEach(() => {
  // Displays all breadcrumbs except the single truncated one
  cy.viewport(1024, 768); // medium breakpoint
  cy.mount(
    <EuiBreadcrumbs
      max={4}
      breadcrumbs={breadcrumbs}
      aria-label="An example of EuiBreadcrumbs with specifying max prop"
    />
  );
  cy.get('ol.euiBreadcrumbs__list').should('exist');
});

describe('EuiBreadcrumbs', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when truncated menu is open', () => {
      cy.get('[aria-label="See collapsed breadcrumbs"]').realClick();
      cy.get('[data-popover-open="true"] nav.euiBreadcrumbs').should('exist');
      cy.checkAxe();
    });
  });
});
