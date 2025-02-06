# Writing styles with Emotion

EUI uses [`Emotion`](https://emotion.sh/) when writing CSS-in-JS styles.
A general knowledge of writing CSS is enough in most cases, but there are some JavaScript-related differences that can result in unintended output. Similarly, there are feaures that don't exist in CSS of which we like to take advantage.

## File patterns

```ts
/* {component name}.styles.ts */
import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiComponentName: css` // Always start the object with the first key being the name of the component
      color: ${euiTheme.colors.textPrimary};
    `,
  };
};
```

---
<details>
  <summary>🎉 <b>ProTip:</b> VS Code snippet</summary>
  To make generating component boilerplate just a little bit easier, you can add the following block to a global or local snippet file in VS Code. Once saved, you'll be able to generate the boilerplate by typing `euisc` `tab`. <a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets" target="_blank">Learn how to add snippets in VS Code</a>:

  ```json
  "euiStyledComponent": {
    "prefix": "euisc",
    "body": [
      "/*",
      "* Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one",
      "* or more contributor license agreements. Licensed under the Elastic License",
      "* 2.0 and the Server Side Public License, v 1; you may not use this file except",
      "* in compliance with, at your election, the Elastic License 2.0 or the Server",
      "* Side Public License, v 1.",
      "*/",
      "",
      "import { css } from '@emotion/react';",
      "import {",
      "  euiFontSize,",
      "  logicalCSS,",
      "} from '../../global_styling';",
      "import { UseEuiTheme } from '../../services';",
      "",
      "export const ${1:componentName}Styles = ({ euiTheme }: UseEuiTheme) => {",
      "  return {",
      "    ${1:componentName}: css`",
      "      ${2:property}: tomato;",
      "    `",
      "  };",
      "};"
    ],
    "description": "EUI styled component"
  }
  ```
</details>

---

```tsx
/* {component name}.tsx */
import { useEuiTheme } from '../../services';
import { euiComponentNameStyles } from './{component name}.styles.ts';

export const EuiComponent = () => {
  const theme = useEuiTheme();
  const styles = euiComponentNameStyles(theme);
  const cssStyles = [styles.euiComponentName]

  return (
    <div css={cssStyles} />
  );
};
```

## CSS-aligned props

If a prop/value pair maps 1:1 to the CSS property: value, pass the value straight through. We encounter this scenario when it is apparent that a given css property is core to configuring a component, and it doesn't make sense to use an abstraction.

```tsx
position?: CSSProperties['position'];

const cssStyles = [
  { position }
];
```

## Component props that enable styles

### Building an array of styles

Use an array inside of the `css` prop for optimal style composition and class name generation. This is relevant even if only a single style object is passed.

_examples from [avatar.tsx](https://github.com/elastic/eui/blob/main/src/components/avatar/avatar.tsx)_

```tsx
export const EuiAvatar: FunctionComponent<EuiAvatarProps> = ({...}) => {
  // access the theme and compute avatar's styles
  const euiTheme = useEuiTheme();
  const styles = euiAvatarStyles(euiTheme);

  ...

  // build the styles array
  const cssStyles = [
    styles.euiAvatar, // base styles
    styles[size], // styles associated with the `size` prop's value
    styles[type], // styles associated with the `type` prop's value

    // optional styles
    isPlain && styles.plain,
    isSubdued && styles.subdued,
    isDisabled && styles.isDisabled,
  ];

  ...

  // pass the styles array to the `css` prop of the target element
  return (
    <div css={cssStyles} />
  )
}
```

### If a prop's value renders no styles

A. If it's necessary to still know the prop value while debugging, create an empty css`` map for that value

```tsx
paddingSize = 'none';

const euiComponentStyles = ({
  none: css``
})
```

B. If it's mostly just an empty default state, check for that prop before grabbing the css value

```tsx
paddingSize = 'none';

