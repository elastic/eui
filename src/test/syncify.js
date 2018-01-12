// Helper designed to help test async/await functions that throw exceptions
// https://github.com/facebook/jest/issues/1377
export const syncify = async (fn) => {
  try {
    const result = await fn();
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
};
