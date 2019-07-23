import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

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
  defaultValue,
  compressed,
  value,
  prepend,
  append,
  onMouseUp,
  readOnly,
  ...rest
}) => {
  const handleMouseUp = e => {
    // Normalizes cross-browser mouse eventing by preventing propagation,
    // notably for use in conjunction with EuiOutsideClickDetector.
    // See https://github.com/elastic/eui/pull/1926 for full discussion on
    // rationale and alternatives should this intervention become problematic.
    e.nativeEvent.stopImmediatePropagation();
    if (onMouseUp) onMouseUp(e);
  };

  const classes = classNames(
    'euiSelect',
    {
      'euiSelect--fullWidth': fullWidth,
      'euiSelect--compressed': compressed,
      'euiSelect--inGroup': prepend || append,
      'euiSelect-isLoading': isLoading,
    },
    className
  );

  let emptyOptionNode;
  if (hasNoInitialSelection) {
    emptyOptionNode = (
      <option value="" disabled hidden style={{ display: 'none' }}>
        &nbsp;
      </option>
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  const icon = {
    type: 'arrowDown',
    side: 'right',
  };

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
        <select
          id={id}
          name={name}
          className={classes}
          ref={inputRef}
          defaultValue={selectDefaultValue}
          value={value}
          readOnly={readOnly}
          onMouseUp={handleMouseUp}
          {...rest}>
          {emptyOptionNode}
          {options.map((option, index) => {
            const { text, ...rest } = option;
            return (
              <option {...rest} key={index}>
                {text}
              </option>
            );
          })}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.node.isRequired,
    })
  ).isRequired,
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
  readOnly: PropTypes.bool,
  /**
   * Creates an input group with element(s) coming before select
   */
  prepend: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Creates an input group with element(s) coming after select
   */
  append: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

EuiSelect.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  hasNoInitialSelection: false,
  compressed: false,
};
