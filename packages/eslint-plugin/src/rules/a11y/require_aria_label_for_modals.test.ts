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

import { RequireAriaLabelForModals } from './require_aria_label_for_modals';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('require-aria-label-for-modals', RequireAriaLabelForModals, {
  valid: [
    {
      code: dedent`
        module.export = () => (
          <EuiModal aria-label="Modal title" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiFlyout aria-labelledby="modalTitleId" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiConfirmModal aria-label="Confirm action" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <div>Regular component without aria</div>
        )
      `,
      languageOptions,
    },
  ],

  invalid: [
    {
      code: dedent`
        module.export = () => (
          <EuiModal />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'modalAriaMissing',
          data: { component: 'EuiModal' },
        },
      ],
    },
    {
      code: dedent`
        module.export = () => (
          <EuiFlyout title="Some title" />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'modalAriaMissing',
          data: { component: 'EuiFlyout' },
        },
      ],
    },
    {
      code: dedent`
        module.export = () => (
          <EuiConfirmModal title="Delete item?" />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'confirmModalAriaMissing',
          data: { component: 'EuiConfirmModal' },
        },
      ],
    },
  ],
});
