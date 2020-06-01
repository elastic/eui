import React, { useState, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [isAutoRefreshOnly, setIsAutoRefreshOnly] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter(recentlyUsedRange => {
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

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise(resolve => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const toggleShowApplyButton = () => {
    setShowUpdateButton(!showUpdateButton);
  };

  const toggleShowRefreshOnly = () => {
    setIsAutoRefreshOnly(!isAutoRefreshOnly);
  };

  return (
    <Fragment>
      <EuiSwitch
        label="Show update button"
        onChange={toggleShowApplyButton}
        checked={!isAutoRefreshOnly && showUpdateButton}
        disabled={isAutoRefreshOnly}
      />
      &emsp;
      <EuiSwitch
        label="Is auto-refresh only"
        onChange={toggleShowRefreshOnly}
        checked={isAutoRefreshOnly}
      />
      &emsp;
      <EuiSwitch
        label="Is disabled"
        onChange={toggleDisabled}
        checked={isDisabled}
      />
      <EuiSpacer />
      <EuiSuperDatePicker
        isDisabled={isDisabled}
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        recentlyUsedRanges={recentlyUsedRanges}
        showUpdateButton={showUpdateButton}
        isAutoRefreshOnly={isAutoRefreshOnly}
      />
      <EuiSpacer />
    </Fragment>
  );
};
