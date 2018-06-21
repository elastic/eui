import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { range } from 'lodash';

import { EuiFieldNumber } from '../field_number';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

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
  levels,
  showRange,
  showValue,
  onChange,
  value,
  style,
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
      'euiRange__wrapper--hasLevels': levels.length,
      'euiRange__wrapper--hasRange': showRange,
      'euiRange__wrapper--hasValue': showValue,
    },
  );

  const rangeTotal = (max - min);

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
    // Chrome will properly size the input based on the max value, but FF & IE does not.
    // Calculate the max-width of the input based on number of characters in max unit
    // Add 2 to accomodate for input stepper
    const maxWidthStyle = { maxWidth: `${String(max).length + 2}em` };

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
        style={maxWidthStyle}
        {...rest}
      />
    );
  }

  const inputWrapperStyle = {};
  let tickWidth; // TODO: Move to scope & change name
  let tickMarksNode;
  if (showTicks) {
    // Set the interval for which to show the tick marks
    const interval = tickInterval || step || 1;
    // Calculate the width of each tick mark
    tickWidth = (interval / (rangeTotal + interval));
    const tickWidthPercentage = tickWidth * 100;

    // Align with item labels across the range by adding
    // left and right negative margins that is half of the tick marks
    const ticksStyle = { margin: `0 ${tickWidthPercentage / -2}%` };

    // Loop from min to max, creating ticks at each interval
    // (adds 1 to max to ensure that the max tick is also included) TODO: add more about +1 for length
    const toBeInclusive = .000000001;
    const sequence = range(min, max + toBeInclusive, interval);
    console.log(sequence);

    // Calculate if any extra margin should be added to the inputWrapper
    // because of longer tick labels on the ends
    const minLength = String(sequence[0]).length;
    const maxLength = String(sequence[sequence.length - 1]).length;
    const lastTickIsMax = sequence[sequence.length - 1] === max;
    if (lastTickIsMax && minLength > 2) {
      inputWrapperStyle.marginLeft = `${(minLength / 5)}em`;
    }
    if (lastTickIsMax && maxLength > 2) {
      inputWrapperStyle.marginRight = `${(maxLength / 5)}em`;
    }

    tickMarksNode = (
      <div className="euiRange__ticks" style={ticksStyle}>
        {sequence.map((tickValue, index) => {
          const tickClasses = classNames(
            'euiRange__tick',
            { 'euiRange__tick--selected': value === tickValue, }
          );

          return (
            <button
              type="button"
              className={tickClasses}
              key={index}
              disabled={disabled}
              value={tickValue}
              onClick={onChange}
              style={{ width: `${tickWidthPercentage}%` }}
            >
              {tickValue}
            </button>
          );
        })}
      </div>
    );
  }

  let levelsNode;
  if (levels.length) {
    levelsNode = (
      <div className="euiRange__levels" style={style}>
        {levels.map((level, index) => {
          const range = level.max - level.min;
          const width = (range / rangeTotal) * 100;

          return (
            <span key={index} style={{ width: `${width}%` }} className={`euiRange__level--${level.color}`} />
          );
        })}
      </div>
    );
  }

  let rangeNode;
  if (showRange) {
    // Calculate the width the range based on value
    const rangeWidth = (value - min) / rangeTotal;
    const rangeWidthStyle = { width: `${rangeWidth * 100}%` };

    rangeNode = (
      <div className="euiRange__range" style={style}>
        <div className="euiRange__range__progress" style={rangeWidthStyle} />
      </div>
    );
  }

  let valueNode;
  if (showValue) {
    // Calculate the left position based on value
    const decimal = (value - min) / rangeTotal;
    // Must be between 0-100%
    let valuePosition = decimal <= 1 ? decimal : 1;
    valuePosition = valuePosition >= 0 ? valuePosition : 0;

    let valuePositionSide;
    if (valuePosition > .5) {
      valuePositionSide = 'left';
    } else {
      valuePositionSide = 'right';
    }

    const valuePositionStyle = { left: `${valuePosition * 100}%` };

    // Change left/right position based on value (half way point)
    const valueClasses = classNames(
      'euiRange__value',
      `euiRange__value--${valuePositionSide}`,
    );

    valueNode = (
      <div className="euiRange__valueWrapper">
        <output className={valueClasses} htmlFor={name} style={valuePositionStyle}>
          {value}
        </output>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {minLabelNode}

      <div className="euiRange__inputWrapper" style={inputWrapperStyle}>
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
          style={style}
          {...rest}
        />

        {valueNode}
        {rangeNode}
        {tickMarksNode}
        {levelsNode}

      </div>

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
  /**
   * Create colored indicators for certain intervals
   */
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    }),
  ),
  /**
   * Shows a thick line from min to value
   */
  showRange: PropTypes.bool,
  /**
   * Shows a tooltip styled value
   */
  showValue: PropTypes.bool,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showTicks: false,
  showValue: false,
  levels: [],
};
