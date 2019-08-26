import React, { Component } from 'react';

import {
  EuiDatePicker,
  EuiSpacer,
  EuiFormRow,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const errors = [
      "Here's an example of an error",
      'You might have more than one error, so pass an array.',
    ];

    return (
      <div>
        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          placeholder="Placeholder text"
        />

        <EuiSpacer size="m" />

        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          onClear={() => this.handleChange(null)}
          placeholder="Clearable"
        />

        <EuiSpacer size="m" />

        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          disabled
          placeholder="Disabled"
        />

        <EuiSpacer size="m" />

        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          isLoading
          placeholder="Loading"
        />

        <EuiSpacer size="m" />

        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          isLoading
          disabled
          placeholder="Loading and disabled"
        />

        <EuiSpacer size="m" />

        <EuiFormRow label="Form row validation" isInvalid error={errors}>
          <EuiDatePicker
            showTimeSelect
            isInvalid
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholder="Example of an error"
          />
        </EuiFormRow>
      </div>
    );
  }
}
