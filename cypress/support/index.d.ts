declare namespace Cypress {
  type MountReturn = import('@cypress/react').MountReturn;

  interface Chainable<Subject> {
    mount(children: React.ReactNode): Cypress.Chainable<MountReturn>;
    realMount(children: React.ReactNode): void;
    /**
     * Repeat the Real Events `realPress()` method 2 or more times
     * 
     * @param keyToPress Any valid key or array of keys https://docs.cypress.io/api/commands/type#Arguments
     * @param count Number of times to invoke `realPress()`. Defaults to 2.
     */
    repeatRealPress(keyToPress: string | string[], count?: number): void;
  }
}
