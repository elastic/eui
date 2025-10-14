## Summary

<!--
Provide a detailed summary of your PR. What changed? Explain how you arrived at your solution.

If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
-->

## Why are we making this change?

<!--
Generally, most PRs should have a related issue from the [public EUI repo](https://github.com/elastic/eui) that explain **why** we are making changes.

If this change does *not* have an issue associated with, or it is not clear in the issue, please clearly explain *why* we are making this change. This is valuable context for our changelogs.
-->

## Screenshots <a href="#user-content-screenshots" id="screenshots">#</a>

<!--
If this change includes changes to UI, it is important to include screenshots or gif. This helps our users understand what changed when reviewing our changelogs.
-->

## Impact to users

<!--
How will this change impact EUI users? If it's a breaking change, what will they need to do to handle this change when upgrading? Take a moment to look at usage in Kibana and consider how many usages this will impact and note it here.

Even if it is not a breaking change, how significant is the visual change? Is it a large enough visual change that we would want them advise them to test it?
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
