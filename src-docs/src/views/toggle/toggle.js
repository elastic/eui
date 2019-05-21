import React, { Component } from 'react';

import { EuiToggle } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleOn: false,
    };
  }

  onToggleChange = e => {
    this.setState({ toggleOn: e.target.checked });
  };

  render() {
    return (
      <div>
        <EuiToggle onChange={this.onToggleChange} label="Is toggle on?">
          {this.state.toggleOn ? 'On' : 'Off'}
        </EuiToggle>
      </div>
    );
  }
}
