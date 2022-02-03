# Cypress testing

## Running tests

`yarn test-cypress` runs component tests headlessly (no window appears)

`yarn test-cypress-dev` launches a chrome window controlled by Cypress, which lists out the discovered tests and allows executing/interacting from that window.

### Setting the theme

By default tests are run using the light theme. Dark mode can be enabled by passing the `--theme=dark` option.

### Skipping CSS compilation

To ensure tests use up-to-date styles, the test runner compiles our SCSS to CSS before executing Cypress. This adds some processing time before the tests can run, and often the existing locally-built styles are still accurate. The CSS compilation step can be skipped by passing the `--skip-css` flag to `yarn test-cypress` and `yarn test-cypress-dev`.

### Cypress arguments

You can also pass [Cypress CLI arguments](https://docs.cypress.io/guides/guides/command-line). For example:

```bash
# Only run a single specific test file, e.g. onBoarding.js
yarn test-cypress --spec '**/{file}.spec.tsx'

# Opt to run Chrome headlessly
yarn test-cypress --headless

# Overriding config settings, e.g. enabling video recording
yarn test-cypress-dev --config video=true

# Overriding env variables
yarn test-cypress-dev --env password=foobar
```

## Writing tests

### When to write Cypress tests

Cypress tests should primarily be written for functionality that Jest/JSDom can't realistically replicate, for example:

- Focus state
- Portals
- 3rd party dependencies
- Native DOM behaviors (e.g., scrolling, label<>input clicks)

#### Component tests vs. E2E tests

Currently, EUI only uses [Cypress component testing](https://docs.cypress.io/guides/component-testing/introduction) as opposed to its full E2E test runner. This is ideal for isolating/focusing on specific components while reducing traditional E2E start times.

In the future, we may consider using full E2E tests, for example for regression testing EUI upgrades in Kibana or Elastic Cloud.

### How to write Cypress tests

Cypress has its own specific [`cy.` API/commands](https://docs.cypress.io/api/commands/get#Arguments), of which you will likely be using `cy.get()`, `cy.find()`, and either `cy.click()` or `cy.type()` to interact with DOM elements. Here's a small example test:

```jsx
import { mount } from '@cypress/react';
import TestComponent from './test_component';

describe('TestComponent', () => {
  it('takes user input, submits it, and displays the resulting output', () => {
    mount(<TestComponent />);

    cy.get('[data-test-subj="someInput"]').type('hello world');
    cy.get('[data-test-subj="submitButton"]').click();

    cy.get('[data-test-subj="someOutput"]').contains('HELLO WORLD');
  });
});
```

#### Naming your test files

Create Cypress test files with the name pattern of `{component name}.spec.tsx` in the same directory which
contains `{component name}.tsx`.

#### Do's and don'ts

* DO read through Cypress's [best practices](https://docs.cypress.io/guides/references/best-practices) recommendations
* DO use the `data-test-subj` attribute to mark parts of a component you want to `find` later.
* DON'T depend upon class names or other implementation details for `find`ing nodes, if possible.
* DON'T extend the `cy.` global namespace - instead prefer to import helper functions directly

### Cypress-axe
EUI components are tested for accessibility as part of the documentation build, but these do not test changes to the DOM such as accordions being opened, or modal dialogs being triggered. Cypress-axe allows us to interact with components as users would, and run additional axe scans.

#### How to write Cypress-axe tests

Cypress-axe works with component tests and full end-to-end tests. It must be injected into a Cypress test in a `beforeEach` block, then the helper will be available to use by wihin a running test.

```jsx
beforeEach(() => {
  cy.injectAxe();
});

describe('Axe check', () => {
  it('has zero violations when expanded', () => {
    cy.mount(
      <EuiAccordion {...noArrowProps}>
        <EuiPanel color="subdued">
          Any content inside of <strong>EuiAccordion</strong> will appear
          here. We will include <a href="#">a link</a> to confirm focus.
        </EuiPanel>
      </EuiAccordion>
    );
    cy.get('button.euiAccordion__button').click();
    cy.axeCheck();
  });
});
```

#### Modifying the cy.axeCheck() helper method

The `cy.axeCheck()` method has two optional parameters:
 
 - `context` - This could be the document or a selector such as a class name, id, or element. The `context` default is `div#__cy_root`.
 - `axeRunConfig` - The [axe.run API](https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axerun) can be modified for elements to include or exclude, individual rules to exclude, and rulesets to include or exclude. The default config object tests for all [WCAG 2.0](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules) and [WCAG 2.1](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules) rules and excludes the [color-contrast rule](https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=RuleDescription) due to high numbers of false positives.

 #### Changing context and configuration
 
 If we want to test the `<main>` tag and all children for required rulesets plus best practices, we would modify the `cy.axeCheck()` call this way:

 ```jsx
cy.axeCheck('main', {
  runOnly: {
    type: 'tag',
    values: ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  }
});
 ```

  #### Changing configuration only
 
 If we want to test the default `div#__cy_root` for required rulesets plus best practices we could pass `undefined` as the first argument:

 ```jsx
cy.axeCheck(undefined, {
  runOnly: {
    type: 'tag',
    values: ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  }
});
 ```

### Cypress Real Events

> Cypress default events are simulated. That means that all events like `cy.click` or `cy.type` are fired from JavaScript. That's why these events will be untrusted (`event.isTrusted` will be `false`) and they can behave a little different from real native events. But for some cases, it can be impossible to use simulated events, for example, to fill a native alert or copy to the clipboard. This plugin solves this problem.

[Cypress Real Events](https://github.com/dmtrKovalenko/cypress-real-events#why)

#### Why Cypress Real Events?

Cypress Real Events uses the [Chrome Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/) to handle behaviors like a real browser. This gives us a better way to test complex events like mouse hover and keyboard focus. By using real events and making assertions against them, we can test keyboard and screen reader accessibility as users change the local state.

#### How to write Cypress (real event) tests

The [Cypress Real Events API](https://github.com/dmtrKovalenko/cypress-real-events#api) works seamlessly with existing `cy()` methods. If you want to press a button using Cypress Real Events, you could use `realPress('Tab')` as a replacement for the `cy.tab()` synthetic method. All Cypress Real Events methods are prefixed with the string "real". Here's a small example test:

```jsx
import TestComponent from './test_component';

describe('TestComponent', () => {
  it('presses a button using the Enter key', () => {
    /* Use the `realMount()` command to set focus in the test window */
    cy.realMount(<TestComponent />);
    
    /* Activate a button with a real keypress event */
    cy.get('[data-test-subj="submitButton"]').realPress('Enter');
    
    /* Assert the button has focus and the aria-expanded attribute has updated */
    cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
  });

  it('presses a button using the Space key', () => {
    /* Assert the button also accepts the Spacebar keypress */
    cy.realMount(<TestComponent />);
    cy.get('[data-test-subj="submitButton"]').realPress('Space');
    cy.focused().invoke('attr', 'aria-expanded').should('equal', 'true');
  });
});
```

#### Do's and don'ts for Cypress Real Events

* DO follow [all previous guidance](#dos-and-donts) for writing Cypress tests
* DO use the correct mounting method:
  * Use `cy.realMount()` if your component doesn't receive focus automatically **OR**
  * Use `cy.mount()` for components that receive focus on render
* DO be on the lookout for new features!

## Debugging tests

For debugging failures locally, use `yarn test-cypress-dev`, which allows you to run a single specific test suite and runs tests in a browser window, making dev tools available to you so you can pause and inspect DOM as needed.

> :warning: As a general rule, we generally recommend taking a break and not clicking around while tests are running. This can eliminate or lower the possibility of hard-to-reproduce/intermittently flaky behavior and timeouts due to user interference.

### Artifacts

TODO: Are these screenshot/video folders correct?

All failed tests will output a screenshot to a `screenshots/` folder (`src/cypress/screenshots`). We strongly recommend starting there for debugging failed tests to inspect error messages and UI state at point of failure.

To track what Cypress is doing while running tests, you can pass in `--config video=true` which will output screencaptures to the `src/cypress/videos/` folder for all tests (both successful and failing). This can potentially provide more context leading up to the failure point, if a static screenshot isn't providing enough information.

> ℹ️ We have videos turned off in our config to reduce test runtime, especially on CI, but suggest re-enabling it for any deep debugging.

### CI debugging

Failing screenshot artifacts (as well as Cypress logs) are generated by our Jenkins CI.

TODO: Instructions on where to click to see the relevant artifact(s)/screenshots

## Code coverage

Cypress has been configured to automatically output Cypress code coverage to the `reports/cypress-coverage` folder. If you would prefer to turn this off locally, you can add the `--env coverage=false` flag when running your your cypress commands.

To view the generated HTML reports, you can either drag the `reports/cypress-coverage/index.html` file into a browser window, or in a terminal, run `open reports/cypress-coverage/index.html` from the EUI project root.

### Combined Jest & Cypress code coverage

If you're working on a component that has both Cypress and Jest tests, we have a command that allows you to combine the results of both coverage reports.

1. Setup: On the component(s) you're looking for final coverage #s for,
  - Ensure you have already run `yarn test-unit --coverage` to generate a Jest report
  - Ensure you have already run `yarn test-cypress` to generate a Cypress report
2. Run `yarn combine-test-coverage`
  - This should automatically open a browser window with `reports/combined-coverage/index.html`