const cssStyles = [
  paddingSize === 'none' ? undefined : styles[paddingSize]
]
```

## Style maps

When building styles based on an array of possible prop values, you'll want to establish the array of values first in the component file then use that array to create your prop values and your styles map.

```tsx
export const SIZES = ['s', 'm', 'l', 'xl', 'xxl'] as const;
export type EuiComponentNameSize = typeof SIZES[number];

export type EuiComponentNameProps = CommonProps & {
  size?: EuiComponentNameSize;
};

export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({...}) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName, styles[size]];

  return (
    <div css={cssStyles} />
  )
}
```

```ts
const componentSizes: {
  [size in EuiComponentNameSize]: _EuiThemeSize;
} = {
  s: 'm',
  m: 'base',
  l: 'l',
  xl: 'xl',
  xxl: 'xxl',
};

export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css``,

  // Sizes
  s: css`
    width: ${euiTheme.size[componentSizes.s]};
    height: ${euiTheme.size[componentSizes.s]};
  `,
  m: css`
    width: ${euiTheme.size[componentSizes.m]};
    height: ${euiTheme.size[componentSizes.m]};
  `,
  ...etc
});
```

## Style helpers

EUI components often have style variants that use a similar patterns. In these cases, consider creating a helper function to create repetitive styles.

```ts
const _componentSize = ({
  size,
  fontSize,
}: {
  size: string;
  fontSize: string;
}) => {
  return `
    width: ${size};
    height: ${size};
    line-height: ${size};
    font-size: ${fontSize};
  `;
};
```

The helper function can then be used in the exported style block:

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Sizes
  s: css(
    _componentSize({
      size: euiTheme.size.l,
      fontSize: euiTheme.size.m,
    })
  ),
  m: css(
    _componentSize({
      size: euiTheme.size.xl,
      fontSize: `calc(${euiTheme.size.base} * 0.9)`,
    })
  ),
  l: css(
    _componentSize({
      size: euiTheme.size.xxl,
      fontSize: `calc(${euiTheme.size.l} * 0.8)`,
    })
  ),
});
```

Note that the helper function returns a string literal instead of a `css` method from `@emotion/react`. This reduces the serialization work at runtime and makes the helper more flexible (e.g., could be used with a `style` attribute). Also note that the `css` method from `@emotion/react` can be [called as a normal function](https://emotion.sh/docs/@emotion/css#css) instead of as a template literal.

## Conditional styles

Styles can be added conditionally based on environment variables, such as the active theme, using nested string template literals.

```ts
`
    color: colors.primary;
    background: ${colorMode === 'light' ? 'white' : 'black'`}
`
```

Although possible in some contexts, it is not recommended to "shortcut" logic using the `&&` operator. Use ternary statements to avoid `undefined` statments from entering the compiled code.

```ts
`${font.body.letterSpacing ? `letter-spacing: ${font.body.letterSpacing}` : ''`}`
```

## Duplicate styles

When writing styles for prop enums (e.g. sizing enums: `s`, `m`, `l`, etc.), some props may have duplicated styles between two values. If the duplicated styles are just a line or two, repeating the CSS is not particularly problematic.

However, if the repeated CSS starts to get lengthy or unintuitive, consider using a [JS getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) to return duplicate styles, for example:

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Sizes
  s: css`
    /* lengthy or complex styles */
  `,
  get m() {
    // Same as `s`
    return this.s;
  },
  l: css`
    /* different styles */
  `,
});
```

For a production example of this scenario, see [EuiStep's styles](https://github.com/elastic/eui/blob/ea535de773703ec225804228aa3aa68d18d84dc5/src/components/steps/step.styles.ts#L86-L105).

## Child selectors

Most components also contain child elements that have their own styles. If you have just a few child elements, consider having them in the same function.

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css``,
  euiComponentName__child: css``
});
```

```tsx
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({...}) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName];
  const cssChildStyles = [styles.euiComponentName__child];

  return (
    <div css={cssStyles}>
      <span css={cssChildStyles} />
    </div>
  )
}
```

