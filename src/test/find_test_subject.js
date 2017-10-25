// Extract the DOM node which matches a specific test subject selector.
export const findTestSubject = (mountedComponent, testSubjectSelector) => (
  mountedComponent.find(`[data-test-subj="${testSubjectSelector}"]`).hostNodes().getDOMNode()
);
