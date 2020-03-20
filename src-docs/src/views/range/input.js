import React, { Component, Fragment } from 'react';

import { EuiRange, EuiSpacer, EuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '20',
      dualValue: [20, 100],
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onDualChange = value => {
    this.setState({
      dualValue: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiRange
          id={htmlIdGenerator()()}
          value={this.state.value}
          onChange={this.onChange}
          showInput
          aria-label="An example of EuiRange"
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={htmlIdGenerator()()}
          value={this.state.dualValue}
          onChange={this.onDualChange}
          showInput
          minInputProps={{ 'aria-label': 'Min value' }}
          maxInputProps={{ 'aria-label': 'Max value' }}
          aria-label="An example of EuiDualRange with inputs"
        />
      </Fragment>
    );
  }
}
