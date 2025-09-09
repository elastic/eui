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

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { NoUnnamedInteractiveElement } from './no_unnamed_interactive_element';

const ruleTester = new RuleTester({});
// Set the parser for RuleTester
// @ts-ignore
ruleTester.parser = require.resolve('@typescript-eslint/parser');

ruleTester.run('NoUnnamedInteractiveElement', NoUnnamedInteractiveElement, {
  valid: [
    // Components with allowed a11y props
    { code: '<EuiBetaBadge aria-label="Beta badge" />' },
    { code: '<EuiButtonEmpty aria-labelledby="btnLabel" />' },
    { code: '<EuiButtonIcon aria-label="Icon" />' },
    { code: '<EuiComboBox label="Combo label" />' },
    { code: '<EuiSelect aria-label="Select label" />' },
    { code: '<EuiSelectWithWidth label="SelectWithWidth label" />' },
    { code: '<EuiSuperSelect aria-labelledby="superLabel" />' },
    { code: '<EuiPagination label="Pagination label" />' },
    { code: '<EuiTreeView label="TreeView label" />' },
    { code: '<EuiBreadcrumbs aria-label="Breadcrumbs label" />' },
    // Wrapped in EuiFormRow with label
    { code: '<EuiFormRow label="Row label"><EuiComboBox /></EuiFormRow>' },
    { code: '<EuiFormRow label="Row label"><EuiSelect /></EuiFormRow>' },
  ],
  invalid: [
    // Missing a11y prop for interactive components
    {
      code: '<EuiBetaBadge />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiButtonEmpty />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiButtonIcon />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiComboBox />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSelect />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSelectWithWidth />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiSuperSelect />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiPagination />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiTreeView />',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiBreadcrumbs />',
      errors: [{ messageId: 'missingA11y' }],
    },
    // Wrapped but missing label
    {
      code: '<EuiFormRow><EuiComboBox /></EuiFormRow>',
      errors: [{ messageId: 'missingA11y' }],
    },
    {
      code: '<EuiFormRow><EuiSelect /></EuiFormRow>',
      errors: [{ messageId: 'missingA11y' }],
    },
  ],
});