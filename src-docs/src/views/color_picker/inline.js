import React, { Component } from 'react';

import { EuiColorPicker } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

export class Inline extends Component {
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

    return (
      <EuiColorPicker
        onChange={this.handleChange}
        color={this.state.color}
        isInvalid={hasErrors}
        display="inline"
      />
    );
  }
}