If you have multiple child elements, consider grouping them in different theme functions to keep things tidy. Keep them within a single `styles.ts` file if they exist in the same `.tsx` file.

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css``
});

export const euiComponentNameHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName__header: css``,
  euiComponentName__headerIcon: css``,
  euiComponentName__headerButton: css``
});

export const euiComponentNameFooterStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName__footer: css``
});
```

```tsx
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({...}) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName];

  const headerStyles = euiComponentNameHeaderStyles(euiTheme);
  const cssHeaderStyles = [headerStyles.euiComponentName__header];
  const cssHeaderIconStyles = [headerStyles.euiComponentName__headerIcon];
  const cssHeaderButtonStyles = [headerStyles.euiComponentName__headerButton];

  const footerStyles = euiComponentNameFooterStyles(euiTheme);
  const cssFooterStyles = [footerStyles.euiComponentName__footer];

  return (
    <div css={cssStyles}>
      <div css={cssHeaderStyles}>
        <span css={cssHeaderIconStyles} />
        <button css={cssHeaderButtonStyles}>My button</button>
      </div>
      <div css={cssFooterStyles} />
    </div>
  )
}
```

### Merging child element css with spread operators

Please keep in mind that while Emotion will automatically merge `css` props for **top** level components, it will **not** do so for any child elements. Take for example the following component:

```tsx
// This example is incorrect!
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({ iconProps, ...rest }) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName];
  const cssIconStyles = [styles.euiComponentName__icon];

  return (
    // This will merge Emotion CSS as expected
    <div css={cssStyles} {...rest}>
      <EuiIcon
        // This will not!
        css={cssIconStyles}
        {...iconProps}
      />
    </div>
  )
}
```

If a consumer passes `<EuiComponentName css={{ color: 'red' }}>`, Emotion will automatically correctly combine EUI's component styles and the passed custom styles.

**However**, if a consumer passes `<EuiComponentName iconProps={{ css: { color: red } }}>`, Emotion will **not** handle merging in the child `css` props and will simply override/ignore whichever `css` prop came first in the prop order.

To ensure consumers do not either accidentally wipe our EUI's default styling, or are unable to pass in child `css` props, always check that you're manually merging in any `childProps.css` like so:

```tsx
// This example will correctly merge child CSS
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({ iconProps, ...rest }) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName];

   // Include `childProps?.css` in the css array
  const cssIconStyles = [styles.euiComponentName__icon, iconProps?.css];

  return (
    <div css={cssStyles} {...rest}>
      <EuiIcon
        // Ensure that your merged `css` array comes after the props spread
        {...iconProps}
        css={cssIconStyles}
      />
    </div>
  )
}
```

You can confirm that this behavior correctly merges Emotion CSS by using the `shouldRenderCustomStyles` test utility. Example usage:

```tsx
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/';

describe('EuiComponentName', () => {
  shouldRenderCustomStyles(<EuiComponentName />, {
    childProps: ['iconProps']
  });

  it('renders', () => {
    // ...
  })

  it('renders `iconProps`', () => {
    render(<EuiComponentName iconProps={requiredProps} />)
  });
});
```

## Nested selectors

For the most part, nested selectors should not be necessary. If a child element requires styling based on the parent's variant, pass the same variant type to the child element.

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css``,
  // Sizes
  s: css``,
  m: css``,
});

export const euiComponentNameChildStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName__child: css``,
  // Sizes
  s: css``,
  m: css``,
});
```

```tsx
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({...}) => {
  const euiTheme = useEuiTheme();

  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName, styles[size]];

  const childStyles = euiComponentNameChildStyles(euiTheme);
  const cssChildStyles = [childStyles.euiComponentName__child, childStyles[size]];

  return (
    <div css={cssStyles}>
      <span css={cssChildStyles} />
    </div>
  )
}
```

