import React, { Component, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  state = {
    recentlyUsedRanges: [],
    isDisabled: false,
    isLoading: false,
    showUpdateButton: true,
    isAutoRefreshOnly: false,
    start: 'now-30m',
    end: 'now',
  };

  onTimeChange = ({ start, end }) => {
    this.setState(prevState => {
      const recentlyUsedRanges = prevState.recentlyUsedRanges.filter(
        recentlyUsedRange => {
          const isDuplicate =
            recentlyUsedRange.start === start && recentlyUsedRange.end === end;
          return !isDuplicate;
        }
      );
      recentlyUsedRanges.unshift({ start, end });
      return {
        start,
        end,
        recentlyUsedRanges:
          recentlyUsedRanges.length > 10
            ? recentlyUsedRanges.slice(0, 9)
            : recentlyUsedRanges,
        isLoading: true,
      };
    }, this.startLoading);
  };

  onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise(resolve => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  startLoading = () => {
    setTimeout(this.stopLoading, 1000);
  };

  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  onRefreshChange = ({ isPaused, refreshInterval }) => {
    this.setState({
      isPaused,
      refreshInterval,
    });
  };

  toggleDisabled = () => {
    this.setState(prevState => ({
      isDisabled: !prevState.isDisabled,
    }));
  };

  toggleShowApplyButton = () => {
    this.setState(prevState => ({
      showUpdateButton: !prevState.showUpdateButton,
    }));
  };

  toggleShowRefreshOnly = () => {
    this.setState(prevState => ({
      isAutoRefreshOnly: !prevState.isAutoRefreshOnly,
    }));
  };

  render() {
    return (
      <Fragment>
        <EuiSwitch
          label="Show update button"
          onChange={this.toggleShowApplyButton}
          checked={!this.state.isAutoRefreshOnly && this.state.showUpdateButton}
          disabled={this.state.isAutoRefreshOnly}
        />
        &emsp;
        <EuiSwitch
          label="Is auto-refresh only"
          onChange={this.toggleShowRefreshOnly}
          checked={this.state.isAutoRefreshOnly}
        />
        &emsp;
        <EuiSwitch
          label="Is disabled"
          onChange={this.toggleDisabled}
          checked={this.state.isDisabled}
        />
        <EuiSpacer />
        <EuiSuperDatePicker
          isDisabled={this.state.isDisabled}
          isLoading={this.state.isLoading}
          start={this.state.start}
          end={this.state.end}
          onTimeChange={this.onTimeChange}
          onRefresh={this.onRefresh}
          isPaused={this.state.isPaused}
          refreshInterval={this.state.refreshInterval}
          onRefreshChange={this.onRefreshChange}
          recentlyUsedRanges={this.state.recentlyUsedRanges}
          showUpdateButton={this.state.showUpdateButton}
          isAutoRefreshOnly={this.state.isAutoRefreshOnly}
        />
        <EuiSpacer />
      </Fragment>
    );
  }
}
