/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import { NoUnnamedInteractiveElement } from './no_unnamed_interactive_element';

const ruleTester = new RuleTester();

// Enable JSX for each snippet
const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

ruleTester.run('NoUnnamedInteractiveElement', NoUnnamedInteractiveElement, {
  valid: [
    // Components with allowed a11y props
    { code: '<EuiBetaBadge aria-label="Beta badge" />', languageOptions },
    { code: '<EuiButtonIcon aria-label="Icon" />', languageOptions },
    { code: '<EuiComboBox aria-label="Combo label" />', languageOptions },
    { code: '<EuiSelect aria-label="Select label" />', languageOptions },
    {
      code: '<EuiSelectWithWidth aria-label="SelectWithWidth label" />',
      languageOptions,
    },
    {
      code: '<EuiSuperSelect aria-labelledby="superLabel" />',
      languageOptions,
    },
    {
      code: '<EuiPagination aria-label="Pagination label" />',
      languageOptions,
    },
    { code: '<EuiTreeView aria-label="TreeView label" />', languageOptions },
    {
      code: '<EuiBreadcrumbs aria-label="Breadcrumbs label" />',
      languageOptions,
    },
    // Wrapped in EuiFormRow with label
    {
      code: '<EuiFormRow label="Row label"><EuiComboBox /></EuiFormRow>',
      languageOptions,
    },
    {
      code: '<EuiFormRow label="Row label"><EuiSelect /></EuiFormRow>',
      languageOptions,
    },
  ],
  invalid: [
    // Missing a11y prop for interactive components
    {
      code: '<EuiBetaBadge />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiButtonIcon />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiComboBox />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSelect />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSelectWithWidth />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSuperSelect />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiPagination />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiTreeView />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiBreadcrumbs />',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    // Wrapped but missing label
    {
      code: '<EuiFormRow><EuiComboBox /></EuiFormRow>',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiFormRow><EuiSelect /></EuiFormRow>',
      languageOptions,
      errors: [{ messageId: 'missingA11y' }],
    },
  ],
});
