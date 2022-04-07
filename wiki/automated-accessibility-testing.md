# Accessibility testing

The goal is for the entirety of the EUI docs site to be run through [axe](https://www.deque.com/axe/).
As of [#2569](https://github.com/elastic/eui/pull/2569), all of the Guidelines pages are tested and the plumbing is in place to add the rest.

## What is axe?

axe is an "[accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)".
Automated tests cover ~30% of accessibility requirements but, ~60% of accessibility bugs are caught by automated tests.
So, though it can't replace manual testing, it's a great baseline for all of our components to meet.

## How to run the tests?

* `start-test-server-and-a11y-test` runs the test suite against the entire docs site and manages it's own local server for it.
* `test-a11y` can be used if you want to run it against your dev server (assumed to be `http://localhost:8030`).

### How to run it against 1 component?

Though it's not setup to be run this way, there are two ways to do it.

The recommended route is to install the axe addon (for [Chrome](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)).
Navigate to any page and run the analyzer from your browser's dev tools.
This will return the same* results to you while also giving you some convenience utilities like highlighting the exact element that's failing.

Not as nice of a experience though potentially more direct, in `scripts/a11y-testing.js` you can modify the list of component pages return from `docsPages()` to run only one file. But remember not to check in these changes!

\* It might not actually be the same in a couple cases (e.g., we've disabled some rules or a recent update that was pushed to the addon but we haven't updated yet) but it will generally be more strict than we are, so you should never see something in CI that you can't see in the addon.

## Deconstructing an error message

We have updated how accessibility violations appear in your terminal or CI logs. Each URL with violations will write a table like the one shown here.

| index | id | impact | description | nodes |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 'aria-valid-attr-value' | 'critical' | 'ARIA attributes must conform to valid values' | 1 | 
| 1 | 'nested-interactive' | 'serious' | 'Nested interactive elements are not announced by screen readers' | 3 |

All error messages follow this same structure:
* The `index` is a 0-based count of accessibility violations on a page.
* The `id` maps to an [axe-core rule description](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) on GitHub. These rules link to more information on the Deque University site.
* The `impact` describes how much a violation will prevent or degrade the user experience.
* The `description` will give a one sentence explanation of the problem.
* The `nodes` will tell you how many violations of this type are on the page.

The test runner will give you a total count of issues at the end of the run.

Any violations should be confirmed using the [axe browser plugin](https://deque.com/axe) in the [EUI design system site](https://eui.elastic.co), or running a server locally. The axe browser plugin is available for Chrome, Firefox, and Edge.

## Testing environment

This testing suite runs in a Docker container built and maintained by the EUI team and published to the Elastic Container Registry. Any environment-related failures should be investigated starting with the Docker directory located at [`scripts/docker-puppeteer/`](../scripts/docker-puppeteer/README.md).
