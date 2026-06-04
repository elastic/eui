# Component development & architecture

Before working with EUI components or creating new ones, you will want to [run a local development server](../running-eui-locally.md). EUI has two complementary local servers:

- **Storybook** at [http://localhost:6006/](http://localhost:6006/) — the recommended environment for component development.
- **Docusaurus website** at [http://localhost:3000/](http://localhost:3000/) — the consumer-facing documentation site.

Both servers watch for source changes and recompile automatically.

## Component creation

There are four steps to creating a new component:

1. Create the React portion of the component
    - See [Component file & folder architecture](./creating-component-files.md) for more detailed steps on how to spin up new files
2. Create the styles
    - See [Writing styles with Emotion](./writing-styles-with-emotion.md)
3. Write tests
    - All components should have at minimum [unit tests](../testing/unit-testing.md)
    - For more, see the dedicated [testing wiki docs](../testing/)
4. Document it with examples in `packages/website`
    - See the dedicated [documentation wiki guidelines](../documenting/)

## Component patterns

We use a number of patterns and conventions throughout our components for naming, [props](./props.md), [refs](./refs.md), and [icons](./creating-icons.md) that should be followed whenever possible.
