/*
  We want our unit tests to verify that invalid property values will
  trigger the default react warning message. It feels easier to capture
  that scenario as an actual throwing error so these two utility functions
  allow you to do that.

  Usage looks like:

  beforeAll(startThrowingReactWarnings);
  afterAll(stopThrowingReactWarnings);
*/

const consoleWarn = console.warn;
const consoleError = console.error;

export const startThrowingReactWarnings = () => {
  console.warn = console.error = (msg) => { throw msg; };
};

export const stopThrowingReactWarnings = () => {
  console.warn = consoleWarn;
  console.error = consoleError;
};
