import { format } from 'util';

// Fail if a test ends up `console.error`-ing, e.g. if React logs because of a
// failed prop types check.
console.error = (message, ...rest) => {
  // @see https://github.com/emotion-js/emotion/issues/1105
  // This error that Emotion throws doesn't apply to Jest, so
  // we're just going to straight up ignore the first/nth-child warning
  if (
    typeof message === 'string' &&
    message.includes('The pseudo class') &&
    message.includes(
      'is potentially unsafe when doing server-side rendering. Try changing it to'
    )
  ) {
    return;
  }

  // @see https://github.com/jsdom/jsdom/issues/2177
  // JSDOM doesn't yet know how to parse @container CSS queries -
  // all we can do is silence its errors for now
  if (
    typeof message === 'string' &&
    message.startsWith('Error: Could not parse CSS stylesheet')
  ) {
    return;
  }

  // Print React validateDOMNesting warning as a console.warn instead
  // of throwing an error.
  // TODO: Remove when edge-case DOM nesting is fixed in all components
  if (
    typeof message === 'string' &&
    message.startsWith(
      'Warning: validateDOMNesting(...): %s cannot appear as a child of <%s>'
    )
  ) {
    console.warn(message, ...rest);
    return;
  }

  // Ignore EuiIcon update not wrapped in act() warnings as they are triggered
  // directly from the component componentDidUpdate() and loadIconComponent()
  // TODO: Refactor EuiIcon to not cause this issue and think of a simpler
  //  implementation based on the modern JS bundlers features instead of
  //  the EuiIcon caching layer.
  if (
    typeof message === 'string' &&
    message.startsWith(
      'Warning: An update to %s inside a test was not wrapped in act(...).'
    ) &&
    rest[0] === 'EuiIconClass'
  ) {
    return;
  }

  throw new Error(format(message, ...rest));
};
