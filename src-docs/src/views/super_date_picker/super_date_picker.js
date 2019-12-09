import React, { Component, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSpacer,
  EuiFormRow,
  EuiFieldText,
  EuiPanel,
} from '../../../../src/components';

export default class extends Component {
  state = {
    recentlyUsedRanges: [],
    isLoading: false,
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

  renderTimeRange = () => {
    return (
      <Fragment>
        <EuiPanel paddingSize="m">
          <EuiFormRow
            label="start"
            helpText="EuiSuperDatePicker should be resilient to invalid start values. Try to break it with unexpected values">
            <EuiFieldText
              onChange={this.onStartInputChange}
              value={this.state.start}
            />
          </EuiFormRow>
          <EuiFormRow
            label="end"
            helpText="EuiSuperDatePicker should be resilient to invalid end values. Try to break it with unexpected values">
            <EuiFieldText
              onChange={this.onEndInputChange}
              value={this.state.end}
            />
          </EuiFormRow>
        </EuiPanel>
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
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
        />
        <EuiSpacer />
        {this.renderTimeRange()}
      </Fragment>
    );
  }
}
