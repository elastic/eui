import React, { Component } from 'react';

import {
  EuiButtonToggle,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle0On: false,
      toggle1On: false,
      toggle2On: false,
      toggle3On: true,
    };
  }

  onToggle0Change = (e) => {
    this.setState({ toggle0On: e.target.checked });
  }

  onToggle1Change = (e) => {
    this.setState({ toggle1On: e.target.checked });
  }

  render() {
    return (
      <div>
        <EuiButtonToggle label="Toggle Me" isSelected={this.state.toggle0On} onChange={this.onToggle0Change} />

        <br />
        <br />

        <EuiButtonToggle color="primary" label="I'm a primary toggle" isSelected={this.state.toggle1On} onChange={this.onToggle1Change} />

        <br />
        <br />

        <EuiButtonToggle color="primary" isDisabled label="Can't toggle this" isSelected={this.state.toggle2On} />

        <br />
        <br />

        <EuiButtonToggle color="primary" isDisabled label="Can't toggle this either" isSelected={this.state.toggle3On} />
      </div>
    );
  }
}
