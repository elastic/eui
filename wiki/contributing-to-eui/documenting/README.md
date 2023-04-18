# Documentation guidelines

Always remember to update the [documentation site](https://elastic.github.io/eui/) via the `src-docs` folder and [add a changelog](./changelogs.md) in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no differently than how you would treat tests.

The complexity of the component should determine how many examples you need to create, and how complex they should be. In general, your examples should demonstrate:

* The most common use-cases for the component.
* How the component handles edge cases, e.g. overflowing content, text-based vs. element-based content.
* The various states of the component, e.g. disabled, selected, empty of content, error state.

Refer to [Creating documentation example pages](./creating-documentation-pages.md) for information on the process of documenting components.

## Formatting & writing style

Here are our formatting guidelines for writing documentation:

- Use sentence case, always, for page and section titles. Example: `This component does something`
- Component names:
  - When referencing the component name, wrap it in `<strong>` tags. Example: `<strong>EuiComponent</strong>`
  - When referencing the component name, always include the `Eui` prefix unless you are referencing the generic term. Example: `EuiFlyout` vs `flyout`
- Code syntax:
  - Wrap references to prop names and elements in `<EuiCode>` blocks. Example: `<EuiCode>propName</EuiCode>`
  - If the code reference is more than a single prop name or value, add the language type. Example: `<EuiCode language="js">propName=true</EuiCode>`
- Handling links:
  - When referencing another EUI component or page in the EUI docs, wrap the reference in a `react-router-dom` link. Example: `import { Link } from 'react-router-dom'; <Link to="/component/url"><strong>EuiComponent</strong><Link>`
    - Aside from the benefit of shorter path names, `react-router` will take the environment into account and provide the correct URL for both development and production environments
  - When referencing external sites or resources, use the EuiLink component instead. Example: `<EuiLink href="https://github.com/elastic/eui">View the EUI code</EuiLink>`
