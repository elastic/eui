# Creating components with Yeoman

## Create a new component

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

## Generating documentation

To use Yeoman to generate component documentation, see [creating documentation pages with Yeoman](../documenting/creating-documentation-pages#creating-documentation-pages-with-yeoman)
