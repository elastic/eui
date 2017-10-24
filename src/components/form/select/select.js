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
  isInvalid,
  fullWidth,
  ...rest,
}) => {
  const classes = classNames(
    'kuiSelect',
    {
      'kuiSelect--fullWidth': fullWidth,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="arrowDown"
      iconSide="right"
      fullWidth={fullWidth}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          {...rest}
        >
          {options.map((option, index) => {
            return <option value={option.value} key={index}>{option.text}</option>;
          })}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EuiSelect.defaultProps = {
  options: [],
  fullWidth: false,
};
