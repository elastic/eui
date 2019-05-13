import React, { Component } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiFormRow } from '../../../../src/components';

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
      <EuiFormRow label="Select a date">
        <EuiDatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </EuiFormRow>
    );
  }
}
