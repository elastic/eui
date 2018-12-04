
import React, { Component } from 'react';

import {
  EuiSuperDatePicker,
} from '../../../../src/components';

export default class extends Component {

  state = {
    recentlyUsedRanges: []
  }

  onTimeChange = ({ from, to }) => {
    this.setState((prevState) => {
      const recentlyUsedRanges = [...prevState.recentlyUsedRanges];
      recentlyUsedRanges.push({ from, to });
      return {
        from,
        to,
        recentlyUsedRanges: recentlyUsedRanges.length > 10 ? recentlyUsedRanges.slice(0, 9) : recentlyUsedRanges,
      };
    });
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
        recentlyUsedRanges={this.state.recentlyUsedRanges}
      />
    );
  }
}
