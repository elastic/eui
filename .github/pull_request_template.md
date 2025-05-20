## Summary

<!--
Provide a detailed summary of your PR. Explain how you arrived at your solution. If it includes changes to UI elements include a screenshot or gif.

If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
-->

## Related issue

<!--
Generally, most PRs should have a related issue from the [public EUI repo](https://github.com/elastic/eui) that explain why we are making changes.

If this is a small change that does *not* have an issue associated with, please clearly explain *why* we are making this change. Our future selves will thank you.
-->

## QA

Remove or strikethrough items that do not apply to your PR.

### General checklist

- Browser QA
    - [ ] Checked in both **light and dark** modes
    - [ ] Checked in both [MacOS](https://support.apple.com/lv-lv/guide/mac-help/unac089/mac) and [Windows](https://support.microsoft.com/en-us/windows/turn-high-contrast-mode-on-or-off-in-windows-909e9d89-a0f9-a3a9-b993-7a6dcee85025) **high contrast modes**
      - (_[emulate forced colors](https://devtoolstips.org/tips/en/emulate-forced-colors/) if you do not have access to a Windows machine_.)
    - [ ] Checked in **mobile**
    - [ ] Checked in **Chrome**, **Safari**, **Edge**, and **Firefox**
    - [ ] Checked for **accessibility** including keyboard-only and screenreader modes
- Docs site QA
    - [ ] Added **[documentation](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting)**
    - [ ] Props have proper **autodocs** (using `@default` if default values are missing) and **[playground toggles](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/playgrounds.md)**
    - [ ] Checked **[Code Sandbox](https://codesandbox.io/)** works for any docs examples
- Code quality checklist
    - [ ] Added or updated **[jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests**
    - [ ] Updated **[visual regression tests](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)**
- Release checklist
    - [ ] A **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)** entry exists and is marked appropriately.
    - [ ] If applicable, added the **breaking change** issue label (and filled out the breaking change checklist)
- Designer checklist
  - [ ] If applicable, [file an issue](https://github.com/elastic/platform-ux-team/issues/new/choose) to update [EUI's Figma library](https://www.figma.com/community/file/964536385682658129) with any corresponding UI changes. _(This is an internal repo, if you are external to Elastic, ask a maintainer to submit this request)_
