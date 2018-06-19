import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFieldNumber } from '../field_number';

export const EuiRange = ({
  className,
  compressed,
  disabled,
  fullWidth,
  id,
  max,
  min,
  name,
  showLabels,
  showInput,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiRange',
    {
      'euiRange--fullWidth': fullWidth,
      'euiRange--compressed': compressed,
    },
    className
  );

  const wrapperClasses = classNames(
    'euiRange__wrapper',
    {
      'euiRange__wrapper--fullWidth': fullWidth,
      'euiRange__wrapper--compressed': compressed,
      'euiRange__wrapper--disabled': disabled,
    },
  );

  let minLabelNode;
  let maxLabelNode;
  if (showLabels) {
    minLabelNode = (
      <label className="euiRange__minLabel">
        {min}
      </label>
    );

    maxLabelNode = (
      <label className="euiRange__maxLabel">
        {max}
      </label>
    );
  }

  let extraInputNode;
  if (showInput) {
    extraInputNode = (
      <EuiFieldNumber
        name={name}
        className="euiRange__extraInput"
        min={min}
        max={max}
        value={Number(value)}
        disabled={disabled}
        compressed={compressed}
        {...rest}
      />
    );
  }

  return (
    <div
      className={wrapperClasses}
    >
      {minLabelNode}
      <input
        type="range"
        id={id}
        name={name}
        className={classes}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        {...rest}
      />
      {maxLabelNode}
      {extraInputNode}
    </div>
  );
};

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  compressed: PropTypes.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
  /**
   * Displays an extra input control for direct manipulation
   */
  showInput: PropTypes.bool,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
};
