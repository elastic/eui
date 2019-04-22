import React, {
  Component,
} from 'react';

import {
  EuiColorPicker,
  EuiFormRow,
  EuiColorPickerSwatch
} from '../../../../src/components';

// import { isValidHex } from '../../../../src/services';

function isValidHex(hex) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

export class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  handleChange = (value) => {
    this.setState({ color: value });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && (this.state.color !== '');

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <EuiFormRow
        label="Pick a color"
        isInvalid={hasErrors}
        error={errors}
      >
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          isInvalid={hasErrors}
          button={
            <EuiColorPickerSwatch
              color={this.state.color}
              aria-label="Select a new color"
            />
          }
        />
      </EuiFormRow>
    );
  }
}
