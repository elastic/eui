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
} from 'react';
import classNames from 'classnames';

import { Moment } from 'moment'; // eslint-disable-line import/named

import { EuiFormControlLayout, useEuiValidatableControl } from '../form';
import { EuiFormControlLayoutIconsProps } from '../form/form_control_layout/form_control_layout_icons';
import { getFormControlClassNameForIconCount } from '../form/form_control_layout/_num_icons';

import { useCombinedRefs } from '../../services';
import { EuiI18nConsumer } from '../context';
import { CommonProps } from '../common';

import { PopoverAnchorPosition } from '../popover';

import { ReactDatePicker, ReactDatePickerProps } from './react-datepicker';

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
] as const;

type UnsupportedProps = (typeof unsupportedProps)[number];

interface EuiExtendedDatePickerProps
  extends Omit<ReactDatePickerProps, UnsupportedProps> {
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
   * Completely removes form control layout wrapper and ignores
   * iconType. Best used inside EuiFormControlLayoutDelimited.
   */
  controlOnly?: boolean;
}

export type EuiDatePickerProps = CommonProps & EuiExtendedDatePickerProps;

export const EuiDatePicker: FunctionComponent<EuiDatePickerProps> = ({
  adjustDateOnChange = true,
  calendarClassName,
  className,
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
  popoverPlacement = 'downLeft',
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
  const classes = classNames('euiDatePicker', {
    'euiDatePicker--inline': inline,
    'euiDatePicker--shadow': inline && shadow,
  });

  const numIconsClass = controlOnly
    ? false
    : getFormControlClassNameForIconCount({
        isInvalid,
        isLoading,
      });

  const datePickerClasses = classNames(
    'euiDatePicker',
    'euiFieldText',
    numIconsClass,
    {
      'euiFieldText--fullWidth': fullWidth,
      'euiFieldText-isLoading': isLoading,
      'euiFieldText--withIcon': !inline && showIcon,
      'euiFieldText--isClearable': !inline && selected && onClear,
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

  // Set an internal ref on ReactDatePicker's `input` so we can set its :invalid state via useEuiValidatableControl
  const [inputValidityRef, _setInputValidityRef] = useState(null);
  const setInputValidityRef = useCallback((ref) => {
    _setInputValidityRef(ref?.input);
  }, []);
  useEuiValidatableControl({ isInvalid, controlEl: inputValidityRef });
  const inputRefs = useCombinedRefs([inputRef, setInputValidityRef]);

  const control = (
    <EuiI18nConsumer>
      {({ locale: contextLocale }) => {
        return (
          <ReactDatePicker
            adjustDateOnChange={adjustDateOnChange}
            calendarClassName={calendarClassName}
            className={datePickerClasses}
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

  return (
    <span className={classes}>
      <EuiFormControlLayout
        icon={optionalIcon}
        fullWidth={fullWidth}
        clear={selected && onClear ? { onClick: onClear } : undefined}
        isLoading={isLoading}
        isInvalid={isInvalid}
        isDisabled={disabled}
        readOnly={readOnly}
        className={classNames({
          // Take advantage of `euiFormControlLayoutDelimited`'s replacement input styling
          euiFormControlLayoutDelimited: inline,
          'euiFormControlLayoutDelimited--isInvalid':
            inline && isInvalid && !disabled && !readOnly,
        })}
        iconsPosition={inline ? 'static' : undefined}
      >
        {control}
      </EuiFormControlLayout>
    </span>
  );
};
