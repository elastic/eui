import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { keyCodes } from '../../../services';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTrack, LEVEL_COLORS } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export class EuiDualRange extends Component {
  rangeSliderRef = React.createRef();

  get lowerValue() {
    return this.props.value[0];
  }
  get upperValue() {
    return this.props.value[1];
  }

  _determineThumbMovement = (newVal, e) => {
    // Determine closer thumb
    let lower = this.lowerValue;
    let upper = this.upperValue;
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
    this._handleOnChange(e.target.value, this.upperValue, e);
  }

  handleUpperInputChange = (e) => {
    this._handleOnChange(this.lowerValue, e.target.value, e);
  }

  _handleKeyDown = (value, e) => {
    e.preventDefault();
    let newVal = value;
    const change = this.props.step || 1;
    switch (e.keyCode) {
      case keyCodes.UP:
      case keyCodes.RIGHT:
        newVal += change;
        break;
      case keyCodes.DOWN:
      case keyCodes.LEFT:
        newVal -= change;
        break;
    }
    return newVal;
  }

  handleLowerKeyDown = (e) => {
    let lower = this.lowerValue;
    switch (e.keyCode) {
      case keyCodes.TAB:
        return;
      default:
        lower = this._handleKeyDown(lower, e);
    }
    if (lower >= this.upperValue || lower < this.props.min) return;
    this._handleOnChange(lower, this.upperValue, e);
  }

  handleUpperKeyDown = (e) => {
    let upper = this.upperValue;
    switch (e.keyCode) {
      case keyCodes.TAB:
        return;
      default:
        upper = this._handleKeyDown(upper, e);
    }
    if (upper <= this.lowerValue || upper > this.props.max) return;
    this._handleOnChange(this.lowerValue, upper,  e);
  }

  calculateThumbPositionStyle = (value) => {
    // Calculate the left position based on value
    const decimal = (value - this.props.min) / (this.props.max - this.props.min);
    // Must be between 0-100%
    let valuePosition = decimal <= 1 ? decimal : 1;
    valuePosition = valuePosition >= 0 ? valuePosition : 0;

    // TODO: Get ref earlier
    const thumbToTrackRatio = this.rangeSliderRef.current ? (16 / this.rangeSliderRef.current.offsetWidth) : 0.05;
    const trackPositionScale = (1 - thumbToTrackRatio) * 100;
    return { left: `${valuePosition * trackPositionScale}%` };
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
      onChange, // eslint-disable-line no-unused-vars
      showRange,
      valueAppend, // eslint-disable-line no-unused-vars
      value,
      style,
      ...rest
    } = this.props;

    const rangeClasses = classNames('euiRange', 'euiRange--dual', className);

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
            max={Number(this.upperValue)}
            step={step}
            value={this.lowerValue}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleLowerInputChange}
            name={name}
          />
        )}
        {showLabels && <EuiRangeLabel side="min">{min}</EuiRangeLabel>}
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
            ref={this.rangeSliderRef}
            id={id}
            name={name}
            className={rangeClasses}
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

          <EuiRangeThumb
            min={min}
            max={Number(this.upperValue)}
            value={this.lowerValue}
            disabled={disabled}
            showTicks={showTicks}
            showInput={showInput}
            onKeyDown={this.handleLowerKeyDown}
            style={this.calculateThumbPositionStyle(this.lowerValue)}
          />
          <EuiRangeThumb
            min={Number(this.lowerValue)}
            max={max}
            value={this.upperValue}
            disabled={disabled}
            showTicks={showTicks}
            showInput={showInput}
            onKeyDown={this.handleUpperKeyDown}
            style={this.calculateThumbPositionStyle(this.upperValue)}
          />

          {showRange && (
            <EuiRangeHighlight
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(this.lowerValue)}
              upperValue={Number(this.upperValue)}
            />
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel side="max">{max}</EuiRangeLabel>}
        {showInput && (
          <EuiRangeInput
            min={Number(this.lowerValue)}
            max={max}
            step={step}
            value={this.upperValue}
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

const EuiRangeThumb = ({ min, max, value, disabled, onKeyDown, showInput, showTicks, style }) => {
  const classes = classNames(
    'euiRange__thumb',
    {
      'euiRange__thumb--hasTicks': showTicks
    },
  );
  return (
    <div
      className={classes}
      style={style}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={!!disabled}
      tabIndex={showInput ? '-1' : '0'}
      onKeyDown={onKeyDown}
    />
  );
};
