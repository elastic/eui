import React, { Component } from 'react';

import {
  EuiButtonToggle,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle0On: false,
      toggle1On: false,
      toggle2On: false,
      toggle3On: true,
      toggle4On: true,
    };
  }

  onToggle0Change = e => {
    this.setState({ toggle0On: e.target.checked });
  };

  onToggle1Change = e => {
    this.setState({ toggle1On: e.target.checked });
  };

  onToggle4Change = e => {
    this.setState({ toggle4On: e.target.checked });
  };

  render() {
    return (
      <div>
        <EuiButtonToggle
          label="Toggle Me"
          iconType={this.state.toggle0On ? 'starPlusEmpty' : 'starFilledSpace'}
          onChange={this.onToggle0Change}
          isSelected={this.state.toggle0On}
        />
        &emsp;
        <EuiButtonToggle
          label={
            this.state.toggle1On
              ? "I'm a filled toggle"
              : "I'm a primary toggle"
          }
          fill={this.state.toggle1On}
          onChange={this.onToggle1Change}
          isSelected={this.state.toggle1On}
        />
        &emsp;
        <EuiButtonToggle
          label="Toggle Me"
          iconType={this.state.toggle4On ? 'eye' : 'eyeClosed'}
          onChange={this.onToggle4Change}
          isSelected={this.state.toggle4On}
          isEmpty
          isIconOnly
        />
        <EuiSpacer size="m" />
        <EuiTitle size="xxs">
          <h3>Disabled</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonToggle
          isDisabled
          label="Can't toggle this"
          fill={this.state.toggle2On}
          isSelected={this.state.toggle2On}
        />
        &emsp;
        <EuiButtonToggle
          isDisabled
          label="Can't toggle this either"
          fill={this.state.toggle3On}
          isSelected={this.state.toggle3On}
        />
      </div>
    );
  }
}
