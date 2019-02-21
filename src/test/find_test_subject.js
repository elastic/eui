/**
 * Find node which matches a specific test subject selector. Returns ReactWrappers around DOM element,
 * https://github.com/airbnb/enzyme/tree/master/docs/api/ReactWrapper.
 * Common use cases include calling simulate or getDOMNode on the returned ReactWrapper.
 */
export const findTestSubject = (mountedComponent, testSubjectSelector) => {
  // The ~ looks for the value in space-separated list, allowing support for multiple data-test-subj
  // values on a single element.
  const testSubject = mountedComponent.find(`[data-test-subj~="${testSubjectSelector}"]`);

  // Restores Enzyme 2's find behavior, which was to only return ReactWrappers around DOM elements.
  // Enzyme 3 returns ReactWrappers around both DOM elements and React components.
  // https://github.com/airbnb/enzyme/issues/1174
  return testSubject.hostNodes();
};
