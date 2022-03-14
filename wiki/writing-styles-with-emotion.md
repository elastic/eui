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
  const styles = euiComponentStyles(theme);

  return (
    <div css={[styles]} />
  );
};
```

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
<EuiComponent css={[styles.default, styles.stateful]} />
```
