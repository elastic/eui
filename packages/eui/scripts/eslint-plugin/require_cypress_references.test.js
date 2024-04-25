import rule from './require_cypress_references.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const LICENSE = `/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
`;

const valid = [
  `
  /// <reference types="cypress" />
  /// <reference types="cypress-real-events" />
  /// <reference types="../../../cypress/support" />
  `,
  `
  /// <reference types="cypress" />
  /// <reference types="cypress-real-events" />
  /// <reference types="./cypress/support" />
  `,
];

const invalid = [
  {
    code: `${LICENSE}
`,
    output: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../cypress/support" />

`,
    errors: [
      {
        message: 'Cypress files should include all /// <reference types>',
      },
    ],
  },
  {
    code: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
`,
    output: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../cypress/support" />
`,
    errors: [
      {
        message:
          'Cypress files should include a reference type to our custom `cypress/support/index.d.ts` types',
      },
    ],
  },
  {
    code: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="../cypress/support" />
`,
    output: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../cypress/support" />
`,
    errors: [
      {
        message:
          'Cypress files should include /// <reference type="cypress-real-events" />',
      },
    ],
  },
  {
    code: `${LICENSE}
/// <reference types="cypress-real-events" />
/// <reference types="../cypress/support" />
`,
    output: `${LICENSE}
/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../cypress/support" />
`,
    errors: [
      {
        message:
          'Cypress files should include /// <reference type="cypress" />',
      },
    ],
  },
];

ruleTester.run('require-cypress-references', rule, {
  valid,
  invalid,
});
