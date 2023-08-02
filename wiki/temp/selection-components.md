# The Ultimate Guide to EUI Selection Components

Welcome to a comprehensive guide on EUI's many selection components. Choosing the right one may seem tricky - this guide will help you decide which component to use and when, including explanations and comparisons for each component.

![Five Spidermen are in a room, pointing at one another, as if to say "It's you! No, it's you!" Each Spiderman has the name of an EUI selection component next to them.](spiderman_selection.jpeg)

## Meet the EUI selection components

EUI currently offers **5** different selection solutions. 

### [`EuiSelect`](https://elastic.github.io/eui/#/forms/form-controls#select)
`EuiSelect` renders a basic HTML `<select>` element. This is a no-frills selection component that renders `<options>` as a string. It should be used when you need to render 7 to 12 items where only one option will be selected. **In general**, we strongly recommend reaching for `EuiSelect` first when possible over other more complex selection components. Native form controls tend to have better cross-browser and cross-device affordances (particularly for mobile devices), and are more familiar to end users due to their ubiquity across the internet.

If you would like to customize how the options are rendered and selected, you can use [`EuiSuperSelect`](#euisuperselect) instead. For lists over 12 items, consider using [`EuiComboBox`](#euicombobox) which has search and multi-select capabilities. 

### [`EuiSuperSelect`](https://elastic.github.io/eui/#/forms/super-select)
`EuiSuperSelect` gives you more control over the display of the options in the dropdown. The `dropdownDisplay` prop gives you the ability to pass in custom React nodes for each option, allowing for multi-line option text or descriptions.

### [`EuiComboBox`](https://elastic.github.io/eui/#/forms/combo-box)
`EuiComboBox` allows multiple items to be selected and shown. `EuiComboBox` allows custom user-generated content to be added to the list of available options. 

### [`EuiSelectable`](https://elastic.github.io/eui/#/forms/selectable)
`EuiSelectable` renders a searchable list where multiple options can be selected or excluded. 
 
 #### [`EuiSelectableTemplateSitewide`](https://elastic.github.io/eui/#/templates/sitewide-search)
 `EuiSelectableTemplateSitewide` is an opinionated wrapper around `EuiSelectable` and is an example of the flexibility that `EuiSelectable` offers. It renders a search input that triggers a popover containing a list of navigation options. Options many include a display label, icon, avatar, and meta text.
 
In general, we recommend its usage for a global search bar from an app-wide page header.

### [`EuiSuggest`](https://elastic.github.io/eui/#/forms/suggest)
`EuiSuggest` is generally meant to be used for technical suggest and filtering UX, alongside components such as [EuiSearchBar](https://elastic.github.io/eui/#/forms/search-bar) and [EuiFilterGroup](https://elastic.github.io/eui/#/forms/filter-group).

`EuiSuggest` requires displaying an icon and color `type` next to each dropdown item, and displays suggestions in a mono code font. It provides plenty of room for descriptions as well as longer wrapping labels and descriptions
 
`EuiSuggest`, out of the box, can also display a `saved` vs `unsaved` status (amongst other statuses) to the right of the selection input. Should you need this behavior in other selection components, you can implement this yourself via the [form `append` API](https://elastic.github.io/eui/#/forms/form-controls#prepend-and-append).


## Comparing selection components

Below is a handy reference for comparing the selection components.

|   | `EuiSelect` | `EuiSuperSelect` | `EuiSelectable` | `EuiComboBox` | `EuiSuggest` |
|---|:---:|:---:|:---:|:---:|:---:|
| Select a single option | ✅ | ✅ | ✅ | ✅ | ✅ |
| Select multiple options | ❌ | ❌ | ✅ | ✅ | ❌ |
| Accepts custom values from users | ❌ | ❌ | ❌ | ✅ | ❌ |
| Option exclusion | ❌ | ❌ | ✅ | ❌ | ❌ |
| Customizable option display | ❌ | ✅ | ❌ | ✅ | ❌
| Customizable loading/error messaging | ❌ | ❌ | ✅ | ❌ | ❌ |
| Searchable | ❌ | ❌ | ✅ | ✅ | ✅ |
| Accepts custom values from users | ❌ | ❌ | ❌ | ✅ | ❌ |
| `disabled` state | ✅ <br/> (Disables whole component) | ✅ <br/> (Disables individual option) | ✅ <br/> (Disables individual option) | ✅ <br/> (Disables whole component) | ❌ |
| `readOnly` state | ❌ | ✅ | ❌ | ❌ | ❌ |
| Built in utility function for clearing user input | ❌ | ❌ | ✅ | ✅ | ✅ 

---

## Still have a question? ##
Feel free to comment below or [open an issue](https://github.com/elastic/eui/issues/new/choose). We're always happy to help!

