import { ContextObject, Result, RunOptions } from 'axe-core';
import { realPress } from 'cypress-real-events/commands/realPress';

type KeyOrShortcut = Parameters<typeof realPress>[0];
type RealPressOptions = Parameters<typeof realPress>[1];

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      // We are adding `/// <reference types="../../../cypress/support"/>` to
      // Cypress specs so VSCode will recognize custom command types.

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
       * This ensures the correct testing window has focus when using Cypress Real Events.
       * @see https://github.com/dmtrKovalenko/cypress-real-events/issues/196
       */
      realMount(children: React.ReactNode): void;

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
    }
  }
}
