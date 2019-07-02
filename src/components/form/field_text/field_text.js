import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

export const EuiFieldText = ({
  id,
  name,
  placeholder,
  value,
  className,
  icon,
  isInvalid,
  inputRef,
  fullWidth,
  isLoading,
  compressed,
  prepend,
  append,
  readOnly,
  ...rest
}) => {
  const classes = classNames('euiFieldText', className, {
    'euiFieldText--withIcon': icon,
    'euiFieldText--fullWidth': fullWidth,
    'euiFieldText--compressed': compressed,
    'euiFieldText--inGroup': prepend || append,
    'euiFieldText-isLoading': isLoading,
  });

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}>
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          value={value}
          ref={inputRef}
          readOnly={readOnly}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiFieldText.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  isInvalid: PropTypes.bool,
  inputRef: PropTypes.func,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  readOnly: PropTypes.bool,
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

EuiFieldText.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};
