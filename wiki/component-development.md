# Component Development

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

## Benefits

### Dynamic, interactive documentation

By having a "living style guide", we relieve our designers of the burden of creating and maintaining
static style guides. This also makes it easier for our engineers to translate mockups, prototypes,
and wireframes into products.

### Copy-pasteable UI

Engineers can copy and paste sample code into their projects to quickly get reliable, consistent results.

### Remove CSS from the day-to-day

The CSS portion of this framework means engineers don't need to spend mental cycles translating a
design into CSS. These cycles can be spent on the things critical to the identity of the specific
project they're working on, like architecture and business logic.

If they use the React components, engineers won't even need to _look at_ CSS -- it will be encapsulated
behind the React components' interfaces.

### More UI tests mean fewer UI bugs

By covering our UI components with great unit tests and having those tests live within the framework
itself, we can rest assured that our UI layer is tested and remove some of that burden from our
integration/end-to-end tests.

## Why not just use Bootstrap?

In short: we've outgrown it! Third-party CSS frameworks like Bootstrap and Foundation are designed
for a general audience, so they offer things we don't need and _don't_ offer things we _do_ need.

As a result, we've been forced to override their styles until the original framework is no longer
recognizable. When the CSS reaches that point, it's time to take ownership over it and build
your own framework.

We also gain the ability to fix some of the common issues with third-party CSS frameworks:

* They have non-semantic markup.
* They deeply nest their selectors.

For an in-depth analysis of the shortcomings in Bootstrap (and similar frameworks), read [Bootstrap Bankruptcy][bootstrap] and follow the recommended links near the end.

[kibana-css]: https://github.com/elastic/kibana/blob/master/style_guides/css_style_guide.md
[kibana-scss]: https://github.com/elastic/kibana/blob/master/style_guides/scss_style_guide.md
[bootstrap]: http://www.matthewcopeland.me/blog/2013/11/04/bootstrap-bankruptcy/
[docs]: https://elastic.github.io/eui/
[testing]: testing.md
[docs-yeoman]: creating-components-yeoman.md
[docs-manual]: creating-components-manually.md
