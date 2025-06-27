/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  Component,
  MouseEventHandler,
  Ref,
  useState,
  useCallback,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import type { Moment } from 'moment';

import { useCombinedRefs, useEuiMemoizedStyles } from '../../services';
import { EuiI18nConsumer } from '../context';
import { CommonProps } from '../common';
import { PopoverAnchorPosition } from '../popover';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
  useEuiValidatableControl,
} from '../form';
import { EuiFormControlLayoutIconsProps } from '../form/form_control_layout/form_control_layout_icons';

import { ReactDatePicker, ReactDatePickerProps } from './react-datepicker';
import { euiReactDatePickerStyles } from './react_date_picker.styles';
import { euiDatePickerStyles } from './date_picker.styles';

export const euiDatePickerDefaultDateFormat = 'MM/DD/YYYY';
export const euiDatePickerDefaultTimeFormat = 'hh:mm A';

// EuiDatePicker only supports a subset of props from react-datepicker.
const unsupportedProps = [
  // We don't want to show multiple months next to each other
  'monthsShown',
  // There is no need to show week numbers
  'showWeekNumbers',
  // Our css adapts to height, no need to fix it
  'fixedHeight',
  // We force the month / year selection UI. No need to configure it
  'dropdownMode',
  // Short month is unnecessary. Our UI has plenty of room for full months
  'useShortMonthInDropdown',
  // The today button is not needed. This should always be external to the calendar
  'todayButton',
  // We hide the time caption, so there is no need to overwrite its text
  'timeCaption',
  // We always want keyboard accessibility on
  'disabledKeyboardNavigation',
  // This is easy enough to do. It can conflict with isLoading state
  'isClearable',
  // There is no reason to launch the datepicker in its own modal. Can always build these ourselves
  'withPortal',
  // Causes Error: Cannot read property 'clone' of undefined
  'showMonthYearDropdown',
  // We overridde this with `popoverPlacement`
  'popperPlacement',
  // An internal EUI styling concern that consumers shouldn't need to access
  'defaultInputProps',
] as const;

type UnsupportedProps = (typeof unsupportedProps)[number];

interface EuiExtendedDatePickerProps
  extends Omit<ReactDatePickerProps, UnsupportedProps> {
  /**
   * Applies classes to the numbered days provided. Check docs for example.
   */
  dayClassName?: (date: Moment) => string | null;

  /**
   * Renders the input as full width
   */
  fullWidth?: boolean;
  /**
   * Renders the input with compressed height and sizing
   */
  compressed?: boolean;

  /**
   * ref for the ReactDatePicker instance
   */
  inputRef?: Ref<Component<ReactDatePickerProps, any, any>>;

  /**
   * Provides styling to the input when invalid
   */
  isInvalid?: boolean;

  /**
   * Provides styling to the input when loading
   */
  isLoading?: boolean;

  /**
   * What to do when the input is cleared by the x icon
   */
  onClear?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Opens to this date (in moment format) on first press, regardless of selection
   */
  openToDate?: Moment;

  /**
   * Shows only when no date is selected
   */
  placeholder?: string;

  /**
   * Displays the date picker calendar on directly on the page.
   * Will not render `iconType` or `fullWidth`.
   */
  inline?: boolean;

  /**
   * Allows turning the shadow off if using the `inline` prop
   */
  shadow?: boolean;

  /**
   * Show the icon in input
   */
  showIcon?: boolean;

  /**
   * Pass an icon type to change the default `calendar` or `clock` icon
   */
  iconType?: EuiFormControlLayoutIconsProps['icon'];

  /**
   * Sets the placement of the popover.
   *
   * **Use [EuiPopover](/#/layout/popover) values**: 'upCenter', 'upLeft', 'upRight', downCenter', 'downLeft', 'downRight', 'leftCenter', 'leftUp', 'leftDown', 'rightCenter', 'rightUp', 'rightDown'.
   */
  popoverPlacement?: PopoverAnchorPosition;

  /**
   * Creates an input group with element(s) coming before the input.
   * `string` | `ReactElement` or an array of these
   *
   * Ignored if `inline` or `controlOnly` are true.
   */
  append?: EuiFormControlLayoutProps['append'];
  /**
   * Creates an input group with element(s) coming before the input.
   * `string` | `ReactElement` or an array of these
   *
   * Ignored if `inline` or `controlOnly` are true.
   */
  prepend?: EuiFormControlLayoutProps['prepend'];

  /**
   * Completely removes form control layout wrapper and ignores
   * `iconType`, `prepend`, and `append`.
   *
   * Best used inside EuiFormControlLayoutDelimited.
   */
  controlOnly?: boolean;
}

export type EuiDatePickerProps = CommonProps & EuiExtendedDatePickerProps;

