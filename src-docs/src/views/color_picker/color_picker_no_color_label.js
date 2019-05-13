import React, { Component } from 'react';

import {
  EuiColorPicker,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export class ColorPickerNoColorLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#00FFFF',
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    return (
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <label className="kuiLabel">Foreground color</label>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
            showColorLabel={false}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
