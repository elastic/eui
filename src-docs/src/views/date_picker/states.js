import React, { Component } from 'react';

import {
  EuiDatePicker,
  EuiSpacer,
  EuiFormRow,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

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
      /* DisplayToggles wrapper for Docs only */
      <div>
        <DisplayToggles canCompressed={false}>
          <EuiDatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholder="Placeholder text"
          />
        </DisplayToggles>

        <EuiSpacer size="l" />

        <EuiDatePicker
          showTimeSelect
          selected={this.state.startDate}
          onChange={this.handleChange}
          onClear={() => this.handleChange(null)}
          placeholder="Clearable"
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
