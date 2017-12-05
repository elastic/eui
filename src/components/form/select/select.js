import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
} from '../form_control_layout';

import {
  EuiValidatableControl,
} from '../validatable_control';

export const EuiSelect = ({
  className,
  options,
  id,
  name,
  inputRef,
  isInvalid,
  fullWidth,
  isLoading,
  ...rest
}) => {
  const classes = classNames(
    'euiSelect',
    {
      'euiSelect--fullWidth': fullWidth,
      'euiSelect-isLoading': isLoading,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="arrowDown"
      iconSide="right"
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          ref={inputRef}
          {...rest}
        >
          {options.map((option, index) => (
            <option value={option.value} key={index}>{option.text}</option>
          ))}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  inputRef: PropTypes.func,
};

EuiSelect.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
};
