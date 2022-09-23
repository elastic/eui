import rule from './css_before_spread_child_props.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const valid = [
  {
    code: `<a
        className={classes}
        css={cssStyles}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef}
        tabIndex={isAriaHidden ? -1 : undefined}
        {...rest}
      >
        {buttonIcon}
      </a>
    `,
    errors: [
      {
        message: 'CSS props must be declared before spread child props',
      },
    ],
  },
];

const invalid = [
  {
    code: `<a
        className={classes}
        {...restLinkProps}
        css={cssStyles}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef}
        tabIndex={isAriaHidden ? -1 : undefined}
        {...rest}
      >
        {buttonIcon}
      </a>
    `,
    errors: [
      {
        message: 'restLinkProps: CSS props must be declared before spread child props.',
      },
    ],
  },
]

ruleTester.run('css_before_spread_child_props', rule, {
  valid,
  invalid,
});
