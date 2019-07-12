import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';
import { ReactDatePicker as DatePicker } from '../../../packages';

import { EuiFormControlLayout } from '../form/form_control_layout';

import { EuiValidatableControl } from '../form/validatable_control';

import { EuiErrorBoundary } from '../error_boundary';

export const euiDatePickerDefaultDateFormat = 'MM/DD/YYYY';
export const euiDatePickerDefaultTimeFormat = 'hh:mm A';

export class EuiDatePicker extends Component {
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
      filterDates,
      fullWidth,
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
      openToDate,
      placeholder,
      popperClassName,
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
        'euiFieldText-isInvalid': isInvalid,
      },
      className
    );

    let optionalIcon;
    if (inline || customInput || !showIcon) {
      optionalIcon = null;
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
      // Short month is uncessary. Our UI has plenty of room for full months
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
      this.props.withPortal
    ) {
      return (
        <EuiErrorBoundary>
          <PropNotSupported />
        </EuiErrorBoundary>
      );
    }

    return (
      <span>
        <span className={classes}>
          <EuiFormControlLayout
            icon={optionalIcon}
            fullWidth={fullWidth}
            isLoading={isLoading}>
            <EuiValidatableControl isInvalid={isInvalid}>
              <DatePicker
                adjustDateOnChange={adjustDateOnChange}
                calendarClassName={calendarClassName}
                className={datePickerClasses}
                customInput={customInput}
                dateFormat={fullDateFormat}
                dayClassName={dayClassName}
                disabled={disabled}
                excludeDates={excludeDates}
                filterDates={filterDates}
                injectTimes={injectTimes}
                inline={inline}
                locale={locale}
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
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                showYearDropdown
                timeFormat={timeFormat}
                utcOffset={utcOffset}
                yearDropdownItemNumber={7}
                accessibleMode={true}
                {...rest}
              />
            </EuiValidatableControl>
          </EuiFormControlLayout>
        </span>
      </span>
    );
  }
}

EuiDatePicker.propTypes = {
  /**
   * Whether changes to Year and Month (via dropdowns) should trigger `onChange`
   */
  adjustDateOnChange: PropTypes.bool,
  /**
   * Optional class added to the calendar portion of datepicker
   */
  calendarClassName: PropTypes.string,

  /**
   * Added to the actual input of the calendar
   */
  className: PropTypes.string,
  /**
   * Replaces the input with any node, like a button
   */
  customInput: PropTypes.node,
  /**
   * Accepts any moment format string
   */
  dateFormat: PropTypes.string,
  /**
   * Applies classes to the numbered days provided. Check docs for example.
   */
  dayClassName: PropTypes.func,

  /**
   * Array of dates allowed. Check docs for example.
   */
  filterDates: PropTypes.array,
  /**
   * Makes the input full width
   */
  fullWidth: PropTypes.bool,
  /**
   * Adds additional times to the time selector other then :30 increments
   */
  injectTimes: PropTypes.array,
  /**
   * Applies ref to the input
   */
  inputRef: PropTypes.func,
  /**
   * Provides styling to the input when invalid
   */
  isInvalid: PropTypes.bool,
  /**
   * Provides styling to the input when loading
   */
  isLoading: PropTypes.bool,
  /**
   * Switches the locale / display. "en-us", "zn-ch"...etc
   */
  locale: PropTypes.string,
  /**
   * The max date accepted (in moment format) as a selection
   */
  maxDate: PropTypes.instanceOf(moment),
  /**
   * The max time accepted (in moment format) as a selection
   */
  maxTime: PropTypes.instanceOf(moment),
  /**
   * The min date accepted (in moment format) as a selection
   */
  minDate: PropTypes.instanceOf(moment),
  /**
   * The min time accepted (in moment format) as a selection
   */
  minTime: PropTypes.instanceOf(moment),
  /**
   * What to do when the input changes
   */
  onChange: PropTypes.func,
  /**
   * Opens to this date (in moment format) on first press, regardless of selection
   */
  openToDate: PropTypes.instanceOf(moment),
  /**
   * Shows only when no date is selected
   */
  placeholder: PropTypes.string,
  /**
   * Class applied to the popup, when inline is false
   */
  popperClassName: PropTypes.string,
  /**
   * The selected datetime (in moment format)
   */
  selected: PropTypes.instanceOf(moment),
  /**
   * Can turn the shadow off if using the inline prop
   */
  shadow: PropTypes.bool,
  /**
   * Will close the popup on selection
   */
  shouldCloseOnSelect: PropTypes.bool,
  /**
   * Show the icon in input
   */
  showIcon: PropTypes.bool,
  /**
   * Show the time selection alongside the calendar
   */
  showTimeSelect: PropTypes.bool,
  /**
   * Only show the time selector, not the calendar
   */
  showTimeSelectOnly: PropTypes.bool,
  /**
   * The format of the time within the selector, in moment notation
   */
  timeFormat: PropTypes.string,
};

EuiDatePicker.defaultProps = {
  adjustDateOnChange: true,
  dateFormat: euiDatePickerDefaultDateFormat,
  fullWidth: false,
  isLoading: false,
  shadow: true,
  shouldCloseOnSelect: true,
  showIcon: true,
  showTimeSelect: false,
  timeFormat: euiDatePickerDefaultTimeFormat,
};
