# Component Development

For information on how to design components, see the [component design docs][component-design].

Before working with EUI components or creating new ones, you may want to run a local server for the [documentation site][docs]. This is where we demonstrate how the components in our design system work.

## Launching the Documentation Server

To view interactive documentation, start the development server using the command below.

```shell
yarn
yarn start
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

`yarn run test-unit` runs the Jest unit tests once.

`yarn run test-unit button` will run tests with "button" in the spec name. You can pass other
[Jest CLI arguments](https://facebook.github.io/jest/docs/en/cli.html) by just adding them to the
end of the command like this:

`yarn run test-unit -- -u` will update your snapshots. To pass flags or other options you'll need
to follow the format of `yarn run test-unit -- [arguments]`.
Note: if you are experiencing failed builds in Jenkins related to snapshots, then try clearing the cache first `yarn run test-unit -- --clearCache`.

`yarn run test-unit -- --watch` watches for changes and runs the tests as you code.

`yarn run test-unit -- --coverage` generates a code coverage report showing you how
fully-tested the code is, located at `reports/jest-coverage`.

Refer to the [testing guide](testing.md) for guidelines on writing and designing your tests.

Refer to the [automated accessibility testing guide](automated-accessibility-testing.md) for info more info on those.

### Testing the component with Kibana

Note that `yarn link` currently does not work with Kibana. You'll need to manually pack and insert it into Kibana to test locally.

1. In the `eui` folder, run `yarn build` then `npm pack`. This will create a `.tgz` file with the changes in your EUI directory. At this point you can move it anywhere.
2. Point the `package.json` file in Kibana to that file: `"@elastic/eui": "/path/to/elastic-eui-xx.x.x.tgz"` and run `yarn kbn bootstrap --no-validate`.
    * The `--no-validate` flag is required when bootstrapping with a `.tgz`.
    * Change the name of the `.tgz` after subsequent `yarn build` and `npm pack` steps (e.g., `elastic-eui-xx.x.x-1.tgz`, `elastic-eui-xx.x.x-2.tgz`). This is required for `yarn` to recognize new changes to the package.
3. Rebuild Kibana's shared-ui-deps by running `yarn kbn:bootstrap` inside of `kibana/packages/kbn-ui-shared-deps/`.
4. Run Kibana with `FORCE_DLL_CREATION=true node scripts/kibana --dev` to make sure it doesn't use a previously cached version of EUI.

## Principles

### Logically-grouped components

If a component has subcomponents (`<EuiToolBar>` and `<EuiToolBarSearch>`), tightly-coupled components (`<EuiButton>` and `<EuiButtonGroup>`), or you just want to group some related components together (`<EuiTextInput>`, `<EuiTextArea>`, and `<EuiCheckBox>`), then they belong in the same logical grouping. In this case, you can create additional SCSS files for these components in the same component directory.

### Writing CSS

Refer to the [SASS page][sass] of our documentation site for a guide to writing styles.

[component-design]: component-design.md
[docs]: https://elastic.github.io/eui/
[docs-yeoman]: creating-components-yeoman.md
[docs-manual]: creating-components-manually.md
[sass]: https://elastic.github.io/eui/#/guidelines/sass

## TypeScript definitions

### Pass-through props

Many of our components use `rest parameters` and the `spread` operator to pass props through to an underlying DOM element. In those instances the component's TypeScript definition needs to properly include the target DOM element's props.

A `Foo` component that passes `...rest` through to a `button` element would have the props interface

```ts
// passes extra props to a button
interface FooProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
```

Some DOM elements (e.g. `div`, `span`) do not have attributes beyond the basic ones provided by all HTML elements. In these cases there isn't a specific `*HTMLAttributes<T>` interface, and you should use `HTMLAttributes<HTMLDivElement>`.

```ts
// passes extra props to a div
interface FooProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}
```

If your component forwards the `ref` through to an underlying element, the interface is further extended with `DetailedHTMLProps`

```ts
// passes extra props and forwards the ref to a button
interface FooProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string
}
```
