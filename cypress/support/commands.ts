import '@cypress/code-coverage/support';
import 'cypress-axe';
import 'cypress-plugin-tab';
import 'cypress-real-events';
import './a11y/checkAxe';
import './keyboard/repeatRealPress';
import './setup/mount';
import './setup/realMount';

// @see https://github.com/quasarframework/quasar/issues/2233#issuecomment-492975745
// @see also https://github.com/cypress-io/cypress/issues/20341
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('> ResizeObserver loop limit exceeded')) {
    return false;
  }
});
