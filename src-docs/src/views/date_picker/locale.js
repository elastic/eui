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
        <EuiFormRow label="US with fractional seconds">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            dateFormat="YYYY-MM-DD hh:mm:ss:SSS A"
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="China">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            dateFormat="YYYY-MM-DD hh:mm A"
            locale="zh-cn"
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="Korea">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            locale="ko"
            dateFormat="YYYY-MM-DD hh:mm A"
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow label="Germany on 24 hour clock">
          <EuiDatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            dateFormat="DD-MM-YYYY HH:mm"
            timeFormat="HH:mm"
            locale="de-de"
          />
        </EuiFormRow>
      </div>
    );
  }
}
