import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
} from '../form_control_layout';

import {
  EuiValidatableControl,
} from '../validatable_control';

export const EuiFieldSearch = ({
  className,
  id,
  name,
  placeholder,
  value,
  isInvalid,
  fullWidth,
  ...rest,
}) => {
  const classes = classNames(
    'kuiFieldSearch',
    {
      'kuiFieldSearch--fullWidth': fullWidth,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="search"
      fullWidth={fullWidth}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type="search"
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

EuiFieldSearch.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EuiFieldSearch.defaultProps = {
  value: undefined,
  fullWidth: false,
};
