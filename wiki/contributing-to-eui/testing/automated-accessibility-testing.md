# Accessibility testing

The goal is for all EUI components to be run through [axe](https://www.deque.com/axe/).
Please refer to [issue #6300](https://github.com/elastic/eui/issues/6300) to see components under test.

## What is axe?

axe is an "[accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)".
Automated tests cover ~30% of accessibility requirements but ~60% of accessibility bugs are caught by automated tests.
Automated testing can't replace manual testing, but it's an important baseline for all of our components.

## How to run the Cypress accessibility tests?

* `test-cypress-a11y` runs the accessibility test suite in a local headless Cypress environment.
* `test-cypress-dev` runs the test suite using your dev server (assumed to be `http://localhost:8030`) and the Cypress test runner.

### How to run accessibility tests against 1 component?

Though it's not setup to be run this way, there are two ways to do it.

The recommended route is to install the axe addon (for [Chrome](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/), or [Edge](https://support.microsoft.com/en-us/microsoft-edge/download-the-new-microsoft-edge-based-on-chromium-0f4a3dd7-55df-60f5-739f-00010dba52cf)).
Navigate to any page and run the analyzer from your browser's developer tools.
This will return the same* results to you while also giving you some convenience utilities like highlighting the exact element that's failing.

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

This testing suite can be run on your local machine or in a Docker container. The EUI team has a plan to run these tests in a scheduled Buildkite job using the CI Docker container.
