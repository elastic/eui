import React, {
  Component,
} from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#666'
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
        />
      </EuiFormRow>
    );
  }
}
