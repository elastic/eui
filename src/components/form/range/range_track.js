import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { range, find } from 'lodash';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export class EuiRangeTrack extends Component {

  calculateTicksObject = (min, max, interval) => {
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

  render() {
    const {
      children,
      disabled,
      max,
      min,
      step,
      showTicks,
      tickInterval,
      ticks, // eslint-disable-line no-unused-vars
      levels,
      onChange,
      value
    } = this.props;

    let tickObject;
    const inputWrapperStyle = {};
    if (showTicks) {
      tickObject = this.calculateTicksObject(min, max, tickInterval || step || 1);

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
      <div className="euiRange__inputWrapper" style={inputWrapperStyle}>
        {children}
        {!!levels.length && (
          <EuiRangeLevels
            levels={levels}
            max={max}
            min={min}
          />
        )}
        {showTicks && (
          <EuiRangeTicks
            disabled={disabled}
            onChange={onChange}
            ticks={ticks}
            tickObject={tickObject}
            value={value}
            max={max}
          />
        )}
      </div>
    );
  }
}

EuiRangeTrack.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]),
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
};

EuiRangeTrack.defaultProps = {
  min: 1,
  max: 100,
  showInput: false,
  showTicks: false,
  levels: [],
};

const EuiRangeTicks = ({ disabled, onChange, ticks, tickObject, value, max }) => {
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

            tabIndex="-1"
          >
            {customTick ? customTick.label : tickValue}
          </button>
        );
      })}
    </div>
  );
};

const EuiRangeLevels = ({ levels, max, min }) => (
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
