/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { React, Fragment } from 'react';
import './mount';

// This ensures the correct testing window has focus when using Cypress Real Events.
// @see https://github.com/dmtrKovalenko/cypress-real-events/issues/196
Cypress.Commands.add('realMount', (children) => {
  cy.mount(
    <Fragment>
      <div
        data-test-subj="cypress-real-event-target"
        style={{ height: '1px', width: '1px' }}
      />
      {children}
    </Fragment>
  ).then(() => {
    cy.get('[data-test-subj="cypress-real-event-target"]').realClick({
      position: 'topLeft',
    });
  });
});