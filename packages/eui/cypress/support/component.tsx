// ***********************************************************
// This example support/component.tsx is processed and
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
import 'cypress-axe';
import 'cypress-plugin-tab';
import 'cypress-real-events';

import './a11y/checkAxe';
import './keyboard/repeatRealPress';
import './copy/select_and_copy';
import './setup/mount';
import './setup/realMount';
import './css/cssVar';
import './helpers/wait_for_position_to_settle';

// @see https://github.com/quasarframework/quasar/issues/2233#issuecomment-492975745
// @see also https://github.com/cypress-io/cypress/issues/20341
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('> ResizeObserver loop')) {
    return false;
  }
});
