/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
          <EuiFlyoutResizable aria-labelledby="modalTitleId" />
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
          <EuiFlyoutResizable title="Some title" />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'modalAriaMissing',
          data: { component: 'EuiFlyoutResizable' },
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
