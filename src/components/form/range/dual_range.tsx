import React, { Component } from 'react';
import classNames from 'classnames';

import { keyCodes } from '../../../services';
import { isWithinRange } from '../../../services/number';
import { EuiInputPopover } from '../../popover';
import {
  EuiFormControlLayoutDelimited,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import makeId from '../form_row/make_id';

import { EuiRangeProps } from './range';
import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput, EuiRangeInputProps } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeLevel } from './range_levels';
import { EuiRangeSlider, EuiRangeSliderProps } from './range_slider';
import { EuiRangeThumb } from './range_thumb';
import { EuiRangeTick } from './range_ticks';
import { EuiRangeTrack } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

type ValueMember = number | string;

export interface EuiDualRangeProps
  extends Omit<
    EuiRangeSliderProps,
    'onChange' | 'onBlur' | 'onFocus' | 'value'
  > {
  value: [ValueMember, ValueMember];
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLDivElement>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLDivElement>
  ) => void;
  onChange: (
    values: [ValueMember, ValueMember],
    isValid: boolean,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  fullWidth?: boolean;
  isInvalid?: boolean;
  /**
   * Create colored indicators for certain intervals
   */
  levels?: EuiRangeLevel[];
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels?: boolean;
  /**
   * Pass `true` to displays an extra input control for direct manipulation.
   * Pass `'inputWithPopover'` to only show the input but show the range in a dropdown.
   */
  showInput?: EuiRangeProps['showInput'];
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval?: number;
  /**
   * Specified ticks at specified values
   */
  ticks?: EuiRangeTick[];
  /**
   * Creates an input group with element(s) coming before input.  Will only show if `showInput = inputWithPopver`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];
  /**
   * Creates an input group with element(s) coming after input. Will only show if `showInput = inputWithPopver`.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
  /**
   *  Intended to be uses with aria attributes. Some attributes may be overwritten.
   */
  minInputProps?: Partial<EuiRangeInputProps>;

  /**
   *  Intended to be uses with aria attributes. Some attributes may be overwritten.
   */
  maxInputProps?: Partial<EuiRangeInputProps>;
}

