import React, {
  Component,
} from 'react';

import {
  EuiColorPicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiFormRow,
  EuiKeyboardAccessible,
} from '../../../../src/components';

export class ColorPickerLabelAndClear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null
    };
  }

  handleChange = (value) => {
    this.setState({ color: value });
  };

  resetColor = () => {
    this.setState({ color: null });
  };

  render() {
    return (
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiFormRow label="Pick a color">
            <EuiColorPicker
              onChange={this.handleChange}
              color={this.state.color}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButtonEmpty onClick={this.resetColor}>
              Reset
            </EuiButtonEmpty>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
