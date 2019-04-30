import React, { Component } from 'react';

import { EuiSwitch, EuiStat, EuiSpacer } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  onToggleChange = e => {
    this.setState({ isLoading: e.target.checked });
  };

  render() {
    return (
      <div>
        <EuiStat
          title="7,600 mm"
          description="Total People"
          isLoading={this.state.isLoading}
        />
        <EuiSpacer />
        <EuiSwitch
          label="Show as loading"
          checked={this.state.isLoading}
          onChange={this.onToggleChange}
        />
      </div>
    );
  }
}
