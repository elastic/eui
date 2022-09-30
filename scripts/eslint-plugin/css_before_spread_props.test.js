import rule from './css_before_spread_props.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const valid = [
  {
    code: `<a
        css={cssStyles}
        {...rest}
      >
        {buttonIcon}
      </a>
    `,
  },
  {
    code: `<a css={cssStyles}>
        {buttonIcon}
      </a>
    `,
  },
  {
    code: `<a {...rest}>
        {buttonIcon}
      </a>
    `,
  },
  {
    code: `<nav {...rest}>
      <ol
        className="euiBreadcrumbs__list"
        css={cssBreadcrumbsListStyles}
      >
        {breadcrumbChildren}
      </ol>
    </nav>
    `,
  },
  {
    code: `<nav {...rest}>
      <ol css={cssBreadcrumbsListStyles}>
        {breadcrumbChildren}
      </ol>
    </nav>
    `,
  },
  {
    code: `<nav {...rest}>
      <ol {...rest}>
        {breadcrumbChildren}
      </ol>
    </nav>
    `,
  },
  {
    code: `<EuiLink
      ref={ref}
      css={cssStyles}
      {...rest}
    >
      {text}
    </EuiLink>
    `,
  },
  {
    code: `<EuiLink
      ref={ref}
      css={cssStyles}
      {...rest}
    >
      Text string
    </EuiLink>
    `,
  },
];

const invalid = [
  {
    code: `<a
      {...rest}
      css={cssStyles}
    >
      {buttonIcon}
    </a>
    `,
    errors: [
      {
        message: 'rest: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `<nav {...rest}>
      <ol
        {...rest}
        css={cssBreadcrumbsListStyles}
      >
        {breadcrumbChildren}
      </ol>
    </nav>
    `,
    errors: [
      {
        message: 'rest: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `<nav>
      <ol
        {...rest}
        css={cssBreadcrumbsListStyles}
      >
        {breadcrumbChildren}
      </ol>
    </nav>
    `,
    errors: [
      {
        message: 'rest: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `<EuiLink
      ref={ref}
      {...rest}
      css={cssStyles}
    >
      {text}
    </EuiLink>
    `,
    errors: [
      {
        message: 'rest: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `<EuiLink
      ref={ref}
      {...rest}
      css={cssStyles}
    >
      Text string
    </EuiLink>
    `,
    errors: [
      {
        message: 'rest: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `return !href && !onClick ? (
      <EuiTextColor
        color={highlightLastBreadcrumb ? 'default' : 'subdued'}
        cloneElement
        {...restTextColor}
        css={cssStyles}
      >
        <span
          ref={ref}
          title={title}
          aria-current={ariaCurrent}
          className={classes}
          css={cssStyles}
        >
          {text}
        </span>
      </EuiTextColor>
    ) : (
      <EuiLink
        {...restLink}
        ref={ref}
        title={title}
        aria-current={ariaCurrent}
        className={classes}
        css={cssStyles}
        color={color || (highlightLastBreadcrumb ? 'text' : 'subdued')}
        onClick={onClick}
        href={href}
        rel={rel}
      >
        {text}
      </EuiLink>
    );
    `,
    errors: [
      {
        message: 'restTextColor: CSS props must be declared before spread props.',
      },
      {
        message: 'restLink: CSS props must be declared before spread props.',
      },
    ],
  },
  {
    code: `return !href && !onClick ? (
      <EuiTextColor
        color={highlightLastBreadcrumb ? 'default' : 'subdued'}
        cloneElement
        css={cssStyles}
      >
        <span
          ref={ref}
          title={title}
          aria-current={ariaCurrent}
          className={classes}
          {...restSpanProps}
          css={cssStyles}
        >
          {text}
        </span>
      </EuiTextColor>
    ) : (
      <EuiLink
        ref={ref}
        title={title}
        aria-current={ariaCurrent}
        className={classes}
        css={cssStyles}
        color={color || (highlightLastBreadcrumb ? 'text' : 'subdued')}
        onClick={onClick}
        href={href}
        rel={rel}
      >
        {text}
      </EuiLink>
    );
    `,
    errors: [
      {
        message: 'restSpanProps: CSS props must be declared before spread props.',
      },
    ],
  },
]

ruleTester.run('css_before_spread_props', rule, {
  valid,
  invalid,
});
