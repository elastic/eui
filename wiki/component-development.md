# Component Development

For information on how to design components, see the [component design docs][component-design].

Before working with EUI components or creating new ones, you may want to run a local server for the [documentation site][docs]. This is where we demonstrate how the components in our design system work.

## Launching the Documentation Server

To view interactive documentation, start the development server using the command below.

```shell
npm start
```

Once the server boots up, you can visit it on your browser at: [http://localhost:8030/](http://localhost:8030/). The development server watches for changes to the source code files and will automatically recompile the components for you when you make changes.

## Creating Components

There are four steps to creating a new component:

1. Create the SCSS for the component in `src/components`
2. Create the React portion of the component
3. Write tests
4. Document it with examples in `src-docs`

You can do this using Yeoman, or you can do it manually if you prefer.

- [Yeoman component creation guide][docs-yeoman]
- [Manual component creation guide][docs-manual]

## Testing the component

`npm run test-unit` runs the Jest unit tests once.

`npm run test-unit button` will run tests with "button" in the spec name. You can pass other
[Jest CLI arguments](https://facebook.github.io/jest/docs/en/cli.html) by just adding them to the
end of the command like this:

`npm run test-unit -- -u` will update your snapshots. To pass flags or other options you'll need 
to follow the format of `npm run test-unit -- [arguments]`.

`npm run test-unit -- --watch` watches for changes and runs the tests as you code.

`npm run test-unit -- --coverage` generates a code coverage report showing you how
fully-tested the code is, located at `reports/jest-coverage`.

Refer to the [testing guide](testing.md) for guidelines on writing and designing your tests.

## Principles

### Logically-grouped components

If a component has subcomponents (`<EuiToolBar>` and `<EuiToolBarSearch>`), tightly-coupled components (`<EuiButton>` and `<EuiButtonGroup>`), or you just want to group some related components together (`<EuiTextInput>`, `<EuiTextArea>`, and `<EuiCheckBox>`), then they belong in the same logical grouping. In this case, you can create additional SCSS files for these components in the same component directory.

### Writing CSS

We follow Kibana's [CSS style guide][kibana-css] and [SCSS style guide][kibana-scss].

[component-design]: component-design.md
[docs]: https://elastic.github.io/eui/
[docs-yeoman]: creating-components-yeoman.md
[docs-manual]: creating-components-manually.md
[kibana-css]: https://github.com/elastic/kibana/blob/master/style_guides/css_style_guide.md
[kibana-scss]: https://github.com/elastic/kibana/blob/master/style_guides/scss_style_guide.md
