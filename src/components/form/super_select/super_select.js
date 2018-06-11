import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
} from '../form_control_layout';

export const EuiSuperSelect = ({
  className,
  options,
  id,
  name,
  inputRef,
  fullWidth,
  isLoading,
  hasNoInitialSelection,
  defaultValue,
  compressed,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiSuperSelect',
    {
      'euiSuperSelect--fullWidth': fullWidth,
      'euiSuperSelect--compressed': compressed,
      'euiSuperSelect-isLoading': isLoading,
    },
    className
  );

  let emptyOptionNode;
  if (hasNoInitialSelection) {
    emptyOptionNode = (
      <option value="" disabled hidden style={{ display: 'none' }}>&nbsp;</option>
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (!value) {
    selectDefaultValue = defaultValue || '';
  }

  let selectedValue;
  if (value) {
    const selectedOption = options.find(option => option.value === value);
    selectedValue = selectedOption.text;
  }

  const icon = {
    type: 'arrowDown',
    side: 'right',
  };

  return (
    <Fragment>
      <select
        id={id}
        name={name}
        className="euiSuperSelect__hiddenField"
        ref={inputRef}
        defaultValue={selectDefaultValue}
        value={value}
        aria-hidden="true"
        {...rest}
      >
        {emptyOptionNode}
        {options.map((option, index) => {
          const {
            text, // eslint-disable-line no-unused-vars
            ...rest
          } = option;
          return <option {...rest} key={index} />;
        })}
      </select>

      <EuiFormControlLayout
        icon={icon}
        fullWidth={fullWidth}
        isLoading={isLoading}
        compressed={compressed}
      >

        <button
          className={classes}
          {...rest}
        >
          {selectedValue}
        </button>

      </EuiFormControlLayout>
    </Fragment>
  );
};

EuiSuperSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node.isRequired,
    text: PropTypes.node.isRequired
  })).isRequired,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,

  /**
   * Simulates no selection by creating an empty, selected, hidden first option
   */
  hasNoInitialSelection: PropTypes.bool,
  inputRef: PropTypes.func,
  /**
   * when `true` creates a shorter height input
   */
  compressed: PropTypes.bool,
};

EuiSuperSelect.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  hasNoInitialSelection: false,
  compressed: false,
};
