import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
} from '../form_control_layout';

import {
  EuiValidatableControl,
} from '../validatable_control';

export const EuiFieldPassword = ({
  className,
  id,
  name,
  placeholder,
  value,
  isInvalid,
  fullWidth,
  ...rest
}) => {
  const classes = classNames(
    'euiFieldPassword',
    {
      'euiFieldPassword--fullWidth': fullWidth,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="lock"
      fullWidth={fullWidth}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type="password"
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          value={value}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiFieldPassword.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EuiFieldPassword.defaultProps = {
  value: undefined,
  fullWidth: false,
};
