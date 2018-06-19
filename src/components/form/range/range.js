import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { range } from 'lodash';

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
  step,
  showLabels,
  showInput,
  showTicks,
  tickInterval,
  onChange,
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
      'euiRange__wrapper--hasTicks': showTicks,
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
        step={step}
        value={Number(value)}
        disabled={disabled}
        compressed={compressed}
        onChange={onChange}
        {...rest}
      />
    );
  }

  let tickMarksNode;
  if (showTicks) {
    // Set the interval for which to show the tick marks
    const interval = tickInterval || step || 1;
    // Loop from min to max, creating ticks at each interval
    const sequence = range(min, max, interval);
    tickMarksNode = (
      <div className="euiRange__ticks">
        {sequence.map((tickValue, index) => {
          const tickClasses = classNames(
            'euiRange__tick',
            { 'euiRange__tick--selected': value === tickValue, }
          );
          return (
            <button
              className={tickClasses}
              key={index}
              disabled={disabled}
              value={tickValue}
              onClick={onChange}
            >
              {tickValue}
            </button>
          );
        })}
      </div>
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
        step={step}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      {maxLabelNode}
      {extraInputNode}
      {tickMarksNode}
    </div>
  );
};

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
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
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks: PropTypes.bool,
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval: PropTypes.number,
  onChange: PropTypes.func,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showTicks: false,
};
