/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { NoStaticZIndex } from './no_static_z_index';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-static-z-index', NoStaticZIndex, {
  valid: [
    {
      // Valid: Using euiTheme variable in inline style
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { EuiCode } from '@elastic/eui';

        function TestComponent() {
          const euiTheme = { levels: { mask: 1000 } };
          return (
            <EuiCode style={{ zIndex: euiTheme.levels.mask }}>test</EuiCode>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: CSS keyword 'auto'
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ zIndex: 'auto' }}>test</div>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: Emotion css with euiTheme variable
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          const theme = { zIndex: { modal: 2000 } };
          return (
            <div css={css\`
              z-index: \${theme.zIndex.modal};
            \`}>test</div>
          )
        }`,
      languageOptions,
    },
    {
      // Valid: Object style with variable
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const zIndexValue = someDynamicValue;
          const style = { zIndex: zIndexValue };
          return <div style={style}>test</div>
        }`,
      languageOptions,
    },
    {
      // Valid: Commented out z-index in css template literal
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          return (
            <div css={css\`
              /* z-index: 50; */
            \`}>test</div>
          )
        }`,
      languageOptions,
    },
  ],

  invalid: [
    {
      // Invalid: Inline style with static number
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ zIndex: 100 }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: Inline style with static string number
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ zIndex: '999' }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: Emotion css prop with static value
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        function TestComponent() {
          return (
            <div css={css\`
              z-index: 50;
            \`}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndex' }],
    },
    {
      // Invalid: Variable with static value used in style
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const myStyle = { zIndex: 10 };
          return <div style={myStyle}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecificDeclaredVariable' }],
    },
    {
      // Invalid: Variable with static value used in css prop (object style)
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        const myCss = css({ zIndex: 100 });

        function TestComponent() {
          return <div css={myCss}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecificDeclaredVariable' }],
    },
    {
      // Invalid: css template literal with static z-index
      filename: 'test.tsx',
      code: dedent`
          import { css } from '@emotion/css';

          const codeCss = css\` z-index: 10; \`
          `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndex' }],
    },
    {
      // Invalid: css template literal with nested static z-index
      filename: 'test.tsx',
      code: dedent`
        import { css } from '@emotion/react';

        const codeCss = css\`
          &:hover {
             z-index: 10;
          }
        \`
      `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndex' }],
    },
    {
      // Invalid: css object with static z-index
      filename: 'test.tsx',
      code: dedent`
            import { css } from '@emotion/react';

            function TestComponent() {
                return <div css={css({ zIndex: 5 })}>test</div>
            }
        `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: arrow function returning object with static z-index
      filename: 'test.tsx',
      code: dedent`
            import { css } from '@emotion/react';

            function TestComponent() {
                return <div css={() => ({ zIndex: 5 })}>test</div>
            }
        `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: css with multiple arguments, one with static z-index
      filename: 'test.tsx',
      code: dedent`
            import { css } from '@emotion/react';

            function TestComponent() {
                return <div css={css(someStyle, { zIndex: 5 })}>test</div>
            }
        `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: Variable with static value used in css prop (object style, nested)
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';
        import { css } from '@emotion/react';

        const myCss = css({ container: { zIndex: 100 } });

        function TestComponent() {
          return <div css={myCss}>test</div>
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecificDeclaredVariable' }],
    },
    {
      // Invalid: css array, one with static z-index
      filename: 'test.tsx',
      code: dedent`
            import { css } from '@emotion/react';

            function TestComponent() {
                return <div css={[someStyle, css({ zIndex: 9 })]}>test</div>
            }
        `,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: Conditional expression with static z-index
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const isTrue = true;
          return (
            <div style={{ zIndex: isTrue ? 10 : 20 }}>test</div>
          )
        }`,
      languageOptions,
      errors: [
        { messageId: 'noStaticZIndexSpecific' },
        { messageId: 'noStaticZIndexSpecific' },
      ],
    },
    {
      // Invalid: Logical expression with static z-index
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          const isTrue = true;
          return (
            <div style={{ zIndex: isTrue || 10 }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: TSAsExpression with static z-index
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ zIndex: 10 as number }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
    {
      // Invalid: UnaryExpression with static z-index
      filename: 'test.tsx',
      code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <div style={{ zIndex: -1 }}>test</div>
          )
        }`,
      languageOptions,
      errors: [{ messageId: 'noStaticZIndexSpecific' }],
    },
  ],
});
