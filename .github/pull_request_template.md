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

## Impact to users

<!--
How will this change impact EUI users? If it's a breaking change, what will they need to do to handle this change when upgrading? Take a moment to look at usage in Kibana and consider how many usages this will impact and note it here.

Even if it is not a breaking change, how significant is the visual change? Is it a large enough visual change that we would want them advise them to test it?
-->

## Screenshots <a href="#user-content-screenshots" id="screenshots">#</a> (optional)

<!--
If this change includes changes to UI, it is important to include screenshots or gif. This helps our users understand what changed when reviewing our changelogs.
-->

### Relevant links (optional)

<!--
If applicable, paste any relevant links: Figma design, documentation website, migration instructions and plan (if a breaking change).
-->

## QA

### Release checklist
- [ ] **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)** added
- [ ] **[documentation](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting)** updated
- [ ] **[EUI Figma](https://www.figma.com/files/776883452119367313/recents-and-sharing?fuid=613449417977720558)** updated
- [ ] **if breaking changes**
    - [ ] **`breaking change`** - label added
    - [ ] **migration instructions** - exist
    - [ ] **migration plan** - plan to update in Kibana and Cloud UI documented

### QA checklist
- **Browser**
    - [ ] **light and dark** modes
    - [ ] **high contrast modes** on [MacOS](https://support.apple.com/lv-lv/guide/mac-help/unac089/mac) and [Windows](https://support.microsoft.com/en-us/windows/turn-high-contrast-mode-on-or-off-in-windows-909e9d89-a0f9-a3a9-b993-7a6dcee85025) 
      - (_[emulate forced colors](https://devtoolstips.org/tips/en/emulate-forced-colors/) if you do not have access to a Windows machine_.)
    - [ ] **mobile**
    - [ ] **Chrome**, **Safari**, **Edge**, and **Firefox**
    - [ ] **accessibility** - including keyboard-only and screen reader modes
- **Docs site**
    - [ ] **documentation** - added or updated
    - [ ] **props** - props have proper **autodocs** (using `@default` if default values are missing)
    - [ ] **[Code Sandbox](https://codesandbox.io/)** - works in docs examples
- [ ] **Tested in Kibana (or elsewhere)** - if the changes unblock an issue in a different repo, smoke tested carefully (see [Testing EUI features in Kibana ahead of time](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/testing-in-kibana.md))
 
### Code quality checklist
- [ ] **[Jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [Cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests** - added or updated
- [ ] **[visual regression tests](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)** - added or updated
