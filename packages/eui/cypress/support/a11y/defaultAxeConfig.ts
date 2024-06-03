// Default `context` is the Cypress containing `<div>`
// 
// The `defaultAxeConfig` object tests for all WCAG 2.0 and WCAG 2.1 rules.
// This is a best practice to help us meet US and European accessibility requirements.
// https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules
// 
// Disabling the color-contrast rule because we have a well-tested color palette
// in EUI and the potential for false positives in Cypress.
// See https://github.com/component-driven/cypress-axe/issues/98

import { RunOptions } from 'axe-core';

const defaultContext: string = 'div[data-cy-root]';
const defaultAxeConfig: RunOptions = {
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

export { defaultContext, defaultAxeConfig };
