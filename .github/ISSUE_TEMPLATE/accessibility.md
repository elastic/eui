---
name: Report an accessibility issue
about: Report an accessibility issue
title: ''
labels: accessibility
assignees: ''

---

**Describe the problem**
<!-- This is a detailed description. It should provide more background information about the issue and whom it affects. -->

**To Reproduce**
<!-- Provide as much information as you can. Include assistive technologies used, steps taken, or configuration files adjusted, to achieve a similar testing state. -->

## Environment

<!--
* Operating System, including `<VERSION>` or "latest"
* Browser, including `<VERSION>` or "latest"
* Screenreading device, if applicable
* Server destination (localhost, Docker container, staging, production)
-->

## Proposed solution

<!-- Include code snippets if that might help fixing the issue. -->

```diff
! https://github.com/github/linguist/blob/master/vendor/README.md

! Adding an SR-only span to make the setting more
! explicit for screen readers
<button
  class="cd-c-button cd-c-button--large"
  type="button"
>
- Previous high
+ Previous high score
+ {' '}
+ <span class="cd-u-visibility--sr-only">on Expert setting</span>
</button>
```

## WCAG or Vendor Guidance (optional)

- [WCAG 2.1 Success Criteria](https://www.w3.org/TR/WCAG21/) for relevant items to link here.
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) for browser behaviors, code snippets, and polyfills.

## Screenshots or Trace Logs

<!-- Drop any screenshots or error logs that might be useful for debugging -->
