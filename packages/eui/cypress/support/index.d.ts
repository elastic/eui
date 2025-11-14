import { ContextObject, Result, RunOptions } from 'axe-core';
import { realPress } from 'cypress-real-events/commands/realPress';
import type { mountCommand } from './setup/mount';
import type { realMountCommand } from './setup/realMount';

type KeyOrShortcut = Parameters<typeof realPress>[0];
type RealPressOptions = Parameters<typeof realPress>[1];

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Convenience method to run the axe-core accessibility scanner without having to establish
       * `cy.injectAxe()` in a `beforeEach` block. This method also reports axe violations in the
       * console output for debugging.
       *
       * @param skipFailures Set to true to report failures to the console without Cypress failing the test.
       * @param context Any valid node or CSS selector. Defaults to the Cypress containing `<div>`.
       * @param axeConfig Add or change rules in the `axe.run` config object
       * @see https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axerun
       * @param callback Provide a custom callback function to handle the violations array from the Results object
       * @see https://www.deque.com/axe/core-documentation/api-documentation/#results-object
       */
      checkAxe(options?: {
        skipFailures?: boolean;
        context?: ContextObject | string;
        axeConfig?: RunOptions;
        callback?: (violations: Result[]) => void;
      }): void;

      /**
       * Mounts components with a basic `EuiProvider` wrapper
       */
      mount: mountCommand;

      /**
       * This ensures the correct testing window has focus when using Cypress Real Events.
       * @see https://github.com/dmtrKovalenko/cypress-real-events/issues/196
       */
      realMount: realMountCommand;

      /**
       * Repeat the Real Events `realPress()` method 2 or more times
       * @param keyToPress Any valid key or array of keys https://docs.cypress.io/api/commands/type#Arguments
       * @param count Number of times to invoke `realPress()`. Defaults to 2.
       */
      repeatRealPress(
        keyToPress: KeyOrShortcut,
        count?: number,
        options?: RealPressOptions
      ): void;

      /**
       * Select an element's content and copy it to the browser clipboard
       * @param selectorToCopy e.g. '.euiDataGrid__content'
       * @returns a chainable .then((string) => { doSomethingWith(string); })
       */
      selectAndCopy(selectorToCopy: string): Chainable<string>;

      /*
       * Get the value of a CSS variable from the element's computed styles.
       * Params: variableName - the name of the CSS variable (e.g. '--euiColorPrimary')
       */
      cssVar(variableName: string): Chainable<string | null>;

      /**
       * Waits for an element's position to remain stable for a few consecutive checks.
       * This is useful for ensuring that repositioning logic has completed after an event like a scroll.
       */
      waitForPositionToSettle(): Chainable<JQuery<HTMLElement>>;
    }
    interface Chainer<Subject> {
      (chainer: 'be.euiDisabled'): Chainable<Subject>;
      (chainer: 'be.euiEnabled'): Chainable<Subject>;
    }
  }
  namespace Chai {
    interface Assertion {
      euiDisabled: Assertion;
      euiEnabled: Assertion;
    }
  }
}
