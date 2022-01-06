import { mount as cypressMount } from '@cypress/react';
import { React, Fragment } from 'react';
import { EuiProvider } from '../../src';

// Provide global cy.mount() shortcut that includes required providers
// @see https://github.com/cypress-io/cypress/blob/develop/npm/react/docs/providers-and-composition.md
Cypress.Commands.add('mount', (children) => {
  return cypressMount(<EuiProvider>{children}</EuiProvider>);
});

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

Cypress.Commands.add('repeatRealPress', (keyToPress, count = 2) => {
  for (let i = 0; i < count; i++) {
    cy.realPress(keyToPress);
  }
});
