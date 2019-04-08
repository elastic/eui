import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import makeId from '../form_row/make_id';
import {
  EuiFormControlLayout,
} from '../form_control_layout';
import { EuiI18n } from '../../i18n';

export const EuiSuperSelectControl = ({
  className,
  options,
  id,
  name,
  fullWidth,
  isLoading,
  isInvalid,
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
      'euiSuperSelectControl-isInvalid': isInvalid,
    },
    className
  );

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  let selectedValue = '';
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
      <input
        type="hidden"
        id={id}
        name={name}
        defaultValue={selectDefaultValue}
        value={value}
      />

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
            <EuiI18n
              token="euiSuperSelectControl.selectAnOption"
              default="Select an option: {selectedValue}, is selected"
              values={{ selectedValue }}
            />
          </span>
        </EuiScreenReaderOnly>

        <button
          role="option"
          type="button"
          className={classes}
          aria-haspopup="true"
          aria-labelledby={`${id} ${screenReaderId}`}
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
   * when `true` creates a shorter height input
   */
  compressed: PropTypes.bool,
};

EuiSuperSelectControl.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  isInvalid: false,
  compressed: false,
};
