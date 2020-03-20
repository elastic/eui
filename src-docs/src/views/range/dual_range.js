import React, { Component } from 'react';

import { EuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ['', ''],
    };
  }

  onChange = value => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <EuiDualRange
        id={htmlIdGenerator()()}
        min={-100}
        max={200}
        step={10}
        value={this.state.value}
        onChange={this.onChange}
        showLabels
        aria-label="An example of EuiDualRange"
      />
    );
  }
}
