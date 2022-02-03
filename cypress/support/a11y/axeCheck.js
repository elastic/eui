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

  cy.checkA11y(context, axeConfig);
});