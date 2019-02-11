import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import range from 'lodash/range';

import { EuiRangeLevels, LEVEL_COLORS } from './range_levels';
import { EuiRangeTicks } from './range_ticks';

export { LEVEL_COLORS };

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

    const trackClasses = classNames('euiRangeTrack', {
      'euiRangeTrack--disabled': disabled
    });

    return (
      <div className={trackClasses} style={inputWrapperStyle}>
        {children}
        {!!levels.length && (
          <EuiRangeLevels
            levels={levels}
            max={max}
            min={min}
            showTicks={showTicks}
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
  showTicks: PropTypes.bool,
  tickInterval: PropTypes.number,
  ticks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.node.isRequired,
    }),
  ),
  onChange: PropTypes.func,
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    }),
  ),
};
