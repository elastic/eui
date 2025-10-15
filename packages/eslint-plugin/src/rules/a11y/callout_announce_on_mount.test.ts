/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CallOutAnnounceOnMount } from './callout_announce_on_mount';
import { RuleTester } from '@typescript-eslint/rule-tester';
import dedent from 'dedent';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('callout-announce-on-mount', CallOutAnnounceOnMount, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Always visible callout">
            This callout is always rendered
          </EuiCallOut>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => (
          condition && <EuiCallOut announceOnMount title="Error">
            Something went wrong
          </EuiCallOut>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => (
          condition ? <EuiCallOut announceOnMount title="Success">
            Operation completed
          </EuiCallOut> : null
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => {
          if (condition) {
            return <EuiCallOut announceOnMount title="Warning">
              Please check your input
            </EuiCallOut>
          }
          return null;
        }
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <div>
            <EuiCallOut title="Static callout">
              This is not conditionally rendered
            </EuiCallOut>
          </div>
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = ({ condition }) => (
          condition && <EuiCallOut title="Error">
            Something went wrong
          </EuiCallOut>
        )
      `,
      output: dedent`
        const MyComponent = ({ condition }) => (
          condition && <EuiCallOut announceOnMount title="Error">
            Something went wrong
          </EuiCallOut>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingAnnounceOnMount' }],
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => (
          condition ? <EuiCallOut title="Success">
            Operation completed
          </EuiCallOut> : null
        )
      `,
      output: dedent`
        const MyComponent = ({ condition }) => (
          condition ? <EuiCallOut announceOnMount title="Success">
            Operation completed
          </EuiCallOut> : null
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingAnnounceOnMount' }],
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => {
          if (condition) {
            return <EuiCallOut title="Warning">
              Please check your input
            </EuiCallOut>
          }
          return null;
        }
      `,
      output: dedent`
        const MyComponent = ({ condition }) => {
          if (condition) {
            return <EuiCallOut announceOnMount title="Warning">
              Please check your input
            </EuiCallOut>
          }
          return null;
        }
      `,
      languageOptions,
      errors: [{ messageId: 'missingAnnounceOnMount' }],
    },
    {
      code: dedent`
        const MyComponent = ({ condition }) => (
          <div>
            {!condition && <EuiCallOut title="Validation Error">
              Form contains errors
            </EuiCallOut>}
          </div>
        )
      `,
      output: dedent`
        const MyComponent = ({ condition }) => (
          <div>
            {!condition && <EuiCallOut announceOnMount title="Validation Error">
              Form contains errors
            </EuiCallOut>}
          </div>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingAnnounceOnMount' }],
    },
    {
      code: dedent`
        const MyComponent = ({ status }) => {
          let notification;

          if (status === 'success') {
            notification = (
              <EuiCallOut
                title="Task completed successfully"
              />
            );
          } else if (status === 'error') {
            notification = (
              <EuiCallOut
                title="Something went wrong"
              />
            );
          }

          return <div>{notification}</div>;
        }
      `,
      output: dedent`
        const MyComponent = ({ status }) => {
          let notification;

          if (status === 'success') {
            notification = (
              <EuiCallOut announceOnMount
                title="Task completed successfully"
              />
            );
          } else if (status === 'error') {
            notification = (
              <EuiCallOut announceOnMount
                title="Something went wrong"
              />
            );
          }

          return <div>{notification}</div>;
        }
      `,
      languageOptions,
      errors: [
        { messageId: 'missingAnnounceOnMount' },
        { messageId: 'missingAnnounceOnMount' },
      ],
    },
  ],
});
