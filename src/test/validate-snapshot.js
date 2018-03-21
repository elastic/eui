import { render } from 'enzyme';

/**
 * Boilerplate reducing function that verifies that the specified
 * component matches the stored snapshot. (See link.test.js for sample usage).
 * @param {ReactComponent} component
 */
export function validateSnapshot(component) {
  expect(render(component)).toMatchSnapshot();
}
