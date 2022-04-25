# Writing styles with Emotion

EUI uses [`Emotion`](https://emotion.sh/) when writing CSS-in-JS styles.
A general knowledge of writing CSS is enough in most cases, but there are some JavaScript-related differences that can result in unintended output. Similarly, there are feaures that don't exist in CSS of which we like to take advantage.


## File patterns

```ts
/* {component name}.styles.ts */
import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiComponentNameStyles = ({ euiTheme }: UseEuiTheme) => {
  return css`
    color: ${euiTheme.colors.primary};
  `;
};
```

```tsx
/* {component name}.tsx */
import { useEuiTheme } from '../../services';
import { euiComponentNameStyles } from './{component name}.styles.ts';

export const EuiComponent = () => {
  const theme = useEuiTheme();
  const componentStyles = euiComponentNameStyles(theme);
  const styles = [componentStyles]

  return (
    <div css={styles} />
  );
};
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
export const euiComponentStyles = ({ euiTheme }: UseEuiTheme) => ({
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

```
`
    color: colors.primary;
    background: ${colorMode === 'light' ? 'white' : 'black'`}
`
```

Although possible in some contexts, it is not recommended to "shortcut" logic using the `&&` operator. Use ternary statements to avoid `undefined` statments from entering the compiled code.

```
`${font.body.letterSpacing ? `letter-spacing: ${font.body.letterSpacing}` : ''`}`
```

## The `css` prop

_Work in progress_

* Use an array inside of the `css` prop for optimal style composition and class name generation. This is relevant even if only a single style object is passed.

```tsx
const styles = [componentStyles.default, componentStyles.stateful];
return (
  <EuiComponent css={styles} />
);
```
