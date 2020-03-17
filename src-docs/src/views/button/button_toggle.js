import React, { Component } from 'react';

import { EuiButton, EuiButtonIcon } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle0On: false,
      toggle1On: false,
      toggle2On: false,
      toggle3On: false,
    };
  }

  onToggle0Change = () => {
    this.setState({ toggle0On: !this.state.toggle0On });
  };

  onToggle1Change = () => {
    this.setState({ toggle1On: !this.state.toggle1On });
  };

  onToggle2Change = () => {
    this.setState({ toggle2On: !this.state.toggle2On });
  };

  onToggle3Change = () => {
    this.setState({ toggle3On: !this.state.toggle3On });
  };

  render() {
    return (
      <div>
        <EuiButton
          fill={this.state.toggle0On}
          aria-pressed={this.state.toggle0On}
          iconType={this.state.toggle0On ? 'starPlusEmpty' : 'starFilledSpace'}
          onClick={this.onToggle0Change}>
          Toggle Me
        </EuiButton>
        &emsp;
        <EuiButton fill={this.state.toggle1On} onClick={this.onToggle1Change}>
          {this.state.toggle1On
            ? 'I am a primary toggle'
            : 'I am a filled toggle'}
        </EuiButton>
        &emsp;
        <EuiButtonIcon
          aria-label={this.state.toggle2On ? 'Play' : 'Pause'}
          iconType={this.state.toggle2On ? 'play' : 'pause'}
          onClick={this.onToggle2Change}
        />
        &emsp;
        <EuiButtonIcon
          aria-label="Autosave"
          iconType="save"
          aria-pressed={this.state.onToggle3Change}
          onClick={this.onToggle3Change}
        />
      </div>
    );
  }
}
