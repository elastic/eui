/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { NoCssColor } from './no_css_color';

/**
 * For some reason, `languageOptions` is defined in `RuleTesterConfig` but causes an error: "Object literal may only specify known properties".
 * Documented way (per each test case) works as expected: https://typescript-eslint.io/packages/rule-tester/.
 */
const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-css-color', NoCssColor, {
  valid: [
    {
      // Does not raise an error when a CSS color is not used in a JSX css prop attribute',
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';
      import { EuiCode } from '@elastic/eui';
      import { css } from '@emotion/react';
      function TestComponent() {
        return (
          <EuiCode css={css\`
              border-top: none;
              border-radius: 0 0 6px 6px;
            \`}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
    },
  ],

  invalid: [
    {
      // Raises an error when a CSS color is used in a JSX style attribute
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        return (
          <EuiCode style={{ color: '#dd4040' }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColorSpecific' }],
    },
    {
      // Raises an error when a CSS color references a string variable that is passed to style prop of a JSX element
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        const codeColor = '#dd4040';
        return (
          <EuiCode style={{ color: codeColor }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCSSColorSpecificDeclaredVariable' }],
    },
    {
      // Raises an error when a CSS color is used in an object variable that is passed to style prop of a JSX element
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        const codeStyle = { color: '#dd4040' };
        return (
          <EuiCode style={codeStyle}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCSSColorSpecificDeclaredVariable' }],
    },
    {
      // Raises an error when an object property that is a literal CSS color is used for the background property in a JSX style attribute
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        const baseStyle = { background: 'rgb(255, 255, 255)' };

        return (
          <EuiCode style={{ background: baseStyle.background }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCSSColorSpecificDeclaredVariable' }],
    },
    {
      // Raises an error when a CSS color is used in a variable that is spread into another variable that is passed to style prop of a JSX element
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        const baseStyle = { background: 'rgb(255, 255, 255)' };
        const codeStyle = { margin: '5px', ...baseStyle };
        return (
          <EuiCode style={codeStyle}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCSSColorSpecificDeclaredVariable' }],
    },
    {
      // Raises an error when a CSS color is used for the background property in a JSX style attribute
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        return (
          <EuiCode style={{ background: '#dd4040' }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColorSpecific' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX css attribute for EuiComponents
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        return (
          <EuiCode css={{ color: '#dd4040' }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColorSpecific' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in with the tagged template css function
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import { css } from '@emotion/css';

      const codeColor = css\` color: #dd4040; \`;
      `,
      languageOptions,
      errors: [{ messageId: 'noCssColor' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX css attribute for EuiComponents with the css template function
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';
      import { css } from '@emotion/css';

      function TestComponent() {
        return (
          <EuiCode css={css\` color: #dd4040; \`}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColor' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX className attribute for EuiComponents with the css template function defined outside the scope of the component
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';
      import { css } from '@emotion/css';

      const codeCss = css({
        color: '#dd4040',
      })

      function TestComponent() {
        return (
          <EuiCode css={codeCss}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCSSColorSpecificDeclaredVariable' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX className attribute for EuiComponents with the css template function defined outside the scope of the component
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';
      import { css } from '@emotion/css';

      const codeCss = css\` color: #dd4040; \`

      function TestComponent() {
        return (
          <EuiCode css={codeCss}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColor' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX css attribute for EuiComponents with an arrow function
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: `
      import React from 'react';

      function TestComponent() {
        return (
          <EuiCode css={() => ({ color: '#dd4040' })}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColorSpecific' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX css attribute for EuiComponents with a regular function
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';

      function TestComponent() {
        return (
          <EuiCode css={function () { return { color: '#dd4040' }; }}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColorSpecific' }],
    },
    {
      // Raises an error when a CSS color for the color property is used in a JSX className attribute for EuiComponents with the css template function
      filename:
        '/x-pack/plugins/observability_solution/observability/public/test_component.tsx',
      code: dedent`
      import React from 'react';
      import { css } from '@emotion/css';

      function TestComponent() {
        return (
          <EuiCode className={css\` color: #dd4040; \`}>This is a test</EuiCode>
        )
      }`,
      languageOptions,
      errors: [{ messageId: 'noCssColor' }],
    },
  ],
});