export const EuiDatePicker: FunctionComponent<EuiDatePickerProps> = ({
  adjustDateOnChange = true,
  append,
  calendarClassName,
  className,
  compressed,
  controlOnly,
  customInput,
  dateFormat = euiDatePickerDefaultDateFormat,
  dayClassName,
  disabled,
  excludeDates,
  filterDate,
  fullWidth = false,
  iconType,
  injectTimes,
  inline,
  inputRef,
  isInvalid: _isInvalid,
  isLoading,
  locale,
  maxDate,
  maxTime,
  minDate,
  minTime,
  onChange,
  onClear,
  openToDate,
  placeholder,
  popperClassName,
  popoverPlacement = 'downLeft',
  prepend,
  readOnly,
  selected,
  shadow = true,
  shouldCloseOnSelect = true,
  showIcon = true,
  showTimeSelect = false,
  showTimeSelectOnly,
  timeFormat = euiDatePickerDefaultTimeFormat,
  utcOffset,
  ...rest
}) => {
  // Check for whether the passed `selected` moment date is valid
  const isInvalid =
    _isInvalid || (selected?.isValid?.() === false ? true : undefined);

  const styles = useEuiMemoizedStyles(euiDatePickerStyles);
  const cssStyles = [
    styles.euiDatePicker,
    ...(inline
      ? [
          styles.inline.inline,
          isInvalid && !(disabled || readOnly) && styles.inline.invalid,
          shadow ? styles.inline.shadow : styles.inline.noShadow,
          disabled && styles.inline.disabled,
          readOnly && styles.inline.readOnly,
        ]
      : []),
  ];
  const calendarStyles = useEuiMemoizedStyles(euiReactDatePickerStyles);

  const classes = classNames('euiDatePicker', className);

  // Passed to the default EuiFieldText input, not passed to custom inputs
  const defaultInputProps =
    !inline && !customInput ? { compressed, fullWidth } : undefined;

  // In case the consumer did not alter the default date format but wants
  // to add the time select, we append the default time format
  let fullDateFormat = dateFormat;
  if (showTimeSelect && dateFormat === euiDatePickerDefaultDateFormat) {
    fullDateFormat = `${dateFormat} ${timeFormat}`;
  }

  // Set an internal ref on ReactDatePicker's `input` so we can set its :invalid state via useEuiValidatableControl
  const [inputValidityRef, _setInputValidityRef] =
    useState<HTMLInputElement | null>(null);
  const setInputValidityRef = useCallback<
    RefCallback<Component & { input: HTMLInputElement }>
  >((ref) => {
    _setInputValidityRef(ref?.input || null);
  }, []);
  useEuiValidatableControl({ isInvalid, controlEl: inputValidityRef });
  const inputRefs = useCombinedRefs([inputRef, setInputValidityRef]);

  const control = (
    <EuiI18nConsumer>
      {({ locale: contextLocale }) => {
        return (
          <ReactDatePicker
            adjustDateOnChange={adjustDateOnChange}
            calendarClassName={classNames(
              calendarClassName,
              calendarStyles.euiReactDatePicker
            )}
            className={classes}
            defaultInputProps={defaultInputProps}
            customInput={customInput}
            dateFormat={fullDateFormat}
            dayClassName={dayClassName}
            disabled={disabled}
            readOnly={readOnly}
            excludeDates={excludeDates}
            filterDate={filterDate}
            injectTimes={injectTimes}
            inline={inline}
            locale={locale || contextLocale}
            maxDate={maxDate}
            maxTime={maxTime}
            minDate={minDate}
            minTime={minTime}
            onChange={onChange}
            openToDate={openToDate}
            placeholderText={placeholder}
            popperClassName={popperClassName}
            ref={inputRefs}
            selected={selected}
            shouldCloseOnSelect={shouldCloseOnSelect}
            showMonthDropdown
            showTimeSelect={showTimeSelectOnly ? true : showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            showYearDropdown
            timeFormat={timeFormat}
            utcOffset={utcOffset}
            yearDropdownItemNumber={7}
            accessibleMode={!(disabled || readOnly)}
            popperPlacement={popoverPlacement}
            {...rest}
          />
        );
      }}
    </EuiI18nConsumer>
  );

  if (controlOnly) return control;

  let optionalIcon: EuiFormControlLayoutIconsProps['icon'];
  if (inline || customInput || !showIcon) {
    optionalIcon = undefined;
  } else if (iconType) {
    optionalIcon = iconType;
  } else if (showTimeSelectOnly) {
    optionalIcon = 'clock';
  } else {
    optionalIcon = 'calendar';
  }

  return (
    <span css={cssStyles} className={classes}>
      <EuiFormControlLayout
        icon={optionalIcon}
        clear={
          selected && !disabled && onClear ? { onClick: onClear } : undefined
        }
        isLoading={isLoading}
        isInvalid={isInvalid}
        isDisabled={disabled}
        readOnly={readOnly}
        {...(inline
          ? {
              isDelimited: true,
              iconsPosition: 'static',
            }
          : {
              fullWidth,
              compressed,
              append,
              prepend,
              css: (append || prepend) && styles.inGroup,
            })}
      >
        {control}
      </EuiFormControlLayout>
    </span>
  );
};
