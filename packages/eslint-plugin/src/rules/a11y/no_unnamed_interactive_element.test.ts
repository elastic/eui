/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
    { code: '<EuiButtonEmpty aria-labelledby="btnLabel" />', languageOptions },
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
      code: '<EuiButtonEmpty />',
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
