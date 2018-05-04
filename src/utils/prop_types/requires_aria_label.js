export const requiresAriaLabel = (action, label) => {

  const validator = (props, propName, componentName) => {
    if (props[action] && !props[label]) {
      return new Error(
        `Please provide an aria label to compliment your ${action} ` +
        `prop in ${componentName}`
      );
    }

    return null;
  };

  return validator;
};
