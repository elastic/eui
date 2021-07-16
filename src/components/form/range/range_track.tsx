/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, MouseEventHandler, HTMLAttributes } from 'react';
import classNames from 'classnames';

import range from 'lodash/range';

import { isEvenlyDivisibleBy } from '../../../services';
import { EuiRangeLevels, EuiRangeLevel, LEVEL_COLORS } from './range_levels';
import { EuiRangeTicks, EuiRangeTick } from './range_ticks';

export { LEVEL_COLORS };

export interface EuiRangeTrackProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min: number;
  max: number;
  step?: number;
  value?: number | string | Array<string | number>;
  compressed?: boolean;
  disabled?: boolean;
  showTicks?: boolean;
  tickInterval?: number;
  ticks?: EuiRangeTick[];
  onChange?: MouseEventHandler<HTMLButtonElement>;
  levels?: EuiRangeLevel[];
}

export class EuiRangeTrack extends Component<EuiRangeTrackProps> {
  validateValueIsInStep = (value: number) => {
    if (value < this.props.min) {
      throw new Error(
        `The value of ${value} is lower than the min value of ${this.props.min}.`
      );
    }
    if (value > this.props.max) {
      throw new Error(
        `The value of ${value} is higher than the max value of ${this.props.max}.`
      );
    }
    // Error out if the value doesn't line up with the sequence of steps
    if (
      !isEvenlyDivisibleBy(
        value - this.props.min,
        this.props.step !== undefined ? this.props.step : 1
      )
    ) {
      throw new Error(
        `The value of ${value} is not included in the possible sequence provided by the step of ${this.props.step}.`
      );
    }
    // Return the value if nothing fails
    return value;
  };

  calculateSequence = (
    min: EuiRangeTrackProps['min'],
    max: EuiRangeTrackProps['max'],
    interval?: EuiRangeTrackProps['tickInterval']
  ) => {
    // Loop from min to max, creating adding values at each interval
    const sequence = range(min, max, interval);
    // range is non-inclusive of max, so make it inclusive
    if (max % interval! === 0 && !sequence.includes(max)) {
      sequence.push(max);
    }
    return sequence;
  };

  calculateTicks = (
    min: EuiRangeTrackProps['min'],
    max: EuiRangeTrackProps['max'],
    step?: EuiRangeTrackProps['step'],
    tickInterval?: EuiRangeTrackProps['tickInterval'],
    customTicks?: EuiRangeTick[]
  ) => {
    let ticks;

    if (customTicks) {
      // If custom values were passed, use those for the sequence
      // But make sure they align with the possible sequence
      ticks = customTicks.map((tick) => {
        return this.validateValueIsInStep(tick.value);
      });
    } else {
      // If a custom interval was passed, use those for the sequence
      // But make sure they align with the possible sequence
      const interval = tickInterval || step;
      const tickSequence = this.calculateSequence(min, max, interval);

      ticks = tickSequence.map((tick) => {
        return this.validateValueIsInStep(tick);
      });
    }

    // Error out if there are too many ticks to render
    if (ticks.length > 20) {
      throw new Error(
        `The number of ticks to render is too high (${ticks.length}), reduce the interval.`
      );
    }

    return ticks;
  };

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
      value,
      compressed,
      ...rest
    } = this.props;

    // TODO: Move these to only re-calculate if no-value props have changed
    this.validateValueIsInStep(max);

    const tickSequence =
      showTicks === true &&
      this.calculateTicks(min, max, step, tickInterval, ticks);

    const trackClasses = classNames('euiRangeTrack', {
      'euiRangeTrack--disabled': disabled,
      'euiRangeTrack--hasLevels': levels && !!levels.length,
      'euiRangeTrack--hasTicks': tickSequence || ticks,
      'euiRangeTrack--compressed': compressed,
    });

    return (
      <div className={trackClasses} {...rest}>
        {levels && !!levels.length && (
          <EuiRangeLevels
            compressed={compressed}
            levels={levels}
            max={max}
            min={min}
            showTicks={showTicks}
          />
        )}
        {tickSequence && (
          <EuiRangeTicks
            disabled={disabled}
            compressed={compressed}
            onChange={onChange}
            ticks={ticks}
            tickSequence={tickSequence}
            value={value}
            min={min}
            max={max}
            interval={tickInterval || step}
          />
        )}
        {children}
      </div>
    );
  }
}
