/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import './mount';
import { MountOptions } from './mount';

const realMountCommand = (children: ReactNode, options: MountOptions = {}) => {
  cy.mount(
    <>
      <div
        data-test-subj="cypress-real-event-target"
        style={{ height: '1px', width: '1px' }}
      />
      {children}
    </>,
    options
  ).then(() => {
    cy.get('[data-test-subj="cypress-real-event-target"]').realClick({
      position: 'topLeft',
    });
  });
};

// Export only the type to not confuse code-completion tools
export type realMountCommand = typeof realMountCommand;

Cypress.Commands.add('realMount', realMountCommand);
