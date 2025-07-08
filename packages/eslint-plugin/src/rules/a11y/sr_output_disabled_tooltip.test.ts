/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { ScreenReaderOutputDisabledTooltip } from './sr_output_disabled_tooltip';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'screen-reader-output-disabled-tooltip',
  ScreenReaderOutputDisabledTooltip,
  {
    valid: [
      {
        code: dedent`
        const MyComponent = () => (
          <EuiToolTip
            content="Add filter"
            disableScreenReaderOutput>
            <EuiButtonIcon
              iconType="plusInCircleFilled"
              aria-label="Add filter"
            />
          </EuiToolTip>
        )
      `,
        languageOptions,
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Different tooltip text">
            <EuiButtonIcon
              iconType="plusInCircleFilled"
              aria-label="Add filter"
            />
          </EuiToolTip>
        )
      `,
        languageOptions,
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiToolTip content={tooltipText}>
            <div>Not a button component</div>
          </EuiToolTip>
        )
      `,
        languageOptions,
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiButtonIcon
            iconType="plusInCircleFilled"
            aria-label="Add filter"
          />
        )
      `,
        languageOptions,
      },
    ],
    invalid: [
      {
        code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Add filter">
            <EuiButtonIcon
              iconType="plusInCircleFilled"
              aria-label="Add filter"
            />
          </EuiToolTip>
        )
      `,
        output: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Add filter" disableScreenReaderOutput>
            <EuiButtonIcon
              iconType="plusInCircleFilled"
              aria-label="Add filter"
            />
          </EuiToolTip>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'requireDisableScreenReader' }],
      },
      {
        code: dedent`
        const MyComponent = () => {
          const label = "Add filter";
          return (
            <EuiToolTip content={label}>
              <EuiButtonIcon
                iconType="plusInCircleFilled"
                aria-label={label}
              />
            </EuiToolTip>
          );
        }
      `,
        output: dedent`
        const MyComponent = () => {
          const label = "Add filter";
          return (
            <EuiToolTip content={label} disableScreenReaderOutput>
              <EuiButtonIcon
                iconType="plusInCircleFilled"
                aria-label={label}
              />
            </EuiToolTip>
          );
        }
      `,
        languageOptions,
        errors: [{ messageId: 'requireDisableScreenReader' }],
      },
    ],
  }
);
