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

export class EuiDatePicker extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

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

    return (
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
              selected={this.state.startDate}
              onChange={this.handleChange}
              className={datePickerClasses}
              placeholder={placeholder}
              inputRef={inputRef}
              inline={inline}
              showYearDropdown
              showMonthDropdown
              yearDropdownItemNumber={7}
              {...rest}
            />
          </EuiValidatableControl>
        </EuiFormControlLayout>
      </span>
    );
  }
}

EuiDatePicker.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  isInvalid: PropTypes.bool,
  inputRef: PropTypes.func,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
};

EuiDatePicker.defaultProps = {
  fullWidth: false,
  isLoading: false,
  shadow: true,
};
