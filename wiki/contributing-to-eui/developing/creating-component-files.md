# Component file & folder architecture

## Creating components manually

### Create the component directory

1. Create a directory for your component in `packages/eui/src/components/`. All folder and file names should be `snake_cased`.

#### Logical groupings of directories

If a component has any of the following:

1. Subcomponents (`<EuiToolBar>` and `<EuiToolBarSearch>`),
2. Tightly-coupled components (`<EuiButton>` and `<EuiButtonGroup>`)
3. Or you just want to group some related components together (`<EuiTextInput>`, `<EuiTextArea>`, and `<EuiCheckBox>`)

then they belong in the same logical grouping (i.e., directory). A component directory can have as many subcomponents and corresponding `*.test.tsx` or `*.style.ts` as needed. If a component directory starts to feel overwhelmingly cluttered due to multiple internal sub-components (e.g. EuiDataGrid), make liberal use of subdirectories to help organize your component by concern or by feature.

### Create the React component

1. Create the React component(s) as TypeScript `.tsx` file(s) in your new component directory.
2. Export these components from an `index.ts` file.
3. Re-export these components from `packages/eui/src/components/index.ts`.

This makes your React component available for import into your project.

### Create component style files

1. Create a `{component name}.styles.ts` file inside the same component directory.

Refer to the [Writing styles with emotion](./writing-styles-with-emotion.md) guidelines for more instruction.

### Create tests and documentation examples

Your component folder should also contain `{component name}.test.tsx` unit tests for each component being created/exported. [See the testing wiki resources for more in-depth guidelines](../testing/).

Your component should have a corresponding `packages/website/` documentation page or example. [See the documenting wiki resources for more guidelines](../documenting/).

## Creating components with Yeoman

From the command line, run the following command:

```shell
yarn yo-component
```

First, you'll be prompted for what kind of component to create:

| Choice             | Description                               |
|--------------------|-------------------------------------------|
| Stateless function | A stateless functional React component    |
| Component class    | A class-based React component             |

Next, you'll reply to a series of prompts.

### "What's the name of this component?"

Yeoman will ask you what to name the file. It expects you to provide the name in snake case. Yeoman will automatically add file extensions and a "eui" prefix so you should leave those out.

### "Where do you want to create this component's files?"

The path to the directory where the files should live. Defaults to the last directory you specified for this prompt, or to EUI's components directory if you haven't specified one.

If you want Yeoman to automatically generate a directory to organize the files, that directory will be created inside of the location you specify (see next prompt).

### "Does it need its own directory?""

This will automatically generate a directory with the same name as the file, but without a "eui" prefix. This defaults to `YES`.

### Done!

Yeoman will generate the files you need in your project's folder system.

For your convenience, it will also output some snippets you can tweak to import and re-export the generated JS and style files.

### Generating documentation

To also use Yeoman to generate component documentation, see [creating documentation pages with Yeoman](../documenting/creating-documentation-pages.md#creating-documentation-pages-with-yeoman).
