import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import makeId from '../form_row/make_id';
import {
  EuiFormControlLayout,
} from '../form_control_layout';

export const EuiSuperSelectControl = ({
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
    'euiSuperSelectControl',
    {
      'euiSuperSelectControl--fullWidth': fullWidth,
      'euiSuperSelectControl--compressed': compressed,
      'euiSuperSelectControl-isLoading': isLoading,
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
    selectedValue = selectedOption.inputDisplay;
  }

  const icon = {
    type: 'arrowDown',
    side: 'right',
  };

  const screenReaderId = makeId();

  return (
    <Fragment>
      <select
        id={id}
        name={name}
        className="euiSuperSelectControl__hiddenField"
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
            value,
          } = option;
          return <option value={value} key={index} />;
        })}
      </select>

      <EuiFormControlLayout
        icon={icon}
        fullWidth={fullWidth}
        isLoading={isLoading}
        compressed={compressed}
      >

        {/*
          This is read when the user tabs in. The comma is important,
          otherwise the screen reader often combines the text.
        */}
        <EuiScreenReaderOnly>
          <span id={screenReaderId}>
            Select an option: {selectedValue}, is selected
          </span>
        </EuiScreenReaderOnly>

        <button
          role="option"
          type="button"
          className={classes}
          aria-haspopup="true"
          aria-labelledby={screenReaderId}
          {...rest}
        >
          {selectedValue}
        </button>

      </EuiFormControlLayout>
    </Fragment>
  );
};

EuiSuperSelectControl.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node.isRequired,
    inputDisplay: PropTypes.node.isRequired
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

EuiSuperSelectControl.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  hasNoInitialSelection: false,
  compressed: false,
};
