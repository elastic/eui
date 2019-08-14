import React, { Component, Fragment } from 'react';

import { EuiSwitch, EuiSpacer } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  onChange = () => {
    this.setState({
      checked: !this.state.checked,
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
      </Fragment>
    );
  }
}
