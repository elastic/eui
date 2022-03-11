/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../"/>

import { defaultContext, defaultAxeConfig } from './defaultAxeConfig';
import { Result } from 'axe-core';

function logViolations(violations: Result[]) {
  // Print any violations to the console using a custom callback
  // https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
  cy.task(
    'log',
    `${violations.length} violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected.`
  );

  // Destructure keys from the violations object to create a readable table
  const violationData = violations.map(({ id, description, impact, nodes }) => ({
      id,
      description,
      impact,
      nodes: nodes.length
    })
  );

  // Print the table of violations to the console
  cy.task('table', violationData);
}

Cypress.Commands.add('checkAxe', (context, axeConfig, callback) => {
  cy.injectAxe();
  cy.checkA11y(context ?? defaultContext, axeConfig ?? defaultAxeConfig, callback ?? logViolations);
});
