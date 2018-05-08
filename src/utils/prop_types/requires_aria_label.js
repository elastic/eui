/**
 * PropType validation to require an aria label if the associated function property is also present
 *
 * example:
 * ExampleComponent.propTypes = {
 *   onClick: PropTypes.func,
 *   onClickAriaLabel: requiresAriaLabel('onClick')
 * }
 *
 * this validator warns if ExampleComponent is passed an `onClick` prop with no `onClickAriaLabel`
 */
export const requiresAriaLabel = (action) => {

  const validator = (props, propName, componentName) => {
    // if the associated action property exists but the aria label property is missing
    if (props[action] && !props[propName]) {
      return new Error(
        `Please provide an aria label to compliment your ${action} ` +
        `prop in ${componentName}`
      );
    }

    return null;
  };

  return validator;
};
