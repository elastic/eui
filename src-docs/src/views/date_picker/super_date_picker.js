import React, { Component, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
  EuiFormRow,
  EuiFieldText,
  EuiLink,
} from '../../../../src/components';

function MyCustomQuickSelectPanel({ applyTime }) {
  function applyMyCustomTime() {
    applyTime({ start: 'now-30d', end: 'now+7d' });
  }

  return (
    <EuiLink onClick={applyMyCustomTime}>entire dataset timerange</EuiLink>
  );
}

export default class extends Component {
  state = {
    recentlyUsedRanges: [],
    isDiasabled: false,
    isLoading: false,
    showUpdateButton: true,
    isAutoRefreshOnly: false,
    showCustomQuickSelectPanel: false,
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

  toggleShowCustomQuickSelectPanel = () => {
    this.setState(prevState => ({
      showCustomQuickSelectPanel: !prevState.showCustomQuickSelectPanel,
    }));
  };

  renderTimeRange = () => {
    if (this.state.isAutoRefreshOnly) {
      return null;
    }

    return (
      <Fragment>
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
      </Fragment>
    );
  };

  render() {
    let customQuickSelectPanels;
    if (this.state.showCustomQuickSelectPanel) {
      customQuickSelectPanels = [
        {
          title: 'My custom panel',
          content: <MyCustomQuickSelectPanel />,
        },
      ];
    }
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
        &emsp;
        <EuiSwitch
          label="Show custom quick select panel"
          onChange={this.toggleShowCustomQuickSelectPanel}
          checked={this.state.showCustomQuickSelectPanel}
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
          customQuickSelectPanels={customQuickSelectPanels}
        />
        <EuiSpacer />
        {this.renderTimeRange()}
      </Fragment>
    );
  }
}
