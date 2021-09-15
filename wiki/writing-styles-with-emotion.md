# Writing styles with Emotion

EUI uses [`Emotion`](https://emotion.sh/) when writing CSS-in-JS styles.
A general knowledge of writing CSS is enough in most cases, but there are some JavaScript-related differences that can result in unintended output. Similarly, there are feaures that don't exist in CSS of which we like to take advantage.

## Conditional styles

Styles can be added conditionally based on environment variables, such as the active theme, using nested string template literals.

```
`
    color: colors.primary;
    font-size: ${isLegacyTheme ? '16px' : '14px'`}
`
```

Although possible in some contexts, it is not recommended to "shortcut" logic using the `&&` operator. Use ternary statements to avoid `undefined` statments from entering the compiled code.

```
`${font.body.letterSpacing ? `letter-spacing: ${font.body.letterSpacing}` : ''`}`
```

## The `css` prop

TBD