If for other reasons, it is absolutely necessary to target a child from within another selector, you should use the [class attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to match a part of the class string you expect to find.

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css`
    [class*="euiComponentName__child"] {}
  `,
});
```

## Creating `colorMode` specific components

When creating components that rely on a specific `colorMode` from `<EuiThemeProvider>`, use this pattern to create a wrapper that will pass the entire component `<EuiThemeProvider>` details.

- `_EuiComponentName` is an internal component that contains the desired functionality and styles.
- `EuiComponentName` is the exportable component that wraps `_EuiComponentName` inside of `<EuiThemeProvider>`.

```tsx
const _EuiComponentName = ({ componentProps }) => {
  return <div />;
}

export const EuiComponentName = ({ componentProps }) => {
    const Component = _EuiComponentName;
    return (
      <EuiThemeProvider colorMode={ colorMode }>
        <Component {...componentProps} />
      </EuiThemeProvider>
    );
  }
);
```

**[Refer to EuiBottomBar to see an example of this pattern in practice and as an example of using `forwardRef`.](../src/components/bottom_bar/bottom_bar.tsx)**

## Emotion mixins & utilities

When creating mixins & utilities for reuse within Emotion CSS, consider the following best practices:

- Publicly-exported mixins & utilities should go in [`src/global_styling/mixins`](https://github.com/elastic/eui/tree/main/src/global_styling/mixins). Utilities that are internal to EUI only should live in [`src/global_styling/functions`](https://github.com/elastic/eui/tree/main/src/global_styling/functions).
- If the mixin is simple and does not reference `euiTheme`, you do not need to create a hook version of it.
- In general, prefer returning CSS strings in your mixin.
  - However, you should consider creating a 2nd util that returns a style object instead of a CSS string if the following scenarios apply to your mixin usage:
    - If you anticipate your mixin being used in the `style` prop instead of `css` (since React will want an object and camelCased CSS properties)
    - If you want your mixin to be partially composable, so if you think developers will want to obtain a single line/property from your mixin instead of the entire thing (e.g. `euiFontSize.lineHeight`)

## JS vs. CSS component variables

In general, most component-specific style variables can remain JS-only (e.g., [euiStepVariables](https://github.com/elastic/eui/blob/068f0000532e6433383093d3488d7b1c4979c022/src/components/steps/step.styles.ts#L13-L19), [euiFormVariables](https://github.com/elastic/eui/blob/d39c0e988409f90f62af57174590044664b2bfce/src/components/form/form.styles.ts#L19)). These JS variable examples are generally used internally by EUI, and are not public top-level exports.

There are some scenarios, however, where certain component style variables are important enough to be made globally available via a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

An example of this is **EuiHeader**: Fixed header height(s) and the page offset they cause need to be accounted for by multiple other EUI components (e.g. **EuiFlyout**, **EuiPageTemplate**), and potentially by custom consumer layouts. Using a global CSS variable allows **EuiHeader** to dynamically track the number of fixed headers and calculate total height in a single place. Other components can reuse that CSS variable without extra JS logic needed ([#7144](https://github.com/elastic/eui/pull/7144)).

EUI components can set CSS variables in two places: globally, or at the nearest **EuiThemeProvider** wrapper level:

```tsx
import React, { useEffect } from 'react';
import { useEuiTheme, useEuiThemeCSSVariables } from '../../services';

const EuiComponent = ({ ...props }) => {
  const { euiTheme } = useEuiTheme();
  const {
    setGlobalCSSVariables,
    setNearestThemeCSSvariables,
  } = useEuiThemeCSSVariables();

  useEffect(() => {
    // Sets the CSS variable at `:root`
    setGlobalCSSVariables({ '--euiSomeGlobalVariable': euiTheme.color.success });

    // Sets the CSS variable on the nearest parent theme provider wrapper
    // If the nearest provider is EuiProvider, the variable is set globally on `:root` in any case
    setNearestThemeCSSVariables({ '--euiSomeThemeVariable': euiTheme.size.m });
  }, []);

  return <></>;
}
```

While a global CSS variable makes sense for **EuiHeader**, for most components, nearest theme variables would likely make more sense. For example, **EuiForm** should respect any custom theme modifications and pass its modified form variables to any children, but not siblings or parent forms that do not have modifications.

```tsx
// Normal form
<EuiForm>
  {/* ... Form controls that inherit global form variables */}
