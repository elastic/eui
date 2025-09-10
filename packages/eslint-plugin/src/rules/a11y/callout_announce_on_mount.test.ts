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
