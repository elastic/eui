declare namespace Cypress {
  type MountReturn = import('@cypress/react').MountReturn;

  interface Chainable<Subject> {
    /**
     * Run the axe-core accessibility scanner
     * @param context Any valid node or CSS selector. Defaults to the Cypress containing `<div>`.
     * @param axeRunConfig Add or change rules in the `axe.run` config object
     * @see https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axerun
     */
    axeCheck(context?: String, axeRunConfig?: Object): void;

    /**
     * Provide global cy.mount() shortcut that includes required providers
     * @see https://github.com/cypress-io/cypress/blob/develop/npm/react/docs/providers-and-composition.md
     */
    mount(children: React.ReactNode): Cypress.Chainable<MountReturn>;

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
    repeatRealPress(keyToPress: string | string[], count?: number): void;
  }
}
