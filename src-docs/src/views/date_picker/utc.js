import React, { Component } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSelect,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { value: -1, text: 'GMT -01:00' },
      { value: -2, text: 'GMT -02:00' },
      { value: -3, text: 'GMT -03:00' },
    ];

    this.state = {
      startDate: moment(),
      utcOffset: this.options[1].value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange = e => {
    this.setState({
      utcOffset: parseInt(e.target.value, 10),
    });
  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    const selected =
      this.state.startDate &&
      this.state.startDate.clone().utcOffset(this.state.utcOffset);

    return (
      <div>
        <EuiFormRow label="Select a date">
          <EuiDatePicker
            selected={selected}
            onChange={this.handleChange}
            utcOffset={this.state.utcOffset * 60}
          />
        </EuiFormRow>
        <EuiFormRow label="UTC offset">
          <EuiSelect
            options={this.options}
            value={this.state.utcOffset}
            onChange={this.onSelectChange}
          />
        </EuiFormRow>
      </div>
    );
  }
}
