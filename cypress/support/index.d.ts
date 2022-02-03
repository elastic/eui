declare namespace Cypress {
  type MountReturn = import('@cypress/react').MountReturn;

  interface Chainable<Subject> {
    axeCheck(context?: String, rulesObj?: Object): void;
    mount(children: React.ReactNode): Cypress.Chainable<MountReturn>;
    realMount(children: React.ReactNode): void;
    repeatRealPress(keyToPress: string | string[], count?: number): void;
  }
}
