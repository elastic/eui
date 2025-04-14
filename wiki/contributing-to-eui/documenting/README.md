# Documentation guidelines

Always remember to update the [documentation site](https://elastic.github.io/eui/) via the `website` folder and [add a changelog](./changelogs.md) in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no differently than how you would treat tests.

The complexity of the component should determine how many examples you need to create, and how complex they should be. In general, your examples should demonstrate:

* The most common use-cases for the component.
* How the component handles edge cases, e.g. overflowing content, text-based vs. element-based content.
* The various states of the component, e.g. disabled, selected, empty of content, error state.

Refer to [Writing documentation](./writing-documentation.md) for information on the process of documenting components.

## Formatting & writing style

Here are our formatting guidelines for writing documentation:

- Use sentence case, always, for page and section titles. Example: `This component does something`
- Component names:
  - When referencing the component name, wrap it in `<strong>` tags. Example: `<strong>EuiComponent</strong>`
  - When referencing the component name, always include the `Eui` prefix unless you are referencing the generic term. Example: `EuiFlyout` vs `flyout`
- Code syntax:
  - Wrap references to prop names and elements in code blocks. Example: \`propName\`
