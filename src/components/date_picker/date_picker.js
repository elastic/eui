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
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const {
      className,
      isInvalid,
      inputRef,
      fullWidth,
      isLoading,
      customInput,
      placeholder,
      inline,
      shadow,
      dateFormat,
      excludeDates,
      locale,
      minDate,
      maxDate,
      minTime,
      maxTime,
      timeFormat,
      showTimeSelect,
      showTimeSelectOnly,
      onChange,
      selected,
      injectTimes,
      calendarClassName,
      dayClassName,
      popperClassName,
      shouldCloseOnSelect,
      openToDate,
      disabled,
      utcOffset,
      filterDates,
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
      },
      className
    );

    let showIcon = true;
    if (inline || customInput) {
      showIcon = false;
    }

    let datePickerOrError = (
      <span className={classes}>
        <EuiFormControlLayout
          icon={showIcon ? 'calendar' : null}
          fullWidth={fullWidth}
          isLoading={isLoading}
        >
          <EuiValidatableControl
            isInvalid={isInvalid}
          >
            <DatePicker
              className={datePickerClasses}
              placeholderText={placeholder}
              ref={inputRef}
              inline={inline}
              customInput={customInput}
              showYearDropdown
              showMonthDropdown
              yearDropdownItemNumber={7}
              dateFormat={dateFormat}
              selected={selected}
              onChange={onChange}
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              timeFormat={timeFormat}
              injectTimes={injectTimes}
              calendarClassName={calendarClassName}
              dayClassName={dayClassName}
              minTime={minTime}
              maxTime={maxTime}
              minDate={minDate}
              maxDate={maxDate}
              popperClassName={popperClassName}
              locale={locale}
              excludeDates={excludeDates}
              shouldCloseOnSelect={shouldCloseOnSelect}
              openToDate={openToDate}
              disabled={disabled}
              utcOffset={utcOffset}
              filterDates={filterDates}
              {...rest}
            />
          </EuiValidatableControl>
        </EuiFormControlLayout>
      </span>
    );

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
      datePickerOrError = (
        <EuiErrorBoundary>
          <PropNotSupported />
        </EuiErrorBoundary>
      );
    }

    return (
      <span>
        {datePickerOrError}
      </span>
    );
  }
}

EuiDatePicker.propTypes = {
  className: PropTypes.string,
  calendarClassName: PropTypes.string,
  dayClassName: PropTypes.func,
  popperClassName: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  customInput: PropTypes.node,
  locale: PropTypes.string,
  isInvalid: PropTypes.bool,
  inputRef: PropTypes.func,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeFormat: PropTypes.string,
  dateFormat: PropTypes.string,
  injectTimes: PropTypes.array,
  selected: PropTypes.instanceOf(moment),
  minDate: PropTypes.instanceOf(moment),
  maxDate: PropTypes.instanceOf(moment),
  minTime: PropTypes.instanceOf(moment),
  maxTime: PropTypes.instanceOf(moment),
  openToDate: PropTypes.instanceOf(moment),
};

EuiDatePicker.defaultProps = {
  fullWidth: false,
  isLoading: false,
  shouldCloseOnSelect: true,
  shadow: true,
  dateFormat:"MM/DD/YYYY hh:mm A",
  timeFormat:"hh:mm A",
};
