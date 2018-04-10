import React, {
  Component,
} from 'react';

import {
  EuiDatePicker,
  EuiSpacer,
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
      startDate: date
    });
  }

  render() {
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
      </div>
    );
  }
}
