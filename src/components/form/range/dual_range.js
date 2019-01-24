import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTrack } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export class EuiDualRange extends Component {

  _determineThumbMovement = (newVal, e) => {
    // Determine closer thumb
    let lower = this.props.value[0];
    let upper = this.props.value[1];
    if (Math.abs(lower - newVal) <= Math.abs(upper - newVal)) {
      lower = newVal;
    } else {
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  }

  _handleOnChange = (lower, upper, e) => {
    this.props.onChange([lower, upper], e);
  }

  handleSliderChange = (e) => {
    this._determineThumbMovement(e.target.value, e);
  }

  handleLowerInputChange = (e) => {
    this._handleOnChange(e.target.value, this.props.value[1], e);
  }

  handleUpperInputChange = (e) => {
    this._handleOnChange(this.props.value[0], e.target.value, e);
  }

  calculateThumbPositionStyle = (value) => {
    // Calculate the left position based on value
    const decimal = (value - this.props.min) / (this.props.max - this.props.min);
    // Must be between 0-100%
    let valuePosition = decimal <= 1 ? decimal : 1;
    valuePosition = valuePosition >= 0 ? valuePosition : 0;

    //TODO: left should be 100% - (ratio of thumb width to track width)
    return { left: `${valuePosition * 95.5}%` };
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
      valueAppend, // eslint-disable-line no-unused-vars
      value,
      style,
      ...rest
    } = this.props;

    const thumbClasses = classNames(
      'euiRange__thumb',
      {
        'euiRange__thumb--hasTicks': showTicks
      },
    );
    const lowerThumbStyle = this.calculateThumbPositionStyle(value[0]);
    const upperThumbStyle = this.calculateThumbPositionStyle(value[1]);

    return (
      <EuiRangeWrapper
        compressed={compressed}
        disabled={disabled}
        fullWidth={fullWidth}
        showLabels={showLabels}
        showTicks={showTicks}
        levels={levels}
        showRange={showRange}
      >
        {showInput && (
          <EuiRangeInput
            min={min}
            max={value[1]}
            step={step}
            value={value[0]}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleLowerInputChange}
            name={name}
          />
        )}
        {showLabels && <EuiRangeLabel side="min">{this.props.min}</EuiRangeLabel>}
        <EuiRangeTrack
          disabled={disabled}
          max={max}
          min={min}
          step={step}
          showTicks={showTicks}
          tickInterval={tickInterval}
          ticks={ticks}
          levels={levels}
          onChange={this.handleSliderChange}
          value={value}
        >
          <EuiRangeSlider
            id={id}
            name={name}
            className={`euiRange euiRange--dual ${className}`}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={this.handleSliderChange}
            style={style}
            tabIndex={'-1'}
            {...rest}
          />

          <div className={thumbClasses} style={lowerThumbStyle} />
          <div className={thumbClasses} style={upperThumbStyle} />

          {showRange && (
            <EuiRangeHighlight
              min={min}
              max={max}
              lowerValue={value[0]}
              upperValue={value[1]}
            />
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel side="max">{this.props.max}</EuiRangeLabel>}
        {showInput && (
          <EuiRangeInput
            min={value[0]}
            max={max}
            step={step}
            value={value[1]}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleUpperInputChange}
            name={name}
          />
        )}
      </EuiRangeWrapper>
    );
  }
}

EuiDualRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
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
  valueAppend: PropTypes.node,
};

EuiDualRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showTicks: false,
  levels: [],
};
