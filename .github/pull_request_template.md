<!--
- NOTE: 
- Main should always be releasable. Ensure complete context below to communicate change clearly to users and to help maintainers assess release readiness.
- If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
- Ask @eui-team if you need help.

-->

## Summary

<!-- One or two sentences in past tense, verb-first (e.g. "Added …", "Fixed …"). This will be the basis for the changelog first line. -->

## Why are we making this change?

<!-- Link to issue (e.g. Fixes #123) and/or briefly explain motivation. -->

## Changes

<!-- Detailed explanation: implementation approach and any non-obvious decisions for reviewers. -->

### API Changes

<!--
List any change to the public EUI API here.

Example:

| component / parent   | prop / child                 | change     | description                                                             |
| -------------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------- |
| EuiOverlayMask       | hasAnimation                 | Added      | Conditionally add animation                                             |
| EuiBadge             | fill                         | Default    | Default is now "false" -- Makes all badges have a light fill by default |
| Tokens               | colors.severity.someOldColor | Deprecated | Use `colors.severity.someOtherColor` instead                            |
| Global CSS Variables | --my-variable                | Added      | Some reason listed here                                                 |

-->

| component / parent | prop / child | change | description |
| ------------------ | ------------ | ------ | ----------- |
|                    |              |        |             |

## Screenshots <a href="#user-content-screenshots" id="screenshots">#</a>

<!-- Use for visual/UX changes; one Before/After pair is enough when relevant. Use N/A for API-only or docs-only changes. -->

<table>
  <colgroup>
    <col style="width:50%">
    <col style="width:50%">
  </colgroup>
  <thead>
    <tr><th>Before</th><th>After</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>
      {Before image}
      </td>
      <td>
      {After image}
      </td>
    </tr>
  </tbody>
</table>

## Impact Assessment

Replace `{}` for selection(s):

This PR includes:
- [ ] 🔴 Breaking changes:
  - {How many usages in Kibana and other products are impacted?}
  - {What will break and how do users migrate?}
- [ ] 💅 Visual changes:
  - These changes may impact existing style overrides and require visual testing.
  - {Explain}
  - {How many usages in Kibana and other products are impacted?}
- Overall impact level:
  - 🟢 [ ] No impact
  - 🟡 [ ] Moderate impact (e.g., multiple apps may need small updates)
  - 🔴 [ ] High impact (e.g., breaking or wide visual/behavior change)

## Migration Guide

<!--

Short step-by-step or code snippet. Use this for:
- Breaking changes
- Deprecations
- New preferred patterns that we want users to migrate to

-->

## Integration Effort

How hard will it be for us to integrate this into Kibana and Cloud UI?

If it will be hard, stage commits in Kibana and Cloud UI branches so we can cherry-pick them when we do the integration.

Choose one:
- [ ] The integration will not be hard because {Explain}
- [ ] The integration will be hard, commits are provided below:

## Where and when will this be used? (New Features)

<!-- N/A for bugfixes, refactors, or dependency bumps. -->

Note: We do not ship features unless we can confirm that it is used. Where will it be used, who is doing the work to integrate it and when?

## Documentation (if applicable)

<!-- Write "N/A" for bugfixes or internal refactors. Examples:

A PR that updates the colors of buttons:
> - [EuiButton](https://eui.elastic.co/docs/components/navigation/buttons/button/)

A PR that adds a severity color palette:
> - [Color Tokens](https://eui.elastic.co/docs/getting-started/theming/tokens/colors/#severity-and-health-colors)
> - [Health and Severity Pattern](https://eui.elastic.co/docs/patterns/severity)

Ex. -- A PR that updates the colors of buttons:
> To read more about this feature, visit:
> - [EuiButton](https://eui.elastic.co/docs/components/navigation/buttons/button/)
> 
-->

## EUI Figma library

<!-- Changes need to be reflected in Figma for Parity. See https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/designing -->

Choose one:
- [ ] This change is not yet reflected in Figma, an issue to update Figma is here: {link}
- [ ] This change is already reflected in the EUI Figma library here: {Figma link}
- [ ] This change is reflected in a branch in EUI Figma library and will be released alongside this change: {Figma link}
- [ ] This change does not need to be reflected in Figma.

## QA instructions for reviewer

<!-- Steps for reviewers to test this PR -->

### Checklist for author before marking as Ready for Review

<!-- Test this before marking your PR "Ready for Review". ~~cross-out~~ irrelevant items. -->

I have done the following before marking this PR as Ready for Review:

- **PR Detail**
  - [ ] Filled out all sections above or marked them as "N/A"

- **Documentation**
  - [ ] Updated and tested [EUI documentation](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting)
    - [ ] Confirmed that all of my changes are reflected in docs
    - [ ] Confirmed that all props have proper **autodocs** (using `@default` if default values are missing)

- **QA**
  - [ ] **Browser:** 
    - [ ] tested **light and dark** modes
    - [ ] tested **high contrast modes** on [MacOS](https://support.apple.com/lv-lv/guide/mac-help/unac089/mac) and [Windows](https://support.microsoft.com/en-us/windows/turn-high-contrast-mode-on-or-off-in-windows-909e9d89-a0f9-a3a9-b993-7a6dcee85025) (_[emulate forced colors](https://devtoolstips.org/tips/en/emulate-forced-colors/) if you do not have access to a Windows machine_)
    - [ ] tested **mobile**, **Chrome**, **Safari**, **Edge**, and **Firefox**, and **accessibility** (keyboard-only and screen reader)
  - [ ] Tested in **[Code Sandbox](https://codesandbox.io/)**
  - [ ] Tested in **[Kibana](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/testing-in-kibana.md)**

- **Tests**
  - [ ] Added or updated **[Jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [Cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests**
  - [ ] Added or updated **[visual regression tests](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)**

- **Changelog**
  - [ ] Added a **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)**

- **Breaking changes (if applicable)**
  - [ ] Added the **`breaking change`** label
  - [ ] Included **migration steps** (and/or code example) in the PR description and in the changelog entry


