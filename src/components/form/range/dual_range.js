import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { keyCodes } from '../../../services';
import { isWithinRange } from '../../../services/number';

import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeThumb } from './range_thumb';
import { EuiRangeTrack, LEVEL_COLORS } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

export class EuiDualRange extends Component {
  state = {
    hasFocus: false,
    rangeSliderRefAvailable: false,
  };

  rangeSliderRef = null;
  handleRangeSliderRefUpdate = ref => {
    this.rangeSliderRef = ref;
    this.setState({
      rangeSliderRefAvailable: !!ref,
    });
  };

  get lowerValue() {
    return this.props.value ? this.props.value[0] : this.props.min;
  }
  get upperValue() {
    return this.props.value ? this.props.value[1] : this.props.max;
  }
  get lowerValueIsValid() {
    return isWithinRange(this.props.min, this.upperValue, this.lowerValue);
  }
  get upperValueIsValid() {
    return isWithinRange(this.lowerValue, this.props.max, this.upperValue);
  }
  get isValid() {
    return this.lowerValueIsValid && this.upperValueIsValid;
  }

  _determineInvalidThumbMovement = (newVal, lower, upper, e) => {
    // If the values are invalid, find whether the new value is in the upper
    // or lower half and move the appropriate handle to the new value,
    // while the other handle gets moved to the opposite bound (if invalid)
    const lowerHalf =
      Math.abs(this.props.max - this.props.min) / 2 + this.props.min;
    const newValIsLow = isWithinRange(this.props.min, lowerHalf, newVal);
    if (newValIsLow) {
      lower = newVal;
      upper = !this.upperValueIsValid ? this.props.max : upper;
    } else {
      lower = !this.lowerValueIsValid ? this.props.min : lower;
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  };

  _determineValidThumbMovement = (newVal, lower, upper, e) => {
    // Lower thumb targeted or right-moving swap has occured
    if (Math.abs(lower - newVal) < Math.abs(upper - newVal)) {
      lower = newVal;
    }
    // Upper thumb targeted or left-moving swap has occured
    else {
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  };

  _determineThumbMovement = (newVal, e) => {
    // Determine thumb movement based on slider interaction
    if (!this.isValid) {
      // Non-standard positioning follows
      this._determineInvalidThumbMovement(
        newVal,
        this.lowerValue,
        this.upperValue,
        e
      );
    } else {
      // Standard positioning based on click event proximity to thumb locations
      this._determineValidThumbMovement(
        newVal,
        this.lowerValue,
        this.upperValue,
        e
      );
    }
  };

  _handleOnChange = (lower, upper, e) => {
    const isValid =
      isWithinRange(this.props.min, upper, lower) &&
      isWithinRange(lower, this.props.max, upper);
    this.props.onChange([lower, upper], isValid, e);
  };

  handleSliderChange = e => {
    this._determineThumbMovement(e.target.value, e);
  };

  _resetToRangeEnds = e => {
    // Arbitrary decision to pass `min` instead of `max`. Result is the same.
    this._determineInvalidThumbMovement(
      this.props.min,
      this.lowerValue,
      this.upperValue,
      e
    );
  };

  _isDirectionalKeyPress = e => {
    return (
      [keyCodes.UP, keyCodes.RIGHT, keyCodes.DOWN, keyCodes.LEFT].indexOf(
        e.keyCode
      ) > -1
    );
  };

  handleInputKeyDown = e => {
    // Relevant only when initial values are both `''` and `showInput` is set
    if (this._isDirectionalKeyPress(e) && !this.isValid) {
      e.preventDefault();
      this._resetToRangeEnds(e);
    }
  };

  handleLowerInputChange = e => {
    this._handleOnChange(e.target.value, this.upperValue, e);
  };

  handleUpperInputChange = e => {
    this._handleOnChange(this.lowerValue, e.target.value, e);
  };

  _handleKeyDown = (value, e) => {
    let newVal = Number(value);
    let stepRemainder = 0;
    const step = this.props.step || 1;
    switch (e.keyCode) {
      case keyCodes.UP:
      case keyCodes.RIGHT:
        e.preventDefault();
        newVal += step;
        stepRemainder = (newVal - this.props.min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal - stepRemainder;
        }
        break;
      case keyCodes.DOWN:
      case keyCodes.LEFT:
        e.preventDefault();
        newVal -= step;
        stepRemainder = (newVal - this.props.min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal + (step - stepRemainder);
        }
        break;
    }
    return newVal;
  };

  handleLowerKeyDown = e => {
    let lower = this.lowerValue;
    switch (e.keyCode) {
      case keyCodes.TAB:
        return;
      default:
        if (!this.lowerValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          e.preventDefault();
          this._resetToRangeEnds(e);
          return;
        }
        lower = this._handleKeyDown(lower, e);
    }
    if (lower >= this.upperValue || lower < this.props.min) return;
    this._handleOnChange(lower, this.upperValue, e);
  };

  handleUpperKeyDown = e => {
    let upper = this.upperValue;
    switch (e.keyCode) {
      case keyCodes.TAB:
        return;
      default:
        if (!this.upperValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          e.preventDefault();
          this._resetToRangeEnds(e);
          return;
        }
        upper = this._handleKeyDown(upper, e);
    }
    if (upper <= this.lowerValue || upper > this.props.max) return;
    this._handleOnChange(this.lowerValue, upper, e);
  };

  calculateThumbPositionStyle = value => {
    // Calculate the left position based on value
    const decimal =
      (value - this.props.min) / (this.props.max - this.props.min);
    // Must be between 0-100%
    let valuePosition = decimal <= 1 ? decimal : 1;
    valuePosition = valuePosition >= 0 ? valuePosition : 0;

    const EUI_THUMB_SIZE = 16;
    const thumbToTrackRatio = EUI_THUMB_SIZE / this.rangeSliderRef.clientWidth;
    const trackPositionScale = (1 - thumbToTrackRatio) * 100;
    return { left: `${valuePosition * trackPositionScale}%` };
  };

  toggleHasFocus = (shouldFocused = !this.state.hasFocus) => {
    this.setState({
      hasFocus: shouldFocused,
    });
  };

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
      ticks,
      levels,
      onChange, // eslint-disable-line no-unused-vars
      showRange,
      value,
      style,
      ...rest
    } = this.props;

    const classes = classNames('euiDualRange', className);
    const digitTolerance = Math.max(String(min).length, String(max).length);

    return (
      <EuiRangeWrapper className={classes} fullWidth={fullWidth}>
        {showInput && (
          <EuiRangeInput
            digitTolerance={digitTolerance}
            side="min"
            min={min}
            max={Number(this.upperValue)}
            step={step}
            value={this.lowerValue}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleLowerInputChange}
            onKeyDown={this.handleInputKeyDown}
            name={`${name}-minValue`}
            aria-describedby={this.props['aria-describedby']}
            aria-label={this.props['aria-label']}
          />
        )}
        {showLabels && (
          <EuiRangeLabel side="min" disabled={disabled}>
            {min}
          </EuiRangeLabel>
        )}
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
          value={value}>
          <EuiRangeSlider
            className="euiDualRange__slider"
            ref={this.handleRangeSliderRefUpdate}
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={this.handleSliderChange}
            style={style}
            showTicks={showTicks}
            hasFocus={this.state.hasFocus}
            aria-hidden={true}
            tabIndex={'-1'}
            showRange={showRange}
            {...rest}
          />

          {this.state.rangeSliderRefAvailable && (
            <React.Fragment>
              <EuiRangeThumb
                min={min}
                max={Number(this.upperValue)}
                value={this.lowerValue}
                disabled={disabled}
                showTicks={showTicks}
                showInput={showInput}
                onKeyDown={this.handleLowerKeyDown}
                onFocus={() => this.toggleHasFocus(true)}
                onBlur={() => this.toggleHasFocus(false)}
                style={this.calculateThumbPositionStyle(this.lowerValue || min)}
                aria-describedby={this.props['aria-describedby']}
                aria-label={this.props['aria-label']}
              />
              <EuiRangeThumb
                min={Number(this.lowerValue)}
                max={max}
                value={this.upperValue}
                disabled={disabled}
                showTicks={showTicks}
                showInput={showInput}
                onKeyDown={this.handleUpperKeyDown}
                onFocus={() => this.toggleHasFocus(true)}
                onBlur={() => this.toggleHasFocus(false)}
                style={this.calculateThumbPositionStyle(this.upperValue || max)}
                aria-describedby={this.props['aria-describedby']}
                aria-label={this.props['aria-label']}
              />
            </React.Fragment>
          )}

          {showRange && this.isValid && (
            <EuiRangeHighlight
              hasFocus={this.state.hasFocus}
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(this.lowerValue)}
              upperValue={Number(this.upperValue)}
            />
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel disabled={disabled}>{max}</EuiRangeLabel>}
        {showInput && (
          <EuiRangeInput
            digitTolerance={digitTolerance}
            side="max"
            min={Number(this.lowerValue)}
            max={max}
            step={step}
            value={this.upperValue}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleUpperInputChange}
            onKeyDown={this.handleInputKeyDown}
            name={`${name}-maxValue`}
            aria-describedby={this.props['aria-describedby']}
            aria-label={this.props['aria-label']}
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
  /**
   * Array containing lower and upper values. Fallback is `min` and `max` respectively
   */
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  fullWidth: PropTypes.bool,
  compressed: PropTypes.bool,
  disabled: PropTypes.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
  /**
   * Displays a input controls for direct manipulation
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
    })
  ),
  /**
   * Function signature: `([lowerValue, upperValue], isValid, event)`
   */
  onChange: PropTypes.func,
  /**
   * Create colored indicators for certain intervals
   */
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    })
  ),
  /**
   * Shows a thick line from lower value to upper value
   */
  showRange: PropTypes.bool,
};

EuiDualRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showRange: true,
  showTicks: false,
  levels: [],
};
