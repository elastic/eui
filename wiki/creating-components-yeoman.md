# Creating components with Yeoman

## Create a new component

From the command line, run the following command:

```shell
npm run yo-component
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

For your convenience, it will also output some snippets you can tweak to import and re-export the generated JS and SCSS files.

## Documenting the component with examples

From the command line, run the following command:

```shell
npm run yo-doc
```

First, you'll be prompted for what kind of documentation to create:

| Choice             | Description                                               |
|--------------------|-----------------------------------------------------------|
| Component documention page               | A new page for documenting a component |
| Add example to an existing page         | A new subsection of an existing documentation page   |
| Sandbox            | An empty document where you can do pretty much anything   |

Follow the prompts and your documentation files will be created. You can use the snippets that are printed to the terminal to integrate these files into the EUI documentation site.

The script will ask you for the name of the component you'd like to document, then create some files in `src-docs/src/views/`. If the name you provide isn't the exact name of a component, you might need to adjust the `import` in the generated files. Otherwise simply add the document to the `src-docs/src/services/routes/routes.js` file to make it available in the browser.

### Adding snippets
There are a couple themes to keep in mind when adding snippets:

1. **Ask yourself**
   a. Does this snippet provide the consumer with everything it needs for the component to work?
   b. Does this snippet provide the details of a specific object the component needs to work?
   c. If it doesn't provide either and the whole demo JS is needed for the component to work, then it's probably best to not add a snippet.
2. **Stay consistent**
   a. When using text should it display actual strings or comments?
   b. Don't use `this.` for variables, only for `this.state` or functions
3. If the demo code provides lots of examples, this is probably mostly for us maintainers to manage all the different states. However, **the consumer really just needs a single basic snippet** with maybe a few self-explanatory props added that can be removed by the consumer. When there are more than 2 or 3 snippets it's hard to know what the differences are among them.
