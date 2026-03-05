<!--
IMPORTANT: Main is always considered releasable:
- PRs collect a lot of release related information
- Write "N/A" in irrelevant sections
- Sections are required otherwise, ask a maintainer if you need help answering

If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
-->

## Summary

<!-- High Level -->

## Changes

<!-- Detailed explanation -->

### API Changes

<!-- 
List any change to the public EUI API here

Example:

| component / parent   | prop / child                 | change               | description                                  |
| -------------------- | ---------------------------- | -------------------- | -------------------------------------------- |
| EuiOverlayMask       | hasAnimation                 | Added                | Conditionally add animation                  |
| EuiBadge             | fill                         | Default is now false | Make all badges have a light fill by default |
| Tokens               | colors.severity.assistance   | Added                | New purple color palette tokens              |
| Tokens               | colors.severity.someOldColor | Deprecated           | New purple colors replace this               |
| Global CSS Variables | --my-variable                | Added                | Some reason listed here                     |
-->

| component / parent | prop / child | change | description |
| ------------------ | ------------ | ------ | ----------- |
|                    |              |        |             |

## Screenshots <a href="#user-content-screenshots" id="screenshots">#</a>

<!--
Screenshots or gifs to illustrate.
-->

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

- [ ] 🔴 Breaking changes:
  - {How many usages in Kibana and other products impacted?}
  - {What will break and how do users migrate?}
- [ ] 💅 Visual changes:
  - These changes may impact existing style overrides and require visual testing when required.
  - {Explain}
  - {How many usages in Kibana and other products impacted?}
- Overall impact level:
 - 🟢 [ ] No impact
 - 🟡 [ ] Moderate impact
 - 🔴 [ ] High impact

## Integration Effort

How hard will it be for us to integrate this into Kibana and Cloud UI?

If it will be hard, stage commits in Kibana and Cloud UI branches so we can cherry-pick them when we do the integration.

Choose one:
- [ ] The integration will not be hard because {Explain}
- [ ] The integration will be hard, commits are provided below:

## (New Features) Where and when will this be used?

Note: We do not ship features unless we can confirm that it is used. Where will it be used, who is doing the work to integrate it and when?

## Documentation links

<!-- 

Examples:

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

To read more about this feature, visit:
-  {add links here}

## Figma links

<!-- Visual changes need to be reflected in Figma for Parody

https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/designing

Choose one:
- [ ] This change is not yet reflected in Figma, an issue to update Figma is here: {link}
- [ ] This change is reflected in the EUI Figma library here: {Figma link}
- [ ] This change does not need to be reflected in Figma.

## Why are we making this change?

<!-- Link to issue and/or briefly explain -->

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
  - **Browser**
    - [ ] **light and dark** modes
    - [ ] **high contrast modes** on [MacOS](https://support.apple.com/lv-lv/guide/mac-help/unac089/mac) and [Windows](https://support.microsoft.com/en-us/windows/turn-high-contrast-mode-on-or-off-in-windows-909e9d89-a0f9-a3a9-b993-7a6dcee85025) 
      - (_[emulate forced colors](https://devtoolstips.org/tips/en/emulate-forced-colors/) if you do not have access to a Windows machine_.)
    - [ ] **mobile**
    - [ ] **Chrome**, **Safari**, **Edge**, and **Firefox**
    - [ ] **accessibility** - including keyboard-only and screen reader modes
  - [ ] Tested in **[Code Sandbox](https://codesandbox.io/)**
  - [ ] **[Tested my changes in Kibana](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/testing-in-kibana.md)**

- **Tests**
  - [ ] Added or updated **[Jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [Cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests**
  - [ ] Added or updated **[visual regression tests](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)**

- **Changelog**
- [ ] Added a **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)**

- **Breaking changes (if applicable)**
    - [ ] Added the **`breaking change`** label
    - [ ] Included relevant **migration** and **impact** detail above



 

