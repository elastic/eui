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

describe('Automated accessibility report-only', () => {
  it('reports errors without throwing', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    cy.mount(<div role="invalid" />);
    cy.get('div[role="invalid"]');
    cy.checkAxe({ skipFailures: true });
  });
});
