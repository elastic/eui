<!--
NOTE:
- If this is your first PR in the EUI repo, please ensure you've fully read through our [contributing to EUI](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui#how-to-ensure-the-timely-review-of-pull-requests) wiki guide.
- Ask @eui-team if you need help.
-->

## Summary

<!--
- **What:** What changed.
- **Why:** Link to issue (e.g. Fixes #123) and/or briefly explain motivation.
- **How:** Implementation approach and any non-obvious decisions for reviewers.
- Any other context to help reviewers.
-->

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

<!-- Useful for review and release notes -- most PRs should provide these. -->

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

<!-- Help reviewers understand the consumer impact of merging this PR. -->

- [ ] 🔴 **Breaking changes** — What will break? How many usages in Kibana/Cloud UI are impacted?
- [ ] 💅 **Visual changes** — May impact style overrides; could require visual testing. Explain and estimate impact.
- [ ] 🧪 **Test impact** — May break functional or snapshot tests (e.g., HTML structure, class names, default values).
- [ ] 🔧 **Hard to integrate** — If integration is complex, stage commits in Kibana/Cloud UI branches for cherry-picking and link to them below.

**Impact level:** 🟢 None / 🟢 Low / 🟡 Moderate / 🔴 High

## Release Readiness

<!-- Ensure this PR is ready to ship. ~~cross out~~ items that don't apply. -->

- [ ] **Documentation:** {link to docs page(s)}
- [ ] **Figma:** {link to Figma or [issue](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/designing)}
- [ ] **Migration guide:** {steps or link, for breaking/visual changes or deprecations}
- [ ] **Adoption plan** (new features): {link to issue/doc or outline who will integrate this and where} <!-- We don't ship features without a plan for adoption. -->

### QA instructions for reviewer

<!-- Steps for reviewers to test this PR. Please, try to be as thorough as possible, remembering that the reviewer may not have the same context and knowledge as you have. -->

### Checklist before marking Ready for Review

<!-- ~~Cross out~~ items that don't apply. -->

- [ ] Filled out all sections above
- [ ] **QA:** Tested [light/dark modes, high contrast](https://devtoolstips.org/tips/en/emulate-forced-colors/), mobile, Chrome/Safari/Edge/Firefox, keyboard-only, screen reader
- [ ] **QA:** Tested in [CodeSandbox](https://codesandbox.io/) and [Kibana](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/testing-in-kibana.md)
- [ ] **QA:** Tested docs changes
- [ ] **Tests:** Added/updated [Jest](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/unit-testing.md), [Cypress](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/cypress-testing.md), and [VRT](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md)
- [ ] **Changelog:** Added [changelog entry](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md)
- [ ] **Breaking changes:** Added `breaking change` label (if applicable)

### Reviewer checklist

- [ ] Approved **Impact Assessment** — Acceptable to merge given the consumer impact.
- [ ] Approved **Release Readiness** — Docs, Figma, and migration info are sufficient to ship.
