import React, {
  Component,
} from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class KitchenSink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    };
  }

  handleChange = (value) => {
    this.setState({ color: value });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && (this.state.color !== '');
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
        >
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
            isInvalid={hasErrors}
            onBlur={() => console.log('onBlur')}
            onFocus={() => console.log('onFocus')}
            compressed={isCompressed}
            fullWidth={true}
            popoverZIndex={10}
            swatches={[
              '#333',
              '#666',
              '#999',
              '#CCC',
              '#FFF',
            ]}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Can't pick a color"
        >
          <EuiColorPicker
            onChange={this.handleChange}
            disabled={true}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Read a color"
        >
          <EuiColorPicker
            color="#FFF"
            onChange={this.handleChange}
            readOnly={true}
          />
        </EuiFormRow>
      </React.Fragment>
    );
  }
}
