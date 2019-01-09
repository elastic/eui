import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { range, find } from 'lodash';

import { EuiFieldNumber } from '../field_number';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export class EuiRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
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
      ticks, // eslint-disable-line no-unused-vars
      levels,
      showRange,
      showValue,
      valueAppend, // eslint-disable-line no-unused-vars
      onChange,
      value,
      style,
      ...rest
    } = this.props;

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
        'euiRange__wrapper--hasLabels': showLabels,
        'euiRange__wrapper--hasLevels': levels.length,
        'euiRange__wrapper--hasRange': showRange,
        'euiRange__wrapper--hasTicks': showTicks,
        'euiRange__wrapper--hasValue': showValue,
      },
    );

    let sliderTabIndex;
    let extraInputNode;
    if (showInput) {
      // Chrome will properly size the input based on the max value, but FF & IE does not.
      // Calculate the max-width of the input based on number of characters in min or max unit, whichever is greater.
      // Add 2 to accomodate for input stepper
      const maxWidthStyle = { maxWidth: `${Math.max(String(min).length, String(max).length) + 2}em` };

      // Make this input the main control by disabling screen reader access to slider control
      sliderTabIndex = '-1';

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

    let tickObject;
    const inputWrapperStyle = {};
    if (showTicks) {
      tickObject = calculateTicksObject(min, max, tickInterval || step || 1);

      // Calculate if any extra margin should be added to the inputWrapper
      // because of longer tick labels on the ends
      const lengthOfMinLabel = String(tickObject.sequence[0]).length;
      const lenghtOfMaxLabel = String(tickObject.sequence[tickObject.sequence.length - 1]).length;
      const isLastTickTheMax = tickObject.sequence[tickObject.sequence.length - 1] === max;
      if (lengthOfMinLabel > 2) {
        inputWrapperStyle.marginLeft = `${(lengthOfMinLabel / 5)}em`;
      }
      if (isLastTickTheMax && lenghtOfMaxLabel > 2) {
        inputWrapperStyle.marginRight = `${(lenghtOfMaxLabel / 5)}em`;
      }
    }

    return (
      <div className={wrapperClasses}>
        {this.renderLabel('min')}

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
            tabIndex={sliderTabIndex}
            {...rest}
          />

          {this.renderValue()}
          {this.renderRange()}
          {this.renderLevels()}
          {this.renderTicks(tickObject)}
        </div>

        {this.renderLabel('max')}
        {extraInputNode}
      </div>
    );
  }

  renderLabel = (side) => {
    const {
      showLabels,
    } = this.props;

    if (!showLabels) { return; }

    return (
      <label className={`euiRange__${side}Label`}>
        {this.props[side]}
      </label>
    );

  }

  renderTicks = (tickObject) => {
    const {
      disabled,
      onChange,
      showTicks,
      ticks,
      value,
      max,
    } = this.props;

    if (!showTicks) {
      return;
    }

    // Align with item labels across the range by adding
    // left and right negative margins that is half of the tick marks
    const ticksStyle = !!ticks ? undefined : { margin: `0 ${tickObject.percentageWidth / -2}%`, left: 0, right: 0 };

    return (
      <div className="euiRange__ticks" style={ticksStyle}>
        {tickObject.sequence.map((tickValue) => {
          const tickStyle = {};
          let customTick;
          if (ticks) {
            customTick = find(ticks, function (o) { return o.value === tickValue; });

            if (customTick == null) {
              return;
            } else {
              tickStyle.left = `${(customTick.value / max) * 100}%`;
            }
          } else {
            tickStyle.width = `${tickObject.percentageWidth}%`;
          }

          const tickClasses = classNames(
            'euiRange__tick',
            {
              'euiRange__tick--selected': value === tickValue,
              'euiRange__tick-isCustom': customTick,
            }
          );

          return (
            <button
              type="button"
              className={tickClasses}
              key={tickValue}
              value={tickValue}
              disabled={disabled}
              onClick={onChange}
              style={tickStyle}
              // "Don't allow tabbing and just let the range to do the work for non-sighted users"
              tabIndex="-1"
            >
              {customTick ? customTick.label : tickValue}
            </button>
          );
        })}
      </div>
    );
  }

  renderRange = () => {
    const {
      showRange,
      value,
      max,
      min,
    } = this.props;

    if (!showRange) {
      return;
    }

    // Calculate the width the range based on value
    const rangeWidth = (value - min) / (max - min);
    const rangeWidthStyle = { width: `${rangeWidth * 100}%` };

    return (
      <div className="euiRange__range">
        <div className="euiRange__range__progress" style={rangeWidthStyle} />
      </div>
    );
  }

  renderValue = () => {
    const {
      showValue,
      value,
      valueAppend,
      max,
      min,
      name,
    } = this.props;

    if (!showValue) {
      return;
    }

    // Calculate the left position based on value
    const decimal = (value - min) / (max - min);
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

    return (
      <div className="euiRange__valueWrapper">
        <output className={valueClasses} htmlFor={name} style={valuePositionStyle}>
          {value}{valueAppend}
        </output>
      </div>
    );
  }

  renderLevels = () => {
    const {
      levels,
      max,
      min,
    } = this.props;

    if (levels.length < 1) {
      return;
    }

    return (
      <div className="euiRange__levels">
        {levels.map((level, index) => {
          const range = level.max - level.min;
          const width = (range / (max - min)) * 100;

          return (
            <span key={index} style={{ width: `${width}%` }} className={`euiRange__level--${level.color}`} />
          );
        })}
      </div>
    );
  }
}

function calculateTicksObject(min, max, interval) {
  // Calculate the width of each tick mark
  const tickWidthDecimal = (interval / ((max - min) + interval));
  const tickWidthPercentage = tickWidthDecimal * 100;

  // Loop from min to max, creating ticks at each interval
  // (adds a very small number to the max since `range` is not inclusive of the max value)
  const toBeInclusive = .000000001;
  const sequence = range(min, max + toBeInclusive, interval);

  return (
    {
      decimalWidth: tickWidthDecimal,
      percentageWidth: tickWidthPercentage,
      sequence: sequence,
    }
  );
}

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  /**
   * Specified ticks at specified values
   */
  ticks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.node.isRequired,
    }),
  ),
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
  /**
   * Shows a tooltip styled value
   */
  valueAppend: PropTypes.node,
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
