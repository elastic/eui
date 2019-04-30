import React, { Component } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <div>
        <EuiFormRow label="className example">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            className="dpTest__purpleInput"
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="calendarClassName example">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            calendarClassName="dpTest__purpleCal"
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="dayClassName example">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            dayClassName={date =>
              date.date() < Math.random() * 31 ? 'dpTest__purpleDay' : undefined
            }
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="popperClassName example">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            popperClassName="dpTest__purplePopper"
          />
        </EuiFormRow>
      </div>
    );
  }
}
