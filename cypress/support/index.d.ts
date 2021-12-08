declare namespace Cypress {
  type MountReturn = import('@cypress/react').MountReturn;

  interface Chainable<Subject> {
    mount(children: React.ReactNode): Cypress.Chainable<MountReturn>;
  }
}