</EuiForm>

// Form with a custom size scale
<EuiThemeProvider modify={{ base: 10 }}>
  <EuiForm>
    {/* ... Form controls that inherit from the nearest theme variables */}
  </EuiForm>
</EuiThemeProvider>
```

[See our EuiThemeProvider stories](http://localhost:6006/?path=/story/euithemeprovider--css-variables-nearest) to view an example of this behavior in the browser.

### Naming

When naming your mixins & utilities, consider the following statements:

- Always prefix publicly-exported functions with `eui` unless it's purely a generic helper utility with no specific EUI consideration
- When creating both a returned string version and object version, append the function name with `CSS` for strings and `Style` for objects. Example: `euiMixinCSS()` vs `euiMixinStyle()`.

### API pattern

For consistency, use the following pattern for style mixins that accept required and/or optional arguments:

```ts
const euiMixin = (
  euiTheme: UseEuiTheme;
  required: RequiredProperty;
  optional?: {
    optionalKey1?: OptionalProperty;
    optionalKey2?: OptionalProperty;
  }
) => {}
```

If the mixin does not accept required or optional properties, the argument can be removed.

## Writing unit tests for output styles

If using complex utilities or calculations that leaves you unsure as to the output of your styles, it may be worth writing Jest snapshot tests to capture the final output. See [EuiText's style](https://github.com/elastic/eui/blob/main/src/components/text/text.styles.test.ts) [snapshots](https://github.com/elastic/eui/blob/main/src/components/text/__snapshots__/text.styles.test.ts.snap) or [EuiTitle](https://github.com/elastic/eui/blob/main/src/components/title/title.styles.test.ts) for an example of this.

If writing straightforward or static CSS, unit tests should be unnecessary.

## FAQ

### Can the `css` prop be forwarded to a nested element?

Emotion converts the `css` prop to a computed `className` value, merging it into any existing `className` prop on an element. We do not parse or handle these in any special way, so whichever element the `className` prop is applied to receives the styles created by Emotion. See https://codesandbox.io/s/emotion-css-and-classname-ohmqe7 for a playground demonstration.

Sometimes apps want or need to provide styles (or other props) to multiple elements in a component, and in these cases we add a prop to the component that captures the extra information, spreading it onto the element. We can continue with this approach, allowing the `css` prop to be added for flexible styling.

### Which element in a custom component gets the `css` styling?

Same as the above answer, whichever element is given the generated `className` is the styles' target.

### How should `createElement` usages be converted?

Emotion provides its own `createElement` function; existing uses of `import {createElement} from 'react'` can be converted to `import {createElement} from '@emotion/react'`

### Why is stylelint / `yarn lint-css-in-js` giving me an `Unknown word (CssSyntaxError)` error?

Unfortunately, a limitation of the CSS-in-JS syntax parser we're using is that `//` comments throw this error (see https://github.com/hudochenkov/postcss-styled-syntax#known-issues).

You must convert all `//` comments to standard CSS `/* */` comments instead.

### Should I use Emotion's `css={theme => {}}` API?

No. The [Emotion theme context](https://emotion.sh/docs/theming) that we include by default in `EuiThemeProvider` is intended for **consumer usage** and convenience, particularly with the goal of making adoption by Kibana devs easier.

It is not intended for internal EUI usage, primarily because it can be too easily overridden by consumers who want to use their own custom Emotion theme vars and set their own `<ThemeProvider>`. If this happens, and we're relying on Emotion's theme context, all of EUI's styles will break.

When you're styling EUI components internally, you should use only EUI's theme context/`useEuiTheme()`, and not on Emotion's theme context (i.e., do not use the `css={theme => {}}` API).
