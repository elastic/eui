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
  hasNoInitialSelection,
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

  let emtpyOptionNode;
  if (hasNoInitialSelection) {
    emtpyOptionNode = (
      <option selected disabled hidden style={{ display: 'none' }}>&nbsp;</option>
    );
  }

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
          {emtpyOptionNode}
          {options.map((option, index) => {
            const {
              text,
              ...rest
            } = option;
            return <option {...rest} key={index}>{text}</option>;
          })}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired
  })).isRequired,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,

  /**
   * Simulates no selection by creating an empty, selected, hidden first option
   */
  hasNoInitialSelection: PropTypes.bool,
  inputRef: PropTypes.func,
};

EuiSelect.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  hasNoInitialSelection: false,
};
