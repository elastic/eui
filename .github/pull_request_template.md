<!--
If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
-->

## Summary <a href="#user-content-summary" id="summary">#</a>

Provide a summary of your PR. What changed? Explain how you arrived at your solution.

## Accessibility check (Required if applicable) <a href="#user-content-acccessibility" id="acccessibility">#</a>

<!--
Please explain how you've ensured this change is accessible. What steps did you take, what attributes did you take, etc.
-->

## Changelog context (Required if changelog included)

<!--
If this PR is going into a release and has a changelog entry, we need to have the following context to help understand what has changed and why.
-->

### Why are we making this change? <a href="#user-content-reason" id="reason">#</a>

<!--
Explain why we made this change and how it relates to larger initiatives or requests.

Ex.:

We made this change because our current data visualization and severity colors did not meet 3:1 contrast ratios in light mode.

Related EUI issues or initiatives:
- Closes https://github.com/elastic/eui/issues/8632
- Relates to the High-Contrast mode Beta initiative: https://github.com/elastic/eui/issues/8567
- Part of the Visual Refresh initiative: https://github.com/elastic/eui/issues/8589

Related issues or initiatives from other Elastic products (Kibana, Cloud, etc.): 
- Related to a larger initiative in Kibana to create a high-contrast data vis color palette: https://github.com/elastic/kibana/issues/196911
-->

### API Changes <a href="#user-content-api-changes" id="api-changes">#</a>
<!--
What changed in the public API that users should be aware of?

Ex.:
- EuiModal - added 'focusTrapProps' prop
- EuiLiveAnnouncer - New component (in beta)
- EuiFlyout - new global css variables: --euiPushFlyoutOffsetInlineEnd and --euiPushFlyoutOffsetInlineStart
- Color Tokens - added colors.borderInteractiveFormsHoverPlain
- "This PR has no API changes that users should be aware of"
-->

### Functional changes <a href="#user-content-functional-changes" id="functional-changes">#</a>
<!--
What behavior has changed that users should be aware of?

Ex.
- EuiCheckableCard - The click area has expanded for non-interactive children
- EuiInputPopover - Popover now closes on Tab, not Shift+Tab
- "This PR has no functional changes that users should be aware of"
-->

### Visual changes <a href="#user-content-visual-changes" id="visual-changes">#</a>
<!--
What has changed visually that users should be aware of?

Ex.
- EuiDataGrid - Hover colors now darker yellow when stripes={true}
- "This PR has no visual changes that users should be aware of"
-->

### Doc updates ([How to contribute docs](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting)) <a href="#user-content-docs" id="docs">#</a>
<!--
Most changes to EUI require updates to docs to reflect the changes. Pick most relevant option:
-->

- [ ] Doc updates were made and the production link to them will be here:  `{Provide a link}`
- [ ] Docs were updated separately here:  `{Provide a link}`
- [ ] This update does not require doc updates, the most relevant existing docs are here: `{Provide a link}`

### [EUI library Figma](https://www.figma.com/community/file/964536385682658129) updates <a href="#user-content-figma" id="figma">#</a>
https://github.com/elastic/platform-ux-team/issues/new?template=design-system-figma.md
<!--
The EUI Figma library must be kept up to date with the JS library. Pick and fill out the most relevant option.
-->

- [ ] Updates were already made to Figma, they can be found here: `{Provide a link}`
- [ ] Updates will be made to Figma, a link to the issue to capture that work is here: `{Provide a link}`
- [ ] This behavior does not need to be reflected in Figma. The most relevant Figma file is here: `{Provide a link}`

(Figma issues can be filed : [here](https://github.com/elastic/platform-ux-team/issues/new/choose) _(This is an internal repo, if you are external to Elastic, ask a maintainer to submit this request)_

### Screenshots <a href="#user-content-screenshots" id="screenshots">#</a>
<!--
Help us understand at a glance what has changed. "A picture is worth a thousand words".
-->

### Reproduction instructions <a href="#user-content-reproduce" id="reproduce">#</a>
<!--
How can we reproduce this change?

Examples:
- There is an example in the docs here: https://eui.elastic.co/storybook/index.html?path=/story/navigation-euicollapsiblenav-beta-euicollapsiblenavbeta--playground
- Navigate to this example in docs and chane the "size" field to xs: https://eui.elastic.co/storybook/index.html?path=/story/navigation-euicollapsiblenav-beta-euicollapsiblenavbeta--playground
- There is a story in storybook here: https://eui.elastic.co/storybook/index.html?path=/story/navigation-euicollapsiblenav-beta-euicollapsiblenavbeta--playground
- Create a button and set the size property to "xs". Observe that the text is now larger:
```
<EuiButton size="xs">Example</EuiButton>
```
-->

### Impact <a href="#user-content-impact" id="impact">#</a>
<!--
Pick one of the following options:
-->

- [ ] 🔴 This is a breaking change. I've added the `breaking change` label to this issue and the migration instructions are as follows:
  
  (`<provide migration instructions here>`)

- [ ] 🟡 This change is not technically breaking, but could break tests, affect code that applies custom css, or requies extra testing or attention.

  (`<Explain what users should be aware of or what to test>`)

- [ ] 🟢 No impact to existing usage

  (`<Explain why there is no impact users should be aware of>`)

#### Scope of impact in Elastic products:
<!--
 - There are 344 references to `euiColorVis` colors in Kibana.
 - There are 35 references to `euiColorVis` colors in Cloud UI.
-->

### Rollout / adoption <a href="#user-content-rollout" id="rollout">#</a>
<!--
- If we're adding a new feature, how are we ensuring it's being adopted in Elastic products? Where is it not being used currently that it should be used?
- If this change requires updates by users, how much change will be required in Elastic products? What is the scope and who's going to make those changes?
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
    - [ ] Props have proper **autodocs** (using `@default` if default values are missing) and **[playground toggles](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/playgrounds.md)**
    - [ ] Checked **[Code Sandbox](https://codesandbox.io/)** works for any docs examples
- Code quality checklist
    - [ ] Added or updated **[jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md) and [cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md) tests**
    - [ ] Updated **[visual regression tests](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)**
- Release checklist
    - [ ] A **[changelog](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)** entry exists and is marked appropriately.
