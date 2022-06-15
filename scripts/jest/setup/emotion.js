import { createSerializer, matchers } from "@emotion/jest";

expect.extend(matchers);

const trimEuiSelector = (selector) => {
  // Matches the Emotion className pattern + the EUI variant naming convention.
  // Starts with `css-[hash]-`.
  // Contains `eui[ComponentName] or `Eui[ComponentName]`.
  // Capture the component name (from above) and all variant additions until the end of the string.
  const euiMatch = selector.match(/css-[\d\w]{6,}-(?<euiComponent>[eE]ui[A-Z][\d\w-]*$)/);
  // Use the captured group (`euiComponent`) if available and prepend with `emotion-`,
  // otherwise use the full selector.
  return euiMatch?.groups?.euiComponent ? `emotion-${euiMatch.groups.euiComponent}` : selector;
};

module.exports = createSerializer({
  classNameReplacer: trimEuiSelector,
  includeStyles: false,
});
