# Creating documentation example pages

Code for the Elastic UI [documentation site](https://elastic.github.io/eui/#/) can be found in the `src-docs` directory.

## Documenting new components

There are two ways to document components. To create automated documentation for components with `Yeoman`, refer to [Creating components with Yeoman](./creating-components-yeoman.md#documenting-the-component-with-examples). To document components manually, see the documentation checklist below.

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
| isNew | boolean | (Optional) A flag that adds a badge titled "new" next to the component name in the documentation site navigation 
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

### 👉 Refer to the [Documentation Guidelines](documentation-guidelines.md) for more instruction on writing docs.