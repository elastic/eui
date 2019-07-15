# Creating components manually

## Create component SCSS files

1. Create a directory for your component in `src/components`.
2. In this directory, create `_{component name}.scss`.
3. _Optional:_ Create any other components that should be [logically-grouped][docs-logical-group] in this directory.
4. Create an `_index.scss` file in this directory that import all of the new component SCSS files you created.
5. Import the `_index.scss` file into `src/components/index.scss`.

This makes your styles available to your project and to the [EUI documentation][docs].

## Create the React component

1. Create the React component(s) (preferably as TypeScript) in the same directory as the related SCSS file(s).
2. Export these components from an `index.ts` file.
3. Re-export these components from `src/components/index.js`.

This makes your React component available for import into your project.

## Document the component with examples

1. Create a directory for your example in `src-docs/src/views`. Name it the name of the component.
2. Create a `{component name}_example.js` file inside the directory. You'll use this file to define the different examples for your component.
3. Add the route to this file in `src-docs/src/services/routes/routes.js`.
4. In the `{component name}_example.js` file you created, define examples which demonstrate the component and describe its role from a UI perspective.

The complexity of the component should determine how many examples you need to create, and how complex they should be. In general, your examples should demonstrate:

* The most common use-cases for the component.
* How the component handles edge cases, e.g. overflowing content, text-based vs. element-based content.
* The various states of the component, e.g. disabled, selected, empty of content, error state.

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


[docs]: https://elastic.github.io/eui/
[docs-logical-group]: creating-components.md#logically-grouped-components
