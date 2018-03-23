/*
  Use this utility to throw errors whenever React complains via the console
  about things like invalid propTypes. This lets us assert that a propType
  check works correctly with `toThrow`.

  Usage looks like:

  beforeAll(startThrowingReactWarnings);
  afterAll(stopThrowingReactWarnings);
*/

const consoleWarn = console.warn; // eslint-disable-line no-console
const consoleError = console.error; // eslint-disable-line no-console

export const startThrowingReactWarnings = () => {
  console.warn = console.error = (msg) => { throw msg; }; // eslint-disable-line no-console
};

export const stopThrowingReactWarnings = () => {
  console.warn = consoleWarn; // eslint-disable-line no-console
  console.error = consoleError; // eslint-disable-line no-console
};
