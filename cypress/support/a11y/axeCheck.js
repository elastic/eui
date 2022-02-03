/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

function logViolations(violations) {
  cy.task(
    'log',
    `${violations.length} violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected.`
  );

  // Pop keys off the violations object to create a readable table
  const violationData = violations.map(({ id, description, impact, nodes }) => ({
      id,
      description,
      impact,
      nodes: nodes.length
    })
  );

  cy.task('table', violationData);
}

Cypress.Commands.add('axeCheck', (context = 'div#__cy_root', axeRunConfig = {}) => {
  /**
   * Default required ruleset to meet Section 508 compliance.
   * Do not remove values[] entries. Only add new rulesets like 'best-practices'.
   * Rulesets: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
   */
   const axeBuilder = {
    runOnly: {
      type: 'tag',
      values: ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
    rules: {
      'color-contrast': {
        enabled: false,
      },
    },
  };

  /**
   * Add local rule changes to the axe.run configuration object.
   * Axe-run API: https://www.deque.com/axe/core-documentation/api-documentation/#parameters-axerun
   */
  const axeConfig = Object.assign(axeBuilder, axeRunConfig);

  cy.checkA11y(context, axeConfig, logViolations);
});