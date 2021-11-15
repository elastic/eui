import React, { useState, Fragment } from 'react';

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
    <EuiLink onClick={applyMyCustomTime}>Entire dataset timerange</EuiLink>
  );
}

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [showCustomQuickSelectPanel, setShowCustomQuickSelectPanel] = useState(
    true
  );
  const [showRecentlyUsed, setShowRecentlyUsed] = useState(true);

  const onTimeChange = ({ start, end }) => {
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

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
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

  const toggleShowCustomQuickSelectPanel = () => {
    setShowCustomQuickSelectPanel(!showCustomQuickSelectPanel);
  };

  const toggleShowRecentlyUsed = () => {
    setShowRecentlyUsed(!showRecentlyUsed);
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
        label="Show recently used"
        onChange={toggleShowRecentlyUsed}
        checked={showRecentlyUsed}
      />
      &emsp;
      <EuiSwitch
        label="Show custom panel"
        onChange={toggleShowCustomQuickSelectPanel}
        checked={showCustomQuickSelectPanel}
      />
      &emsp;
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
      />
      <EuiSpacer />
    </Fragment>
  );
};
