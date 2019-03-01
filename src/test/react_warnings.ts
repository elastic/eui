/* tslint:disable:no-console */

/*
  Use this utility to throw errors whenever React complains via the console
  about things like invalid propTypes. This lets us assert that a propType
  check works correctly with `toThrow`.

  Usage looks like:

  beforeAll(startThrowingReactWarnings);
  afterAll(stopThrowingReactWarnings);
*/

const consoleWarn = console.warn;
const consoleError = console.error;

export const startThrowingReactWarnings = () => {
  console.warn = console.error = (msg: any) => {
    throw msg;
  };
};

export const stopThrowingReactWarnings = () => {
  console.warn = consoleWarn;
  console.error = consoleError;
};
