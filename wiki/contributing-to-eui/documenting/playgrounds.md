## Playgrounds

Most documentation pages include a [playground section](https://elastic.github.io/eui/#/layout/accordion/playground) where consumers can interact with the component's props to see in real time how different configurations affect visual and functional output. Generally, the playground system will automatically generate the correct toggle type; for instance, a text input for props that accept string values, and a switch input for props that accept boolean values.

## Adding playground toggles

### Toggles for required props

Props marked required for a component typically do not have default values and therefore need to be set for the playground to work well. For example, the `children` prop, which can be set in the component's [`playground.js` file](https://github.com/elastic/eui/blob/main/src-docs/src/views/accordion/playground.js):

```js
propsToUse.children = {
  value: `<EuiText>
    <p>
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </p>
  </EuiText>`,
  type: PropTypes.ReactNode,
  hidden: false,
};
```

### Custom or altered toggles

Some props accept values that are difficult to parse or require knowledge about how the prop should be used to determine the type of toggle to use. For example, callback function props such as `onToggle`. For cases like this we may provide utility functions to help:

```js
propsToUse.onToggle = simulateFunction(propsToUse.onToggle);
```

Or perhaps the prop accepts a wide range of values and the best user experience would be to limit the value to a simpler input:

```js
propsToUse.valueAppend = {
  ...propsToUse.valueAppend,
  type: PropTypes.String,
};
```

### Toggles for complex or markup-heavy props

Not all props lend themselves to becoming helpful playground toggles. For instance, optional "action" props that require the consumer to provide a fully configured button or link element. In cases such as this, it is acceptable to omit the toggle and rely on prop table documentation to convey how the prop is best used.
