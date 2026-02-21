/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { PreferBackgroundColor } from './prefer_background_color';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('prefer-background-color', PreferBackgroundColor, {
  valid: [
    {
      // Valid: Using background-color instead of background
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { EuiCode } from '@elastic/eui';

        function TestComponent() {
          return (
            <EuiCode style={{ backgroundColor: '#dd4040' }}>test</EuiCode>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: Using background-color in kebab-case
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          return (
            <div css={css\`
              background-color: #dd4040;
            \`}>test</div>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: Using backgroundColor in object style
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const style = { backgroundColor: 'red' };
          return <div style={style}>test</div>
        }`,
      languageOptions,
    },
    {
      // Valid: Using background-image
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ backgroundImage: 'url(image.png)' }}>test</div>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: Using background-size
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ backgroundSize: 'cover' }}>test</div>
          )
        }`,
      languageOptions,
    },
  ],

  invalid: [
    {
      // Invalid: Using background in inline style
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ background: '#dd4040' }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecific' }],
    },
    {
      // Invalid: Using background in css template literal
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          return (
            <div css={css\`
              background: #dd4040;
            \`}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColor' }],
    },
    {
      // Invalid: Using background in variable
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const style = { background: 'red' };
          return <div style={style}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecificDeclaredVariable' }],
    },
    {
      // Invalid: Using background in css prop with function
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div css={() => ({ background: '#dd4040' })}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecific' }],
    },
    {
      // Invalid: Using background in css function variable
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          const styles = css({ background: 'blue' });
          return <div css={styles}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecificDeclaredVariable' }],
    },
    {
      // Invalid: Using background in arrow function with block statement
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div css={() => {
              return { background: '#dd4040' };
            }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecific' }],
    },
    {
      // Invalid: Using background in spread element
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const baseStyle = { background: 'red' };
          return <div style={{ ...baseStyle }}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'preferBackgroundColorSpecificDeclaredVariable' }],
    },
  ],
});
