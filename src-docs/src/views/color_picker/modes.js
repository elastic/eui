import React, { Component } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class Modes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#DB1374',
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && this.state.color !== '';

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <React.Fragment>
        <EuiFormRow label="Pick a swatch" isInvalid={hasErrors} error={errors}>
          <EuiColorPicker
            mode="swatch"
            onChange={this.handleChange}
            color={this.state.color}
            isInvalid={hasErrors}
          />
        </EuiFormRow>
        <EuiFormRow label="Pick a color" isInvalid={hasErrors} error={errors}>
          <EuiColorPicker
            mode="picker"
            onChange={this.handleChange}
            color={this.state.color}
            isInvalid={hasErrors}
          />
        </EuiFormRow>
      </React.Fragment>
    );
  }
}
