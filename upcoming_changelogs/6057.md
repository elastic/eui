- Enhanced `euiBreakpoint` mixin by creating the option to generate `min-width` only and `max-width` only media queries ([#6057](https://github.com/elastic/eui/pull/6057))

**Breaking changes**

- When `euiBreakpoint` is passed a single element array and the element is not `xs` or `xl`, a media query will not be generated ([#6057](https://github.com/elastic/eui/pull/6057))

**CSS-in-JS conversions**

- Converted `euiBreakpoint` mixin to Emotion ([#6057](https://github.com/elastic/eui/pull/6057))