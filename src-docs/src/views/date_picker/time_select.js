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
        <EuiFormRow label="Time select on">
          <EuiDatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiFormRow label="Only time select, 24 hour clock">
          <EuiDatePicker
            showTimeSelect
            showTimeSelectOnly
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="HH:mm"
            timeFormat="HH:mm"
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiFormRow label="Inject additional times into the list">
          <EuiDatePicker
            showTimeSelect
            showTimeSelectOnly
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="hh:mm a"
            timeFormat="hh:mm a"
            injectTimes={[
              moment()
                .hours(0)
                .minutes(1),
              moment()
                .hours(0)
                .minutes(5),
              moment()
                .hours(23)
                .minutes(59),
            ]}
          />
        </EuiFormRow>
      </div>
    );
  }
}
