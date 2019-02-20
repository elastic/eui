import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import range from 'lodash/range';
import find from 'lodash/find';

import { EuiRangeLevels, LEVEL_COLORS } from './range_levels';
import { EuiRangeTicks } from './range_ticks';

export { LEVEL_COLORS };

export class EuiRangeTrack extends Component {

  calculateSequence = (min, max, interval) => {
    // Loop from min to max, creating adding values at each interval
    // (adds a very small number to the max since `range` is not inclusive of the max value)
    const toBeInclusive = .000000001;
    const sequence = range(min, max + toBeInclusive, interval);

    // Error out if the max value is not included in the sequence
    if (!find(sequence, o => o === max)) {
      console.error(max, sequence);
      throw new Error(`The max value of ${max} is not included in the possible sequence.`);
    }

    // If no problems, return the sequence
    return sequence;
  }

  calculateTicksObject = (sequence, tickSequence, customTicks) => {
    let ticks = sequence;

    if (customTicks) {
      // If custom values were passed, use those for the sequence
      // But make sure they align with the possible sequence
      ticks = customTicks.map(o => {
        if (find(sequence, value => value === o.value) !== undefined) {
          return o.value;
        } else {
          console.error(o.value, sequence);
          throw new Error(`Custom tick value of ${o.value} does not exist among the possible sequence.`);
        }
      });
    } else if (tickSequence) {
      // If a custom interval was passed, use those for the sequence
      // But make sure they align with the possible sequence
      ticks = tickSequence.map(o => {
        if (find(sequence, value => value === o) !== undefined) {
          return o;
        } else {
          console.error(o, sequence);
          throw new Error(`Tick interval value of ${o} does not exist among the possible sequence.`);
        }
      });
    }

    // Error out if there are too many ticks to render
    if (ticks.length > 20) {
      throw new Error(`The number of ticks to render is too high (${ticks.length}), reduce the interval.`);
    }

    return (
      {
        sequence: ticks,
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
      ticks,
      levels,
      onChange,
      value
    } = this.props;

    // TODO: Move these to only re-calculate if no-value props have changed
    const interval = step || 1;
    const sequence = this.calculateSequence(min, max, interval);

    let tickObject;
    const inputWrapperStyle = {};
    if (showTicks) {
      const tickSequence = tickInterval ? this.calculateSequence(min, max, tickInterval) : sequence;
      tickObject = this.calculateTicksObject(sequence, tickSequence, ticks);

      // Calculate the width of each tick mark
      const calcWidthBy = tickInterval || step;
      tickObject.percentageWidth = (calcWidthBy / ((max - min) + calcWidthBy)) * 100;

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
        {tickObject && (
          <EuiRangeTicks
            disabled={disabled}
            onChange={onChange}
            ticks={ticks}
            tickObject={tickObject}
            value={value}
            min={min}
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
