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

function _handleViolations(violations: Result[], skipTestFailure?: boolean) {
  // Destructure keys from the violations object to create a readable array
  const violationData = violations.map(({ id, description, impact, nodes }) => ({
    id,
    description,
    impact,
    nodes: nodes.length
  }));

  // Print reporting only message to the console
  // https://github.com/component-driven/cypress-axe#skipfailures-optional-defaults-to-false
  if (skipTestFailure) {
    cy.task(
      'log',
      `
========================================
* A11Y REPORT MODE ONLY
========================================`
    );
  }

  // Print violations to the console using a custom callback
  // https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
  cy.task(
    'log',
    `${violations.length} violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected.`
  );

  // Print the table of violations to the console
  cy.task('table', violationData);
}

function logViolationsAndThrow(violations: Result[]) {
  _handleViolations(violations);
}

function logViolationsToConsoleOnly(violations: Result[]) {
  _handleViolations(violations, true);
}

Cypress.Commands.add('checkAxe', ({
  skipFailures,
  context,
  axeConfig,
  callback
} = {}) => {
  cy.injectAxe();
  cy.checkA11y(
    context ?? defaultContext,
    axeConfig ?? defaultAxeConfig,
    callback ?? skipFailures
      ? logViolationsToConsoleOnly
      : logViolationsAndThrow,
    skipFailures
  );
});
