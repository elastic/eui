
import React, { Component, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
  EuiFormRow,
  EuiFieldText,
} from '../../../../src/components';

export default class extends Component {

  state = {
    recentlyUsedRanges: [],
    isLoading: false,
    showUpdateButton: true,
    isAutoRefreshOnly: false,
    start: 'now-30m',
    end: 'now',
  }

  onTimeChange = ({ start, end }) => {
    this.setState((prevState) => {
      const recentlyUsedRanges = prevState.recentlyUsedRanges.filter(recentlyUsedRange => {
        const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
        return !isDuplicate;
      });
      recentlyUsedRanges.unshift({ start, end });
      return {
        start,
        end,
        recentlyUsedRanges: recentlyUsedRanges.length > 10 ? recentlyUsedRanges.slice(0, 9) : recentlyUsedRanges,
        isLoading: true,
      };
    }, this.startLoading);
  }

  onStartInputChange = e => {
    this.setState({
      start: e.target.value,
    });
  };

  onEndInputChange = e => {
    this.setState({
      end: e.target.value,
    });
  };

  startLoading = () => {
    setTimeout(
      this.stopLoading,
      1000);
  }

  stopLoading = () => {
    this.setState({ isLoading: false });
  }

  onRefreshChange = ({ isPaused, refreshInterval }) => {
    this.setState({
      isPaused,
      refreshInterval,
    });
  }

  toggleShowApplyButton = () => {
    this.setState(prevState => ({
      showUpdateButton: !prevState.showUpdateButton,
    }));
  }

  toggleShowRefreshOnly = () => {
    this.setState(prevState => ({
      isAutoRefreshOnly: !prevState.isAutoRefreshOnly,
    }));
  }

  renderTimeRange = () => {
    if (this.state.isAutoRefreshOnly) {
      return null;
    }

    return (
      <Fragment>
        <EuiFormRow
          label="start"
          helpText="EuiSuperDatePicker should be resilient to invalid start values. Try to break it with unexpected values"
        >
          <EuiFieldText
            onChange={this.onStartInputChange}
            value={this.state.start}
          />
        </EuiFormRow>
        <EuiFormRow
          label="end"
          helpText="EuiSuperDatePicker should be resilient to invalid end values. Try to break it with unexpected values"
        >
          <EuiFieldText
            onChange={this.onEndInputChange}
            value={this.state.end}
          />
        </EuiFormRow>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <EuiSwitch
          label="Show apply button"
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
        <EuiSpacer />

        <EuiSuperDatePicker
          isLoading={this.state.isLoading}
          start={this.state.start}
          end={this.state.end}
          onTimeChange={this.onTimeChange}
          isPaused={this.state.isPaused}
          refreshInterval={this.state.refreshInterval}
          onRefreshChange={this.onRefreshChange}
          recentlyUsedRanges={this.state.recentlyUsedRanges}
          showUpdateButton={this.state.showUpdateButton}
          isAutoRefreshOnly={this.state.isAutoRefreshOnly}
        />

        <EuiSpacer />

        {this.renderTimeRange()}
      </Fragment>
    );
  }
}
