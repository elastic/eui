/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

Cypress.Commands.add('repeatRealPress', (keyToPress, count = 2, options) => {
  for (let i = 0; i < count; i++) {
    cy.realPress(keyToPress, options);
  }
});
