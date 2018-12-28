
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
    showApplyButton: true,
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

  toggleShowApplyButton = () => {
    this.setState(prevState => ({
      showApplyButton: !prevState.showApplyButton,
    }));
  }

  render() {
    return (
      <Fragment>
        <EuiFormRow
          label="start time"
        >
          <EuiFieldText
            disabled
            value={this.state.start}
          />
        </EuiFormRow>
        <EuiFormRow
          label="end time"
        >
          <EuiFieldText
            disabled
            value={this.state.end}
          />
        </EuiFormRow>
        <EuiSwitch
          label="Show apply button"
          onChange={this.toggleShowApplyButton}
          checked={this.state.showApplyButton}
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
          showApplyButton={this.state.showApplyButton}
        />
      </Fragment>
    );
  }
}
