import { mount as cypressMount } from '@cypress/react';
import { EuiProvider } from '../../src';

// Provide global cy.mount() shortcut that includes required providers
// @see https://github.com/cypress-io/cypress/blob/develop/npm/react/docs/providers-and-composition.md
Cypress.Commands.add('mount', (children) => {
  return cypressMount(<EuiProvider>{children}</EuiProvider>);
});