export class EuiDualRange extends Component<EuiDualRangeProps> {
  static defaultProps = {
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

  state = {
    id: this.props.id || makeId(),
    hasFocus: false,
    rangeSliderRefAvailable: false,
    isPopoverOpen: false,
    rangeWidth: undefined,
  };

  preventPopoverClose = false;
  rangeSliderRef: HTMLInputElement | null = null;
  handleRangeSliderRefUpdate = (ref: HTMLInputElement | null) => {
    this.rangeSliderRef = ref;
    this.setState({
      rangeSliderRefAvailable: !!ref,
      rangeWidth: !!ref ? ref.clientWidth : null,
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

  _determineInvalidThumbMovement = (
    newVal: ValueMember,
    lower: ValueMember,
    upper: ValueMember,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
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

  _determineValidThumbMovement = (
    newVal: ValueMember,
    lower: ValueMember,
    upper: ValueMember,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // Lower thumb targeted or right-moving swap has occured
    if (
      Math.abs((lower as number) - (newVal as number)) <
      Math.abs((upper as number) - (newVal as number))
    ) {
      lower = newVal;
    }
    // Upper thumb targeted or left-moving swap has occured
    else {
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  };

  _determineThumbMovement = (
    newVal: number,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
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

  _handleOnChange = (
    lower: ValueMember,
    upper: ValueMember,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isValid =
      isWithinRange(this.props.min, upper, lower) &&
      isWithinRange(lower, this.props.max, upper);
    this.props.onChange([lower, upper], isValid, e);
  };

  handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    this._determineThumbMovement(Number(e.currentTarget.value), e);
  };

  _resetToRangeEnds = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arbitrary decision to pass `min` instead of `max`. Result is the same.
    this._determineInvalidThumbMovement(
      this.props.min,
      this.lowerValue,
      this.upperValue,
      e
    );
  };

  _isDirectionalKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return (
      [keyCodes.UP, keyCodes.RIGHT, keyCodes.DOWN, keyCodes.LEFT].indexOf(
        e.keyCode
      ) > -1
    );
  };

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Relevant only when initial values are both `''` and `showInput` is set
    if (this._isDirectionalKeyPress(e) && !this.isValid) {
      e.preventDefault();
      this._resetToRangeEnds(e);
    }
  };

  handleLowerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._handleOnChange(e.target.value, this.upperValue, e);
  };

  handleUpperInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._handleOnChange(this.lowerValue, e.target.value, e);
  };

  _handleKeyDown = (
    value: ValueMember,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
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

  handleLowerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  handleUpperKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  calculateThumbPositionStyle = (value: number, width?: number) => {
    // Calculate the left position based on value
    const decimal =
      (value - this.props.min) / (this.props.max - this.props.min);
    // Must be between 0-100%
    let valuePosition = decimal <= 1 ? decimal : 1;
    valuePosition = valuePosition >= 0 ? valuePosition : 0;

    const EUI_THUMB_SIZE = 16;
    const trackWidth =
      this.props.showInput === 'inputWithPopover' && !!width
        ? width
        : this.rangeSliderRef!.clientWidth;
    const thumbToTrackRatio = EUI_THUMB_SIZE / trackWidth;
    const trackPositionScale = (1 - thumbToTrackRatio) * 100;
    return { left: `${valuePosition * trackPositionScale}%` };
  };

  toggleHasFocus = (shouldFocused = !this.state.hasFocus) => {
    this.setState({
      hasFocus: shouldFocused,
    });
  };

  onThumbFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.toggleHasFocus(true);
  };

  onThumbBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.toggleHasFocus(false);
  };

  onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.preventPopoverClose = true;
    this.setState({
      isPopoverOpen: true,
    });
  };

  onInputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setTimeout(() => {
      // Safari does not recognize any focus-related eventing for input[type=range]
      // making it impossible to capture its state using active/focus/relatedTarget
      // Instead, a prevention flag is set on mousedown, with a waiting period here.
      // Mousedown is viable because in the popover case, it is inaccessable via keyboard (intentionally)
      if (this.preventPopoverClose) {
        this.preventPopoverClose = false;
        return;
      }
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
      this.closePopover();
    }, 200);

  closePopover = () => {
    this.preventPopoverClose = false;
    this.setState({
      isPopoverOpen: false,
    });
  };

  onResize = (width?: number) => {
    this.setState({
      rangeWidth: width,
    });
  };

  render() {
    const {
      className,
      compressed,
      disabled,
      fullWidth,
      readOnly,
      id: propsId,
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
      onBlur,
      onChange,
      onFocus,
      showRange,
      value,
      style,
      isInvalid,
      append,
      prepend,
      minInputProps,
      maxInputProps,
      ...rest
    } = this.props;

    const { id } = this.state;

    const digitTolerance = Math.max(String(min).length, String(max).length);
    const showInputOnly = showInput === 'inputWithPopover';
    const canShowDropdown = showInputOnly && !readOnly && !disabled;

    const minInput = !!showInput ? (
      <EuiRangeInput
        // Overridable props
        aria-describedby={this.props['aria-describedby']}
        aria-label={this.props['aria-label']}
        {...minInputProps}
        // Non-overridable props
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
        onFocus={canShowDropdown ? this.onInputFocus : onFocus}
        onBlur={canShowDropdown ? this.onInputBlur : onBlur}
        readOnly={readOnly}
        autoSize={!showInputOnly}
        fullWidth={!!showInputOnly && fullWidth}
        isInvalid={isInvalid}
        controlOnly={showInputOnly}
        onMouseDown={
          showInputOnly ? () => (this.preventPopoverClose = true) : undefined
        }
      />
    ) : (
      undefined
    );

    const maxInput = !!showInput ? (
      <EuiRangeInput
        // Overridable props
        aria-describedby={this.props['aria-describedby']}
        aria-label={this.props['aria-label']}
        {...maxInputProps}
        // Non-overridable props
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
        onFocus={canShowDropdown ? this.onInputFocus : onFocus}
        onBlur={canShowDropdown ? this.onInputBlur : onBlur}
        readOnly={readOnly}
        autoSize={!showInputOnly}
        fullWidth={!!showInputOnly && fullWidth}
        controlOnly={showInputOnly}
        isInvalid={isInvalid}
        onMouseDown={
          showInputOnly ? () => (this.preventPopoverClose = true) : undefined
        }
      />
    ) : (
      undefined
    );

    const classes = classNames('euiDualRange', className);
    const theRange = (
      <EuiRangeWrapper
        className={classes}
        fullWidth={fullWidth}
        compressed={compressed}>
        {!showInputOnly && (
          <>
            {minInput}
            <div className="euiRange__horizontalSpacer" />
          </>
        )}
        {showLabels && (
          <EuiRangeLabel side="min" disabled={disabled}>
            {min}
          </EuiRangeLabel>
        )}
        <EuiRangeTrack
          compressed={compressed}
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
          {showRange && this.isValid && (
            <EuiRangeHighlight
              compressed={compressed}
              hasFocus={this.state.hasFocus}
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(this.lowerValue)}
              upperValue={Number(this.upperValue)}
            />
          )}

          <EuiRangeSlider
            className="euiDualRange__slider"
            ref={this.handleRangeSliderRefUpdate}
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            compressed={compressed}
            onChange={this.handleSliderChange}
            style={style}
            showTicks={showTicks}
            hasFocus={this.state.hasFocus}
            aria-hidden={true}
            tabIndex={-1}
            showRange={showRange}
            onFocus={onFocus}
            onBlur={onBlur}
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
                showInput={!!showInput}
                onKeyDown={this.handleLowerKeyDown}
                onFocus={this.onThumbFocus}
                onBlur={this.onThumbBlur}
                style={this.calculateThumbPositionStyle(
                  Number(this.lowerValue) || min,
                  this.state.rangeWidth
                )}
                aria-describedby={this.props['aria-describedby']}
                aria-label={this.props['aria-label']}
              />
              <EuiRangeThumb
                min={Number(this.lowerValue)}
                max={max}
                value={this.upperValue}
                disabled={disabled}
                showTicks={showTicks}
                showInput={!!showInput}
                onKeyDown={this.handleUpperKeyDown}
                onFocus={this.onThumbFocus}
                onBlur={this.onThumbBlur}
                style={this.calculateThumbPositionStyle(
                  Number(this.upperValue) || max,
                  this.state.rangeWidth
                )}
                aria-describedby={this.props['aria-describedby']}
                aria-label={this.props['aria-label']}
              />
            </React.Fragment>
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel disabled={disabled}>{max}</EuiRangeLabel>}
        {!showInputOnly && (
          <>
            <div className="euiRange__horizontalSpacer" />
            {maxInput}
          </>
        )}
      </EuiRangeWrapper>
    );

    const thePopover = showInputOnly ? (
      <EuiInputPopover
        className="euiRange__popover"
        input={
          <EuiFormControlLayoutDelimited
            startControl={minInput!}
            endControl={maxInput!}
            isDisabled={disabled}
            fullWidth={fullWidth}
            compressed={compressed}
            readOnly={readOnly}
            append={append}
            prepend={prepend}
          />
        }
        fullWidth={fullWidth}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        disableFocusTrap={true}
        onPanelResize={this.onResize}>
        {theRange}
      </EuiInputPopover>
    ) : (
      undefined
    );

    return thePopover || theRange;
  }
}
