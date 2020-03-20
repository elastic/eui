import React, { Component, Fragment } from 'react';

import { EuiRadio, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

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
        <EuiRadio
          id={htmlIdGenerator()()}
          label="I am a radio"
          checked={this.state.checked}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiRadio
          id={htmlIdGenerator()()}
          label="I am a disabled radio"
          checked={this.state.checked}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiRadio
          id={htmlIdGenerator()()}
          label="I am a compressed radio"
          checked={this.state.checked}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}
