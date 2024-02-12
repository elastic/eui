import rule from './css_logical_properties.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const valid = [
  `css\`
    inline-size: 50px;
    inline-start-end: 10px;
  \``,
  // Make sure we don't incorrectly catch similar properties that do not have logical equivalents
  `\`
    line-height: 20px;
    border-width: 1px;
    scrollbar-width: 30px
  \``,
  // Allow shorthand properties that set the same value for all sides
  `\`
    inset: 0;
    margin: 10px;
    padding: \${euiTheme.size.l};
    border-width: \${euiTheme.base}px;
  \``,
  // Ensure we don't accidentally consider !important a shorthand value
  'css`padding: 0 !important;`',
];

const invalid = [
  {
    code: 'css`height: 50px;`',
    output: 'css`block-size: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: '`max-height: 50px;`',
    output: '`max-block-size: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`width: 50px;`',
    output: 'css`inline-size: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: '`min-width: 50px;`',
    output: '`min-inline-size: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`top: 0;`',
    output: 'css`inset-block-start: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`padding-right: 0;`',
    output: 'css`padding-inline-end: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`margin-bottom: 0;`',
    output: 'css`margin-block-end: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`border-left: 1px solid green;`',
    output: 'css`border-inline-start: 1px solid green;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`border-left-color: red;`',
    output: 'css`border-inline-start-color: red;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`text-align: left;`',
    output: 'css`text-align: start;`',
    errors: [{ messageId: 'preferLogicalValue' }],
  },
  {
    code: 'css`overflow-y: hidden;`',
    output: 'css`overflow-block: hidden;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  // Test multiple errors
  {
    code: `css\`
      content: 'ok';
      text-align: right;
      bottom: 50px;
    \``,
    output: `css\`
      content: 'ok';
      text-align: end;
      inset-block-end: 50px;
    \``,
    errors: [
      { messageId: 'preferLogicalValue' },
      { messageId: 'preferLogicalProperty' },
    ],
  },
  // Shorthand
  {
    code: 'css`margin: 10px 50%;`',
    errors: [{ messageId: 'preferLogicalShorthand' }],
  },
  {
    code: 'css`padding: ${euiTheme.size.s} ${euiTheme.size.m} ${euiTheme.size.l};`',
    errors: [{ messageId: 'preferLogicalShorthand' }],
  },
  {
    code: `css\`
      inset:
        \${euiTheme.base}px
        \${mathWithUnits(euiTheme.size.xl, (x) => x / 3)}
        \${euiTheme.size.xl}
        \${euiTheme.base}px;
    \``,
    errors: [{ messageId: 'preferLogicalShorthand' }],
  },
];

ruleTester.run('css_logical_properties', rule, {
  valid,
  invalid,
});
