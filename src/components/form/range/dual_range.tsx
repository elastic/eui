/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import classNames from 'classnames';

import { keys } from '../../../services';
import { isWithinRange } from '../../../services/number';
import { EuiInputPopover } from '../../popover';
import {
  EuiFormControlLayoutDelimited,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { htmlIdGenerator } from '../../../services/accessibility';

import { EuiRangeProps } from './range';
import { EuiRangeDraggable } from './range_draggable';
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
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
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
   * Creates an input group with element(s) coming before input.  Will only show if `showInput = inputWithPopover`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];
  /**
   * Creates an input group with element(s) coming after input. Will only show if `showInput = inputWithPopover`.
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
  /**
   *  Creates a draggble highlighted range area
   */
  isDraggable?: boolean;
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
    id: this.props.id || htmlIdGenerator()(),
    hasFocus: false,
    rangeSliderRefAvailable: false,
    isPopoverOpen: false,
    rangeWidth: undefined,
    isVisible: true, // used to trigger a rerender if initial element width is 0
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
  private leftPosition = 0;
  private dragAcc = 0;

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

  componentDidMount() {
    if (this.rangeSliderRef && this.rangeSliderRef.clientWidth === 0) {
      // Safe to call `setState` inside conditional
      // https://reactjs.org/docs/react-component.html#componentdidmount
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isVisible: false });
    }
  }

  componentDidUpdate() {
    if (this.rangeSliderRef?.clientWidth && !this.state.isVisible) {
      // Safe to call `setState` inside conditional
      // https://reactjs.org/docs/react-component.html#componentdidupdate
      // eslint-disable-next-line  react/no-did-update-set-state
      this.setState({ isVisible: true });
    }
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
    // Lower thumb targeted or right-moving swap has occurred
    if (
      Math.abs((lower as number) - (newVal as number)) <
      Math.abs((upper as number) - (newVal as number))
    ) {
      lower = newVal;
    }
    // Upper thumb targeted or left-moving swap has occurred
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
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
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

  _isDirectionalKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    return (
      [
        keys.ARROW_UP,
        keys.ARROW_RIGHT,
        keys.ARROW_DOWN,
        keys.ARROW_LEFT,
      ].indexOf(event.key) > -1
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
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    let newVal = Number(value);
    let stepRemainder = 0;
    const step = this.props.step || 1;
    switch (event.key) {
      case keys.ARROW_UP:
      case keys.ARROW_RIGHT:
        event.preventDefault();
        newVal += step;
        stepRemainder = (newVal - this.props.min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal - stepRemainder;
        }
        break;
      case keys.ARROW_DOWN:
      case keys.ARROW_LEFT:
        event.preventDefault();
        newVal -= step;
        stepRemainder = (newVal - this.props.min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal + (step - stepRemainder);
        }
        break;
    }
    return newVal;
  };

  handleLowerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let lower = this.lowerValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        if (!this.lowerValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          event.preventDefault();
          this._resetToRangeEnds(event);
          return;
        }
        lower = this._handleKeyDown(lower, event);
    }
    if (lower >= this.upperValue || lower < this.props.min) return;
    this._handleOnChange(lower, this.upperValue, event);
  };

  handleUpperKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let upper = this.upperValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        if (!this.upperValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          event.preventDefault();
          this._resetToRangeEnds(event);
          return;
        }
        upper = this._handleKeyDown(upper, event);
    }
    if (upper <= this.lowerValue || upper > this.props.max) return;
    this._handleOnChange(this.lowerValue, upper, event);
  };

  handleDraggableKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let lower = this.lowerValue;
    let upper = this.upperValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        lower = this._handleKeyDown(lower, event);
        upper = this._handleKeyDown(upper, event);
    }
    if (lower >= this.upperValue || lower < this.props.min) return;
    if (upper <= this.lowerValue || upper > this.props.max) return;
    this._handleOnChange(lower, upper, event);
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
      // Mousedown is viable because in the popover case, it is inaccessible via keyboard (intentionally)
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

  getNearestStep = (value: number) => {
    const steps = (this.props.max - this.props.min) / this.props.step!;
    const approx =
      Math.round(
        ((value - this.props.min) * steps) / (this.props.max - this.props.min)
      ) / steps;
    const bound = Math.min(Math.max(approx, 0), 1);
    const nearest = bound * (this.props.max - this.props.min) + this.props.min;
    return (Number(nearest.toPrecision(10)) * 100) / 100;
  };

  handleDrag = (x: number, isFirstInteraction?: boolean) => {
    if (isFirstInteraction) {
      this.leftPosition = x;
      this.dragAcc = 0;
    }
    const { min, max } = this.props;
    const lowerValue = Number(this.lowerValue);
    const upperValue = Number(this.upperValue);
    const delta = this.leftPosition - x;
    this.leftPosition = x;
    this.dragAcc = this.dragAcc + delta;
    const percentageOfArea = this.dragAcc / this.rangeSliderRef!.clientWidth;
    const percentageOfRange = percentageOfArea * (max - min);
    const newLower = this.getNearestStep(lowerValue - percentageOfRange);
    const newUpper = this.getNearestStep(upperValue - percentageOfRange);

    const noMovement = newLower === lowerValue;
    const isMin = min === lowerValue && min === newLower;
    const isMax = max === upperValue && max === newUpper;
    const isOutOfRange = newLower < min || newUpper > max;

    if (noMovement || isMin || isMax || isOutOfRange) return;
    this._handleOnChange(newLower, newUpper);
    this.dragAcc = 0;
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
      isDraggable,
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
    ) : undefined;

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
    ) : undefined;

    const classes = classNames('euiDualRange', className);
    const leftThumbPosition = this.state.rangeSliderRefAvailable
      ? this.calculateThumbPositionStyle(
          Number(this.lowerValue) || min,
          this.state.rangeWidth
        )
      : { left: '0' };
    const rightThumbPosition = this.state.rangeSliderRefAvailable
      ? this.calculateThumbPositionStyle(
          Number(this.upperValue) || max,
          this.state.rangeWidth
        )
      : { left: '0' };
    const theRange = (
      <EuiRangeWrapper
        className={classes}
        fullWidth={fullWidth}
        compressed={compressed}>
        {showInput && !showInputOnly && (
          <>
            {minInput}
            <div
              className={
                showTicks || ticks
                  ? 'euiRange__slimHorizontalSpacer'
                  : 'euiRange__horizontalSpacer'
              }
            />
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
          value={value}
          aria-hidden={showInput === true}>
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
              {isDraggable && this.isValid && (
                <EuiRangeDraggable
                  min={min}
                  max={max}
                  value={[Number(this.lowerValue), Number(this.upperValue)]}
                  disabled={disabled}
                  lowerPosition={leftThumbPosition.left}
                  upperPosition={rightThumbPosition.left}
                  showTicks={showTicks}
                  compressed={compressed}
                  onChange={this.handleDrag}
                  onFocus={this.onThumbFocus}
                  onBlur={this.onThumbBlur}
                  onKeyDown={this.handleDraggableKeyDown}
                  aria-describedby={this.props['aria-describedby']}
                  aria-label={this.props['aria-label']}
                />
              )}

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
                style={leftThumbPosition}
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
                style={rightThumbPosition}
                aria-describedby={this.props['aria-describedby']}
                aria-label={this.props['aria-label']}
              />
            </React.Fragment>
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel disabled={disabled}>{max}</EuiRangeLabel>}
        {showInput && !showInputOnly && (
          <>
            <div
              className={
                showTicks || ticks
                  ? 'euiRange__slimHorizontalSpacer'
                  : 'euiRange__horizontalSpacer'
              }
            />
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
    ) : undefined;

    return thePopover || theRange;
  }
}
