import React, {
  Component,
} from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';

function isValidHex(hex) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#DB1374'
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
      <React.Fragment>
        <EuiFormRow
          label="Pick a color"
          isInvalid={hasErrors}
          error={errors}
        >
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
            isInvalid={hasErrors}
          />
        </EuiFormRow>
      </React.Fragment>
    );
  }
}
