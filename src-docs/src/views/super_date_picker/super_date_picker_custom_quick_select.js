import React, { Component, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
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
    isLoading: false,
    showCustomQuickSelectPanel: true,
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

  toggleShowCustomQuickSelectPanel = () => {
    this.setState(prevState => ({
      showCustomQuickSelectPanel: !prevState.showCustomQuickSelectPanel,
    }));
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
          label="Show custom quick menu panel"
          onChange={this.toggleShowCustomQuickSelectPanel}
          checked={this.state.showCustomQuickSelectPanel}
        />
        &emsp;
        <EuiSpacer />
        <EuiSuperDatePicker
          isLoading={this.state.isLoading}
          start={this.state.start}
          end={this.state.end}
          onTimeChange={this.onTimeChange}
          onRefresh={this.onRefresh}
          isPaused={this.state.isPaused}
          refreshInterval={this.state.refreshInterval}
          onRefreshChange={this.onRefreshChange}
          recentlyUsedRanges={this.state.recentlyUsedRanges}
          customQuickSelectPanels={customQuickSelectPanels}
        />
        <EuiSpacer />
      </Fragment>
    );
  }
}
