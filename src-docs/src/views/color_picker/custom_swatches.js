import React, {
  Component,
} from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class CustomSwatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
    };
  }

  handleChange = (value) => {
    this.setState({ color: value });
  };

  render() {
    let errors;
    if (!isValidHex(this.state.color)) {
      errors = ['Provide a valid hex value'];
    }

    const customSwatches = [
      '#333',
      '#666',
      '#999',
      '#CCC',
      '#EEE',
    ]

    return (
      <EuiFormRow
        label="Pick a color"
        isInvalid={!isValidHex(this.state.color)}
        error={errors}
      >
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          isInvalid={!isValidHex(this.state.color)}
          swatches={customSwatches}
        />
      </EuiFormRow>
    );
  }
}
