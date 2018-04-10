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
      shouldCloseOnSelect,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDatePicker',
      {
        'euiDatePicker--shadow': shadow,
      },
      className
    );

    const datePickerClasses = classNames(
      'euiDatePicker',
      'euiFieldText',
      'euiFieldText--fullWidth': fullWidth,
      'euiFieldText-isLoading': isLoading,
      {
        'euiFieldText--withIcon': !inline,
      },
    );

    let datePickerOrError = (
      <span className={classes}>
        <EuiFormControlLayout
          icon={inline ? null : 'calendar'}
          fullWidth={fullWidth}
          isLoading={isLoading}
        >
          <EuiValidatableControl
            isInvalid={isInvalid}
          >
            <DatePicker
              className={datePickerClasses}
              placeholder={placeholder}
              inputRef={inputRef}
              inline={inline}
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
              locale={locale}
              excludeDates={excludeDates}
              shouldCloseOnSelect={shouldCloseOnSelect}
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
      this.props.monthsShown ||
      this.props.showWeekNumbers ||
      this.props.fixedHeight ||
      this.props.dropdownMode ||
      this.props.useShortMonthInDropdown ||
      this.props.todayButton ||
      this.props.timeCaption ||
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

  // if (props.monthsShown || props.showWeekNumbers || props.fixedHeight || props.dropdownMode || props.useShortMonthInDropdown || props.withPortal) {

EuiDatePicker.propTypes = {
  className: PropTypes.string,
  calendarClassName: PropTypes.string,
  dayClassName: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  local: PropTypes.string,
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
};

EuiDatePicker.defaultProps = {
  fullWidth: false,
  isLoading: false,
  shouldCloseOnSelect: true,
  shadow: true,
  dateFormat:"MM/DD/YYY hh:mm A",
  timeFormat:"hh:mm A",
};
