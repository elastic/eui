import React, { Component } from 'react';

import {
  EuiSwitch,
  EuiDescriptionList,
  EuiSpacer,
} from '../../../../src/components';

import { EuiWindowEvent } from '../../../../src/services';

export class MousePosition extends Component {
  state = {
    tracking: false,
    coordinates: {},
  };

  onSwitchChange = () =>
    this.setState(state => ({ tracking: !state.tracking }));

  onMouseMove = ({ clientX, clientY }) =>
    this.setState({ coordinates: { clientX, clientY } });

  render() {
    const listItems = [
      {
        title: 'Position X',
        description: this.state.coordinates.clientX || '??',
      },
      {
        title: 'Position Y',
        description: this.state.coordinates.clientY || '??',
      },
    ];
    return (
      <div>
        <EuiSwitch
          label="Track mouse position"
          checked={this.state.tracking}
          onChange={this.onSwitchChange}
        />
        {this.state.tracking ? (
          <EuiWindowEvent event="mousemove" handler={this.onMouseMove} />
        ) : null}
        <EuiSpacer size="l" />
        <EuiDescriptionList listItems={listItems} />
        <EuiSpacer size="xxl" />
      </div>
    );
  }
}
