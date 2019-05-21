import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

export const EuiFieldNumber = ({
  className,
  icon,
  id,
  placeholder,
  name,
  min,
  max,
  value,
  isInvalid,
  fullWidth,
  isLoading,
  compressed,
  prepend,
  append,
  inputRef,
  ...rest
}) => {
  const classes = classNames('euiFieldNumber', className, {
    'euiFieldNumber--withIcon': icon,
    'euiFieldNumber--fullWidth': fullWidth,
    'euiFieldNumber--compressed': compressed,
    'euiFieldNumber--inGroup': prepend || append,
    'euiFieldNumber-isLoading': isLoading,
  });

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={append}>
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type="number"
          id={id}
          min={min}
          max={max}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classes}
          ref={inputRef}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

function numberOrEmptyString(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'string' && value !== '') {
      return new Error(
        `Invalid prop '${propName}' of type 'string' supplied to '${componentName}',` +
          ` expected empty string or type 'number', you supplied a string with the contents '${value}'.`
      );
    } else if (typeof value !== 'number') {
      return new Error(
        `Invalid prop '${propName}' of type '${typeof value}' supplied to '${componentName}',` +
          ` expected empty string or type 'number'.`
      );
    }
  }

  // assume all ok
  return null;
}

EuiFieldNumber.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: numberOrEmptyString,
  icon: PropTypes.string,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  /**
   * when `true` creates a shorter height input
   */
  compressed: PropTypes.bool,
  /**
   * Creates an input group with element(s) coming before input
   */
  prepend: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Creates an input group with element(s) coming after input
   */
  append: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

EuiFieldNumber.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};
