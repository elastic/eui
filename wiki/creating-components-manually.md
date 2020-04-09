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

#### Ask yourself
- Does this snippet provide the consumer with everything it needs for the component to work?
- Does this snippet provide the details of a specific object the component needs to work?
- If it doesn't provide either and the whole demo JS is needed for the component to work, then it's probably best to not add a snippet.

#### Stay consistent
- Don't use `this.`, but write the snippet like a **Function Component**.
- Use descriptive JS variables in place of **consumer generated** strings, functions, states and node prop types.
- All other props, like enums, should be written with proper value types.

``` js
<EuiPopover
  id={popoverId}
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft"
>
  <!-- Popover content -->
</EuiPopover>
```

- If the demo code provides lots of examples, this is probably mostly for us maintainers to manage all the different states. However, **the consumer really just needs a single basic snippet**. In some cases, you can add a second one with the **most commonly used props**. The basic example should always come first.

```js
<EuiLink href="#"><!-- Link text --></EuiLink>
```

```js
<EuiLink href="#" color="secondary">
  <!-- Colored link text -->
</EuiLink>
```


- Use HTML comments to suggest what the `children` might be.

``` js
<EuiText color="danger"><!-- Raw HTML content --></EuiText>
```

- The snippet should illustrate when a component requires its children to be wrapped with a specific tag.

``` js
<EuiCallOut>
  <p><!-- Content --></p>
</EuiCallOut>
```

- When a component contains a single element child the snippet should illustrate it. Enforce best practices by providing a description.

``` js
<EuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2> 
</EuiTitle>
```

- When a prop receives an array of objects, display only one object and show all the required keys.

``` js
<EuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>
```

[docs]: https://elastic.github.io/eui/
[docs-logical-group]: creating-components.md#logically-grouped-components
