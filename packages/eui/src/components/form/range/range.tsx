/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FunctionComponent,
  type MouseEvent,
  type ReactElement,
} from 'react';
import classNames from 'classnames';

import { isWithinRange } from '../../../services/number';
import { EuiInputPopover } from '../../popover';
import { useEuiTheme, useGeneratedHtmlId, useLatest } from '../../../services';
import { useFormContext } from '../eui_form_context';

import { getLevelColor } from './range_levels_colors';
import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeTooltip } from './range_tooltip';
import { EuiRangeTrack } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';

import type { EuiRangeProps, EuiRangeTick } from './types';

import { euiRangeStyles } from './range.styles';
import { EuiI18n } from '../../i18n';

/**
 * @see {@link https://eui.elastic.co/docs/components/forms/numeric/range-sliders/|EuiRange documentation}
 */
export const EuiRange: FunctionComponent<EuiRangeProps> = ({
  min = 0,
  max = 100,
  step = 1,
  compressed = false,
  isLoading = false,
  showLabels = false,
  showInput = false,
  showRange = false,
  showTicks = false,
  showValue = false,
  levels = [],
  className,
  disabled,
  fullWidth,
  readOnly,
  id: propsId,
  name,
  tickInterval,
  ticks,
  valueAppend,
  valuePrepend,
  onBlur,
  onChange,
  onFocus,
  value,
  tabIndex,
  isInvalid,
  inputPopoverProps,
  ...rest
}) => {
  const theme = useEuiTheme();
  const { defaultFullWidth } = useFormContext();
  const generatedId = useGeneratedHtmlId();
  const onBlurRef = useLatest(onBlur);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const preventPopoverClose = useRef(false);

  const id = propsId || generatedId;
  const isValid = isWithinRange(min, max, value || '');
  const showInputOnly = showInput === 'inputWithPopover';
  const canShowDropdown = showInputOnly && !readOnly && !disabled;
  const classes = classNames('euiRange', className);
  const styles = euiRangeStyles(theme);
  const cssStyles = [styles.euiRange, showInput && styles.hasInput];
  const thumbColor = levels && getLevelColor(levels, Number(value));

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const isValid = isWithinRange(min, max, e.currentTarget.value);
    onChange?.(e, isValid);
  };

  const handleSetTrackWidth = ({ width }: { width: number }) => {
    setTrackWidth(width);
  };

  const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
    setIsPopoverOpen(true);
  };

  const onInputBlur = (e: FocusEvent<HTMLInputElement>) =>
    setTimeout(() => {
      // Safari does not recognize any focus-related eventing for input[type=range]
      // making it impossible to capture its state using active/focus/relatedTarget
      // Instead, a prevention flag is set on mousedown, with a waiting period here.
      // Mousedown is viable because in the popover case, it is inaccessible via keyboard (intentionally)
      if (preventPopoverClose.current) {
        preventPopoverClose.current = false;
        return;
      }
      onBlurRef.current?.(e);
      closePopover();
    }, 200);

  const closePopover = () => {
    preventPopoverClose.current = false;
    setIsPopoverOpen(false);
  };

  const handleAriaValueText = (
    ticks: EuiRangeTick[],
    currentVal: string | number
  ): string | undefined => {
    const target = ticks.find(
      (tick) => tick.value.toString() === currentVal.toString()
    );

    if (target) {
      return target.accessibleLabel
        ? `${target.value}, (${target.accessibleLabel})`
        : typeof target.label === 'string' // Fall back to the label if it's a usable string
        ? `${target.value}, (${target.label})`
        : undefined;
    }
  };

  const input: ReactElement | null = showInput ? (
    <EuiRangeInput
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      compressed={compressed}
      onChange={handleOnChange}
      name={name}
      onFocus={canShowDropdown ? onInputFocus : onFocus}
      onBlur={canShowDropdown ? onInputBlur : onBlur}
      fullWidth={showInputOnly && (fullWidth ?? defaultFullWidth)}
      isLoading={showInputOnly && isLoading}
      isInvalid={isInvalid}
      autoSize={!showInputOnly}
      {...rest}
    />
  ) : null;

  const sliderScreenReaderInstructions = (
    <EuiI18n
      token="euiRange.sliderScreenReaderInstructions"
      default="You are in a custom range slider. Use the Up and Down arrow keys to change the value."
    />
  );

  const range = (
    <EuiRangeWrapper
      className={classes}
      css={cssStyles}
      fullWidth={fullWidth ?? defaultFullWidth}
      compressed={compressed}
    >
      {showLabels && (
        <EuiRangeLabel side="min" disabled={disabled}>
          {min}
        </EuiRangeLabel>
      )}
      <EuiRangeTrack
        trackWidth={trackWidth}
        disabled={disabled}
        compressed={compressed}
        max={max}
        min={min}
        step={step}
        showTicks={showTicks}
        tickInterval={tickInterval}
        ticks={ticks}
        levels={levels}
        onChange={handleOnChange}
        value={value}
        aria-hidden={!!showInput}
        showRange={showRange}
      >
        <EuiRangeSlider
          ariaValueText={ticks ? handleAriaValueText(ticks, value) : undefined}
          id={showInput ? undefined : id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleOnChange}
          showTicks={showTicks}
          showRange={showRange}
          tabIndex={showInput ? -1 : tabIndex}
          onMouseDown={
            showInputOnly
              ? () => (preventPopoverClose.current = true)
              : undefined
          }
          onFocus={showInput === true ? undefined : onFocus}
          onBlur={showInputOnly ? onInputBlur : onBlur}
          aria-hidden={!!showInput}
          thumbColor={thumbColor}
          {...rest}
          onResize={handleSetTrackWidth}
        />
        {showRange && isValid && (
          <EuiRangeHighlight
            showTicks={showTicks}
            min={Number(min)}
            max={Number(max)}
            lowerValue={Number(min)}
            upperValue={Number(value)}
            levels={levels}
            trackWidth={trackWidth}
          />
        )}
        {showValue && !!String(value).length && (
          <EuiRangeTooltip
            value={value}
            max={max}
            min={min}
            name={name}
            showTicks={showTicks}
            valuePrepend={valuePrepend}
            valueAppend={valueAppend}
          />
        )}
      </EuiRangeTrack>
      {showLabels && (
        <EuiRangeLabel side="max" disabled={disabled}>
          {max}
        </EuiRangeLabel>
      )}
      {showInput && !showInputOnly && (
        <>
          <div
            className={
              showTicks || ticks
                ? 'euiRange__slimHorizontalSpacer'
                : 'euiRange__horizontalSpacer'
            }
            css={
              showTicks || ticks
                ? styles.euiRange__slimHorizontalSpacer
                : styles.euiRange__horizontalSpacer
            }
          />
          {input}
        </>
      )}
    </EuiRangeWrapper>
  );

  const popover =
    showInputOnly && input ? (
      <EuiInputPopover
        {...inputPopoverProps}
        className={classNames(
          'euiRange__popover',
          inputPopoverProps?.className
        )}
        input={input}
        fullWidth={fullWidth ?? defaultFullWidth}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        disableFocusTrap
        popoverScreenReaderText={sliderScreenReaderInstructions}
      >
        {range}
      </EuiInputPopover>
    ) : undefined;
  return popover ?? range;
};

EuiRange.displayName = 'EuiRange';
