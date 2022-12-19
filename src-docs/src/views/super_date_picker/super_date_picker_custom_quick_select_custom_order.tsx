import React, { useState, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
  EuiLink,
  OnTimeChangeProps,
  OnRefreshProps,
  OnRefreshChangeProps,
  ApplyTime,
  EuiSuperDatePickerProps,
} from '../../../../src';

function MyCustomQuickSelectPanel({ applyTime }: { applyTime?: ApplyTime }) {
  function applyMyCustomTime() {
    applyTime!({ start: 'now-30d', end: 'now+7d' });
  }

  return (
    <EuiLink onClick={applyMyCustomTime}>Entire dataset timerange</EuiLink>
  );
}

export default () => {
  const [showQuickSelectPanel, setShowQuickSelectPanel] = useState(true);
  const [showCustomQuickSelectPanel, setShowCustomQuickSelectPanel] = useState(
    true
  );
  const [showRecentlyUsed, setShowRecentlyUsed] = useState(true);
  const [showCommonlyUsed, setCommonlyUsed] = useState(true);
  const [showRefreshInterval, setShowRefreshInterval] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [isPaused, setIsPaused] = useState(true);

  const toggleShowQuickSelectPanel = () => {
    setShowQuickSelectPanel(!showQuickSelectPanel);
  };
  const toggleShowCustomQuickSelectPanel = () => {
    setShowCustomQuickSelectPanel(!showCustomQuickSelectPanel);
  };
  const toggleShowRecentlyUsed = () => {
    setShowRecentlyUsed(!showRecentlyUsed);
  };
  const toggleShowCommonlyUsed = () => {
    setCommonlyUsed(!showCommonlyUsed);
  };
  const toggleShowRefreshInterval = () => {
    setShowRefreshInterval(!showRefreshInterval);
  };

  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<
    NonNullable<EuiSuperDatePickerProps['recentlyUsedRanges']>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate =
        recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10
        ? recentlyUsedRange.slice(0, 9)
        : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = ({ start, end, refreshInterval }: OnRefreshProps) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onRefreshChange = ({
    isPaused,
    refreshInterval,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const customQuickSelectPanels = [
    {
      title: 'My custom panel',
      content: <MyCustomQuickSelectPanel />,
    },
  ];

  return (
    <Fragment>
      <EuiSwitch
        label="Show Quick Select Panel"
        onChange={toggleShowQuickSelectPanel}
        checked={showQuickSelectPanel}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Show Recently Used Times Panel"
        onChange={toggleShowRecentlyUsed}
        checked={showRecentlyUsed}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Show Commonly Used Times Panel"
        onChange={toggleShowCommonlyUsed}
        checked={showCommonlyUsed}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Show Custom Quick Select Panel"
        onChange={toggleShowCustomQuickSelectPanel}
        checked={showCustomQuickSelectPanel}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Show Refresh Interval Panel"
        onChange={toggleShowRefreshInterval}
        checked={showRefreshInterval}
      />

      <EuiSpacer />
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        recentlyUsedRanges={showRecentlyUsed ? recentlyUsedRanges : undefined}
        customQuickSelectPanels={
          showCustomQuickSelectPanel ? customQuickSelectPanels : undefined
        }
        isQuickSelectOnly={true}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        customQuickSelectRender={({
          quickSelect,
          commonlyUsedTimes,
          recentlyUsedTimes,
          customQuickSelectPanels,
          refreshInterval,
        }) => (
          <>
            {showCustomQuickSelectPanel ? customQuickSelectPanels : undefined}
            {showCommonlyUsed ? commonlyUsedTimes : undefined}
            {showRecentlyUsed ? recentlyUsedTimes : undefined}
            {showQuickSelectPanel ? quickSelect : undefined}
            {showRefreshInterval ? refreshInterval : undefined}
          </>
        )}
      />
      <EuiSpacer />
    </Fragment>
  );
};
