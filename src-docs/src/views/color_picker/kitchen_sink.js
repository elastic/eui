import React, { Component } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class KitchenSink extends Component {
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
    const isCompressed = true;

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <React.Fragment>
        <EuiFormRow
          compressed={isCompressed}
          label="Pick a color"
          isInvalid={hasErrors}
          error={errors}
          fullWidth={true}>
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
            isInvalid={hasErrors}
            onBlur={() => console.log('onBlur')}
            onFocus={() => console.log('onFocus')}
            compressed={isCompressed}
            fullWidth={true}
            popoverZIndex={10}
            mode="default"
            swatches={['#333', '#666', '#999', '#CCC', '#FFF']}
          />
        </EuiFormRow>
        <EuiFormRow compressed={isCompressed} label="Compressed">
          <EuiColorPicker
            onChange={this.handleChange}
            compressed={isCompressed}
          />
        </EuiFormRow>
        <EuiFormRow label="Disabled">
          <EuiColorPicker onChange={this.handleChange} disabled={true} />
        </EuiFormRow>
        <EuiFormRow label="Read only">
          <EuiColorPicker
            color="#FFF"
            onChange={this.handleChange}
            readOnly={true}
          />
        </EuiFormRow>
        <EuiFormRow fullWidth={true} label="Full width">
          <EuiColorPicker onChange={this.handleChange} fullWidth={true} />
        </EuiFormRow>
      </React.Fragment>
    );
  }
}
