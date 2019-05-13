import React, { Component } from 'react';

import {
  EuiColorPicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiKeyboardAccessible,
} from '../../../../src/components';

export class ColorPickerLabelAndClear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  resetColor = () => {
    this.setState({ color: null });
  };

  render() {
    return (
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <label className="kuiLabel">Background color</label>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <p className="kuiText">
            <EuiKeyboardAccessible>
              <a className="kuiLink" onClick={this.resetColor}>
                Reset
              </a>
            </EuiKeyboardAccessible>
          </p>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
