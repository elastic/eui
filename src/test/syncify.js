// Helper designed to help test async/await functions that throw exceptions
// Example usage:
// const fn = await syncify(() => asyncFn());
// expect(fn).toThrow();
// https://github.com/facebook/jest/issues/1377
export const syncify = async (fn) => {
  try {
    const result = await fn();
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
};
