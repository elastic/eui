import React, { Component } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class CustomSwatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
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

    const customSwatches = ['#333', '#666', '#999', '#CCC'];

    return (
      <EuiFormRow label="Pick a color" isInvalid={hasErrors} error={errors}>
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          isInvalid={hasErrors}
          swatches={customSwatches}
        />
      </EuiFormRow>
    );
  }
}
