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
      color: ${euiTheme.colors.primaryText};
    `,
  };
};
```

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

## Child selectors

Most components also contain child elements that have their own styles. Each element should have it's own theme function to keep things tidy. Keep them within a single `styles.ts` file if they exist in the same `.tsx` file.

```ts
export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName: css``
});


export const euiComponentNameChildStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiComponentName__child: css``
});
```

```tsx
export const EuiComponentName: FunctionComponent<EuiComponentNameProps> = ({...}) => {
  const euiTheme = useEuiTheme();
  
  const styles = euiComponentNameStyles(euiTheme);
  const cssStyles = [styles.euiComponentName];
  
  const childStyles = euiComponentNameChildStyles(euiTheme);
  const cssChildStyles = [childStyles.euiComponentName__child];
  
  return (
    <div css={cssStyles}>
      <span css={cssChildStyles} />
    </div>
  )
}
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
      <span> css={cssChildStyles} />
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


## FAQ

### Can the `css` prop be forwarded to a nested element?

Emotion converts the `css` prop to a computed `className` value, merging it into any existing `className` prop on an element. We do not parse or handle these in any special way, so whichever element the `className` prop is applied to receives the styles created by Emotion. See https://codesandbox.io/s/emotion-css-and-classname-ohmqe7 for a playground demonstration.

Sometimes apps want or need to provide styles (or other props) to multiple elements in a component, and in these cases we add a prop to the component that captures the extra information, spreading it onto the element. We can continue with this approach, allowing the `css` prop to be added for flexible styling.

### Which element in a custom component gets the `css` styling?

Same as the above answer, whichever element is given the generated `className` is the styles' target.

### How should `createElement` usages be converted?

Emotion provides its own `createElement` function; existing uses of `import {createElement} from 'react'` can be converted to `import {createElement} from '@emotion/react'`
