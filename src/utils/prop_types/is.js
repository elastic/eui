import { isNil } from '../../services/predicate';

export const is = expectedValue => {
  const validator = (props, propName, componentName) => {
    const compName = componentName || 'ANONYMOUS';
    const value = props[propName];
    if (value !== expectedValue) {
      return new Error(`[${propName}] property in [${compName}] component is expected to equal [${expectedValue}] but 
         [${value}] was provided instead.`);
    }
    return null;
  };

  validator.isRequired = (props, propName, componentName) => {
    const compName = componentName || 'ANONYMOUS';
    const value = props[propName];
    if (isNil(value)) {
      return new Error(
        `[${propName}] property in [${compName}] component is required but seems to be missing`
      );
    }
    return validator(props, propName, componentName);
  };

  return validator;
};
