
import React, { Component } from 'react';

import {
  EuiSuperDatePicker,
} from '../../../../src/components';

export default class extends Component {

  state = {
    recentlyUsedRanges: [],
    isLoading: false,
  }

  onTimeChange = ({ from, to }) => {
    this.setState((prevState) => {
      const recentlyUsedRanges = prevState.recentlyUsedRanges.filter(recentlyUsedRange => {
        const isDuplicate = recentlyUsedRange.from === from && recentlyUsedRange.to === to;
        return !isDuplicate;
      });
      recentlyUsedRanges.unshift({ from, to });
      return {
        from,
        to,
        recentlyUsedRanges: recentlyUsedRanges.length > 10 ? recentlyUsedRanges.slice(0, 9) : recentlyUsedRanges,
        isLoading: true,
      };
    }, this.startLoading);
  }

  startLoading = () => {
    setTimeout(
      this.stopLoading,
      1000);
  }

  stopLoading = () => {
    this.setState({ isLoading: false });
  }

  onRefreshChange = ({ isPaused, refreshInterval }) => {
    this.setState((prevState) => {
      return {
        isPaused: isPaused == null ? prevState.isPaused : isPaused,
        refreshInterval: refreshInterval == null ? prevState.refreshInterval : refreshInterval,
      };
    });
  }

  render() {
    return (
      <EuiSuperDatePicker
        isLoading={this.state.isLoading}
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
