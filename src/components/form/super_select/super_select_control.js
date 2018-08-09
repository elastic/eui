import React, { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  // In the case the inputDisplay is a react element, make it a string, then strip the HTML
  // This is used to read only the text for a screenreader.
  const selectedValueAsString = renderToString(selectedValue).replace(/<\/?[^>]+(>|$)/g, '');

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

        <button
          role="option"
          type="button"
          className={classes}
          aria-haspopup="true"
          aria-label={`Select an option: ${selectedValueAsString} selected`}
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
