import React, { Component, Fragment } from 'react';

import { EuiSwitch, EuiSpacer } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  onChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSwitch
          label="I am a switch"
          checked={this.state.checked}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiSwitch
          label="I am a disabled switch"
          checked={this.state.checked}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiSwitch
          label="I am a compressed switch"
          checked={this.state.checked}
          onChange={this.onChange}
          compressed
        />

        <EuiSpacer size="m" />

        <EuiSwitch
          label="I am a compressed, disabled switch"
          checked={this.state.checked}
          onChange={this.onChange}
          compressed
          disabled
        />
      </Fragment>
    );
  }
}
