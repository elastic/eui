import React, { Component } from 'react';

import { EuiColorPicker } from '../../../../src/components';

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ffffff',
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    return (
      <EuiColorPicker onChange={this.handleChange} color={this.state.color} />
    );
  }
}
