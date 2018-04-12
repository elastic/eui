import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';
import DatePicker from 'react-datepicker';

import {
  EuiFormControlLayout,
} from '../form/form_control_layout';

import {
  EuiValidatableControl,
} from '../form/validatable_control';

import {
  EuiErrorBoundary,
} from '../error_boundary';

export class EuiDatePicker extends Component {

  render() {
    const {
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
      showTimeSelect,
      showTimeSelectOnly,
      timeFormat,
      utcOffset,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDatePicker',
      {
        'euiDatePicker--shadow': shadow,
        'euiDatePicker--inline': inline,
      },
    );

    const datePickerClasses = classNames(
      'euiDatePicker',
      'euiFieldText',
      {
        'euiFieldText--fullWidth': fullWidth,
        'euiFieldText-isLoading': isLoading,
        'euiFieldText--withIcon': !inline,
        'euiFieldText-isInvalid': isInvalid,
      },
      className
    );

    let optionalIcon;
    if (inline || customInput) {
      optionalIcon = null;
    } else if (showTimeSelectOnly) {
      optionalIcon = "clock";
    } else {
      optionalIcon = "calendar";
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
            isLoading={isLoading}
          >
            <EuiValidatableControl
              isInvalid={isInvalid}
            >
              <DatePicker
                calendarClassName={calendarClassName}
                className={datePickerClasses}
                customInput={customInput}
                dateFormat={dateFormat}
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
  calendarClassName: PropTypes.string,
  className: PropTypes.string,
  customInput: PropTypes.node,
  dateFormat: PropTypes.string,
  dayClassName: PropTypes.func,
  filterDates: PropTypes.array,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  injectTimes: PropTypes.array,
  inputRef: PropTypes.func,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(moment),
  maxTime: PropTypes.instanceOf(moment),
  minDate: PropTypes.instanceOf(moment),
  minTime: PropTypes.instanceOf(moment),
  onChange: PropTypes.func,
  openToDate: PropTypes.instanceOf(moment),
  placeholder: PropTypes.string,
  popperClassName: PropTypes.string,
  selected: PropTypes.instanceOf(moment),
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeFormat: PropTypes.string,
};

EuiDatePicker.defaultProps = {
  dateFormat:"MM/DD/YYYY hh:mm A",
  fullWidth: false,
  isLoading: false,
  shadow: true,
  shouldCloseOnSelect: true,
  timeFormat:"hh:mm A",
};
