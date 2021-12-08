// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support';
import './commands.js';
require(THEME_IMPORT); // defined by DefinePlugin in the cypress webpack config

// @see https://github.com/quasarframework/quasar/issues/2233#issuecomment-492975745
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('> ResizeObserver loop limit exceeded')) {
    return false;
  }
});
