## Summary

Provide a detailed summary of your PR. Explain how you arrived at your solution. If it includes changes to UI elements include a screenshot or gif.

If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.

## QA

Remove or strikethrough items that do not apply to your PR.

### General checklist

- Browser QA
    - [ ] Checked in both **light and dark** modes
    - [ ] Checked in **mobile**
    - [ ] Checked in **Chrome**, **Safari**, **Edge**, and **Firefox**
    - [ ] Checked for **accessibility** including keyboard-only and screenreader modes
- Docs site QA
    - [ ] Added **[documentation](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting)**
    - [ ] Props have proper **autodocs** (using `@default` if default values are missing) and **[playground toggles](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/playgrounds.md)**
    - [ ] Checked **[Code Sandbox](https://codesandbox.io/)** works for any docs examples
- Code quality checklist
    - [ ] Added or updated **[jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests**
- Release checklist
    - [ ] A **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)** entry exists and is marked appropriately.
    - [ ] If applicable, added the **breaking change** issue label (and filled out the breaking change checklist)
- Designer checklist
    - [ ] Updated the **[Figma](https://www.figma.com/community/file/964536385682658129)** library counterpart
