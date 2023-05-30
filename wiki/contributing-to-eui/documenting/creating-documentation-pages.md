# Creating documentation example pages

Code for the Elastic UI [documentation site](https://elastic.github.io/eui/#/) can be found in the `src-docs` directory.

## Documenting new components

### Creating documentation pages with Yeoman

From the command line, run the following command:

```shell
yarn yo-doc
```

First, you'll be prompted for what kind of documentation to create:

| Choice             | Description                                               |
|--------------------|-----------------------------------------------------------|
| Component documentation page    | A new page for documenting a component |
| Add example to an existing page | A new subsection of an existing documentation page |
| Sandbox                         | An empty document where you can do pretty much anything |

Follow the prompts and your documentation files will be created. You can use the snippets that are printed to the terminal to integrate these files into the EUI documentation site.

The script will ask you for the name of the component you'd like to document, then create some files in `src-docs/src/views/`. If the name you provide isn't the exact name of a component, you might need to adjust the `import` in the generated files. Otherwise simply add the document to the `src-docs/src/routes.js` file to make it available in the browser.

### Creating documentation pages manually 

- [ ] In `src-docs/src/views`, create a directory with the [snake_case](https://en.wikipedia.org/wiki/Snake_case) name of the component being documented.
- [ ] Define examples which demonstrate the component and describe its role from a UI perspective. File names should follow the `{component}_{example name}.tsx` naming structure (i.e. `accordion_isLoading.tsx`).
- [ ] Create a `{component}_example.js` file in the new directory. It will combine the code snippets, examples, and documentation copy into one file that will be used to generate the full page for the new component. To learn more about the configuration for `example.js`, see [creating the component example file](#creating-the-component-example-file) below.
- [ ] Create a route for the component's documentation by importing the `example` component from `{component}_example.js` in `src-docs/src/routes.js`. After importing, locate the `navigation` array and add the component to the most appropriate section.
 
## Documenting existing components with new examples

- [ ] Locate the desired component directory in `src-docs/src/views` and define new examples which demonstrate the component and describe its role from a UI perspective. File names should follow the `{component}_{example name}.tsx` naming structure (i.e. `accordion_isLoading.tsx`).
- [ ] Locate the `example` file in the directory. It should be named `{component}_example.js`. Configure the new example component by importing it, adding new code snippets, and creating a new entry in the documentation object. To learn more about the configuration for `example.js`, see [creating the component example file](#creating-the-component-example-file) below.

## Creating the component `example` file

Each component documented in `src-docs/src/views` should have one `{component}_example.js` file. This file is responsible for combining all code snippets and documentation copy, then renders the examples and copy together on one page.

### Required imports and variables

Each component and code sample should have the following elements:
- An import from the component example file. This should come from `src-docs/src/views/{component}`.

   **Example**
```tsx
   import AccordionIsLoading from './accordion_isLoading'; 
```

- A variable to employ Webpack's `raw-loader` to store the example's source code as a string. This will be rendered in the Demo JS tab.

   **Example**
```tsx
   const accordionSource = require('!!raw-loader!./accordion');
```

- A simplified code sample without imports/exports, additional functions, and variable declarations to highlight specific component props and functionality. Code snippets should use (but not define) variables to prompt users to implement their own context. This will be used in the Snippet tab.

   **Example**
```tsx
const isLoadingSnippet =  `<EuiAccordion
   id={accordionId1}
   buttonContent="Clickable title">
   <!-- Content to show when expanded -->
</EuiAccordion>`;
```

### Composing the documentation object

After importing and storing the values for each component code sample, combine the examples in an object that will be used to construct the component's documentation page.

#### Object structure

```tsx
export const AccordionExample = {
    title: 'Accordions',
    intro: <EuiText><p>Optional introduction to the general component.</p></EuiTex>,
    sections: [
        {
            title: 'Loading accordions',
            text: <><p>Description of the specific example.</p></>,
            demo: <AccordionIsLoading />,
            source: [
                {
                    type: GuideSectionTypes.JS,
                    code: accordionSource
                }
            ],
            playground: accordionPlaygroundConfig,
            props: { EuiAccordion },
            snippet: isLoadingSnippet
        }
    ]
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
| title | string | The name of the component and the title that will be used as the header of the documentation page
| isNew | boolean | (Optional) A flag that adds a badge titled "NEW" next to the component name in the side nav and page header. See [marking components in the new and beta phases](#marking-components-in-the-new-and-beta-phases)
| isBeta | boolean | (Optional) A flag that adds a badge titled "BETA" next to the component name in the side nav and page header. See [marking components in the new and beta phases](#marking-components-in-the-new-and-beta-phases)
| intro | `jsx` element | (Optional) A quick intro about the component. Must be wrapped in an `EuiText` block.
| sections | object array | An array of all examples and code snippets relevant to this component. There should be one object per component example
| title | string | Title for the component example
| source | object array | An array of code samples and file types that belong to a component example
| type | string | The type of file used to create the component (i.e. `js`, `tsx`, etc.). Use `GuideSectionTypes` (found at `src-docs/src/components/guide_section/guide_section_types.tsx`) for this configuration
| code | string | The source code for the code sample. This will likely be the variable defined to store the component's source code via Webpack's `raw-loader` as explained in [required imports and variables](#required-imports-and-variables)
| text | `jsx` element | Text to fully explain and document the component and example being showcased. This is automatically wrapped in `<EuiText>` so be sure to wrap your text with `<p>` tags.
| demo | React component | The example component created to document and showcase specific features
| playground | function | (Optional) The function used to configure the playground testing area for the component.
| props | React component | The EUI component being documented (the original component, not examples of the component)
| snippet | string | A simplified code sample without to highlight specific component props and functionality as explained in [required imports and variables](#required-imports-and-variables)

### Marking components in the `Beta` and `New` phases

The `Beta` and `New` flags are ways to indicate that a component is new or ready for user testing. These flags are added as badges next to the component name in the documentation site navigation.

#### When to use the flags

##### Beta
The `Beta` badge should be used when a component is first added to EUI. This badge signifies that the component may change frequently or without notice as a result of user testing and improvements.

*Exception*: Self-evident and less complex components may skip the beta phase.

The criteria for the beta phase should be determined as a team. Examples may include:
- Implementing the component in X areas
- Completing X rounds of user testing

##### New
The `New` badge should be used after a component has completed the beta period or if there has been a significant change in functionality for a component. This also signifies that the component is no longer in a stage of user testing.

#### Badge maintenance

When a tag is added to a component, an entry for its tentative removal date should be added to the [EUI Deprecations Schedule](https://github.com/elastic/eui/issues/1469). This helps to ensure that the badges are up to date and do not become stale.

Badges should typically stay up for 1-3 months at most.
