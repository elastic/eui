/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, MouseEventHandler, Ref } from 'react';
import classNames from 'classnames';

import { Moment } from 'moment'; // eslint-disable-line import/named

import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiFormControlLayoutIconsProps } from '../form/form_control_layout/form_control_layout_icons';

import { EuiErrorBoundary } from '../error_boundary';

import { EuiI18nConsumer } from '../context';
import { ApplyClassComponentDefaults, CommonProps } from '../common';

// @ts-ignore the type is provided by react-datepicker.d.ts
import { ReactDatePicker as _ReactDatePicker } from '../../../packages';
import ReactDatePicker, { ReactDatePickerProps } from './react-datepicker'; // eslint-disable-line import/no-unresolved

export const euiDatePickerDefaultDateFormat = 'MM/DD/YYYY';
export const euiDatePickerDefaultTimeFormat = 'hh:mm A';

const DatePicker = _ReactDatePicker as typeof ReactDatePicker;

interface EuiExtendedDatePickerProps extends ReactDatePickerProps {
  /**
   * Applies classes to the numbered days provided. Check docs for example.
   */
  dayClassName?: (date: Moment) => string | null;

  /**
   * Makes the input full width
   */
  fullWidth?: boolean;

  /**
   * ref for the ReactDatePicker instance
   */
  inputRef: Ref<Component<ReactDatePickerProps, any, any>>;

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
   * Can turn the shadow off if using the inline prop
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
   * Sets the placement of the popover. It accepts: `"bottom"`, `"bottom-end"`, `"bottom-start"`, `"left"`, `"left-end"`, `"left-start"`, `"right"`, `"right-end"`, `"right-start"`, `"top"`, `"top-end"`, `"top-start"`
   */
  popoverPlacement?: ReactDatePickerProps['popperPlacement'];
}

type _EuiDatePickerProps = CommonProps & EuiExtendedDatePickerProps;

export type EuiDatePickerProps = ApplyClassComponentDefaults<
  typeof EuiDatePicker
>;

export class EuiDatePicker extends Component<_EuiDatePickerProps> {
  static defaultProps = {
    adjustDateOnChange: true,
    dateFormat: euiDatePickerDefaultDateFormat,
    fullWidth: false,
    inputRef: () => {},
    isLoading: false,
    shadow: true,
    shouldCloseOnSelect: true,
    showIcon: true,
    showTimeSelect: false,
    timeFormat: euiDatePickerDefaultTimeFormat,
    popoverPlacement: 'bottom-start',
  };

  render() {
    const {
      adjustDateOnChange,
      calendarClassName,
      className,
      customInput,
      dateFormat,
      dayClassName,
      disabled,
      excludeDates,
      filterDate,
      fullWidth,
      iconType,
      injectTimes,
      inline,
      inputRef,
      isInvalid,
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
      popoverPlacement,
      selected,
      shadow,
      shouldCloseOnSelect,
      showIcon,
      showTimeSelect,
      showTimeSelectOnly,
      timeFormat,
      utcOffset,
      ...rest
    } = this.props;

    const classes = classNames('euiDatePicker', {
      'euiDatePicker--shadow': shadow,
      'euiDatePicker--inline': inline,
    });

    const datePickerClasses = classNames(
      'euiDatePicker',
      'euiFieldText',
      {
        'euiFieldText--fullWidth': fullWidth,
        'euiFieldText-isLoading': isLoading,
        'euiFieldText--withIcon': !inline && showIcon,
        'euiFieldText--isClearable': !inline && selected && onClear,
        'euiFieldText-isInvalid': isInvalid,
      },
      className
    );

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

    // In case the consumer did not alter the default date format but wants
    // to add the time select, we append the default time format
    let fullDateFormat = dateFormat;
    if (showTimeSelect && dateFormat === euiDatePickerDefaultDateFormat) {
      fullDateFormat = `${dateFormat} ${timeFormat}`;
    }

    // EuiDatePicker only supports a subset of props from react-datepicker. Using any of
    // the unsupported props below will spit out an error.
    const PropNotSupported = () => {
      throw new Error(`You are using a prop from react-datepicker that EuiDatePicker
        does not support. Please check the EUI documentation for more information.`);
    };

    if (
      // We don't want to show multiple months next to each other
      this.props.monthsShown ||
      // There is no need to show week numbers
      this.props.showWeekNumbers ||
      // Our css adapts to height, no need to fix it
      this.props.fixedHeight ||
      // We force the month / year selection UI. No need to configure it
      this.props.dropdownMode ||
      // Short month is unnecessary. Our UI has plenty of room for full months
      this.props.useShortMonthInDropdown ||
      // The today button is not needed. This should always be external to the calendar
      this.props.todayButton ||
      // We hide the time caption, so there is no need to overwrite its text
      this.props.timeCaption ||
      // We always want keyboard accessibility on
      this.props.disabledKeyboardNavigation ||
      // This is easy enough to do. It can conflict with isLoading state
      this.props.isClearable ||
      // There is no reason to launch the datepicker in its own modal. Can always build these ourselves
      this.props.withPortal ||
      // Causes Error: Cannot read property 'clone' of undefined
      this.props.showMonthYearDropdown
    ) {
      return (
        <EuiErrorBoundary>
          <PropNotSupported />
        </EuiErrorBoundary>
      );
    }

    return (
      <span className={classes}>
        <EuiFormControlLayout
          icon={optionalIcon}
          fullWidth={fullWidth}
          clear={selected && onClear ? { onClick: onClear } : undefined}
          isLoading={isLoading}
        >
          <EuiValidatableControl isInvalid={isInvalid}>
            <EuiI18nConsumer>
              {({ locale: contextLocale }) => {
                return (
                  <DatePicker
                    adjustDateOnChange={adjustDateOnChange}
                    calendarClassName={calendarClassName}
                    className={datePickerClasses}
                    customInput={customInput}
                    dateFormat={fullDateFormat}
                    dayClassName={dayClassName}
                    disabled={disabled}
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
                    ref={inputRef}
                    selected={selected}
                    shouldCloseOnSelect={shouldCloseOnSelect}
                    showMonthDropdown
                    showTimeSelect={showTimeSelectOnly ? true : showTimeSelect}
                    showTimeSelectOnly={showTimeSelectOnly}
                    showYearDropdown
                    timeFormat={timeFormat}
                    utcOffset={utcOffset}
                    yearDropdownItemNumber={7}
                    accessibleMode
                    popperPlacement={popoverPlacement}
                    {...rest}
                  />
                );
              }}
            </EuiI18nConsumer>
          </EuiValidatableControl>
        </EuiFormControlLayout>
      </span>
    );
  }
}
