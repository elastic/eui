import { ReactWrapper, ShallowWrapper } from 'enzyme';

type FindTestSubject<T extends ShallowWrapper | ReactWrapper> = (
  mountedComponent: T,
  testSubjectSelector: string,
  matcher?: '=' | '~=' | '|=' | '^=' | '$=' | '*='
) => ReturnType<T['find']>;

/**
 * Find node which matches a specific test subject selector. Returns ReactWrappers around DOM element,
 * https://github.com/airbnb/enzyme/tree/master/docs/api/ReactWrapper.
 * Common use cases include calling simulate or getDOMNode on the returned ReactWrapper.
 *
 * The ~= matcher looks for the value in space-separated list, allowing support for multiple data-test-subj
 * values on a single element. See https://www.w3.org/TR/selectors-3/#attribute-selectors for more
 * info on the other possible matchers.
 */

const MATCHERS = [
  '=', // Exact match
  '~=', // Exists in a space-separated list
  '|=', // Begins with substring, followed by '-'
  '^=', // Begins with substring
  '$=', // Ends with substring
  '*=', // Contains substring
];

export const findTestSubject: FindTestSubject<ShallowWrapper | ReactWrapper> = (
  mountedComponent,
  testSubjectSelector,
  matcher = '~='
) => {
  if (!MATCHERS.includes(matcher)) {
    throw new Error(
      `Matcher ${matcher} not found in list of allowed matchers: ${MATCHERS.join(
        ' '
      )}`
    );
  }

  const testSubject = mountedComponent.find(
    `[data-test-subj${matcher}"${testSubjectSelector}"]`
  );

  // Restores Enzyme 2's find behavior, which was to only return ReactWrappers around DOM elements.
  // Enzyme 3 returns ReactWrappers around both DOM elements and React components.
  // https://github.com/airbnb/enzyme/issues/1174
  return testSubject.hostNodes();
};
