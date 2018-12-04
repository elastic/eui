
import React, { Component } from 'react';

import {
  EuiSuperDatePicker,
} from '../../../../src/components';

export default class extends Component {

  state = {}

  onTimeChange = ({ from, to }) => {
    this.setState({ from, to });
  }

  onRefreshChange = ({ isPaused, refreshInterval }) => {
    this.setState({ isPaused, refreshInterval });
  }

  render() {

    return (
      <EuiSuperDatePicker
        from={this.state.from}
        to={this.state.to}
        onTimeChange={this.onTimeChange}
        isPaused={this.state.isPaused}
        refreshInterval={this.state.refreshInterval}
        onRefreshChange={this.onRefreshChange}
      />
    );
  }
}
