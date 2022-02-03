Cypress.Commands.add('axeCheck', (context = 'div#__cy_root', rulesObj = {}) => {
  cy.checkA11y(context, rulesObj);
});