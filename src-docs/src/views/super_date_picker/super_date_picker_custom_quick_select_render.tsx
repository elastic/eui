import React, { useState } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
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
  const [showCustomContent, setShowCustomContent] = useState(false);
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
  const toggleShowCustomContent = () => {
    setShowCustomContent(!showCustomContent);
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

  const snippet = `const customQuickSelectRender = ({
  quickSelect,
  commonlyUsedRanges,
  recentlyUsedRanges,
  refreshInterval,
  customQuickSelectPanels,
}) => (
  <>${
    showCustomContent
      ? `
    <EuiTitle size="xxs"><span>Hello world!</span></EuiTitle>`
      : ''
  }${
    showCustomQuickSelectPanel
      ? `
    {customQuickSelectPanels}`
      : ''
  }${
    showCommonlyUsed
      ? `
    {commonlyUsedRanges}`
      : ''
  }${
    showRecentlyUsed
      ? `
    {recentlyUsedRanges}`
      : ''
  }${
    showQuickSelectPanel
      ? `
    {quickSelect}`
      : ''
  }${
    showRefreshInterval
      ? `
    {refreshInterval}`
      : ''
  }
  </>
);

<EuiSuperDatePicker customQuickSelectRender={customQuickSelectRender} />`;

  return (
    <>
      <EuiFlexGrid columns={3} gutterSize="s">
        <EuiSwitch
          label={
            <>
              Show <EuiCode>quickSelect</EuiCode> panel
            </>
          }
          onChange={toggleShowQuickSelectPanel}
          checked={showQuickSelectPanel}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>recentlyUsedRanges</EuiCode> panel
            </>
          }
          onChange={toggleShowRecentlyUsed}
          checked={showRecentlyUsed}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>commonlyUsedRanges</EuiCode> panel
            </>
          }
          onChange={toggleShowCommonlyUsed}
          checked={showCommonlyUsed}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>customQuickSelectPanels</EuiCode>
            </>
          }
          onChange={toggleShowCustomQuickSelectPanel}
          checked={showCustomQuickSelectPanel}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>refreshInterval</EuiCode> panel
            </>
          }
          onChange={toggleShowRefreshInterval}
          checked={showRefreshInterval}
        />
        <EuiSwitch
          label="Show completely custom content"
          onChange={toggleShowCustomContent}
          checked={showCustomContent}
        />
      </EuiFlexGrid>
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
          commonlyUsedRanges,
          recentlyUsedRanges,
          customQuickSelectPanels,
          refreshInterval,
        }) => (
          <>
            {showCustomContent && (
              <EuiTitle size="xxs">
                <span>Hello world!</span>
              </EuiTitle>
            )}
            {showCustomQuickSelectPanel ? customQuickSelectPanels : undefined}
            {showCommonlyUsed ? commonlyUsedRanges : undefined}
            {showRecentlyUsed ? recentlyUsedRanges : undefined}
            {showQuickSelectPanel ? quickSelect : undefined}
            {showRefreshInterval ? refreshInterval : undefined}
          </>
        )}
      />
      <EuiSpacer />
      <EuiTitle size="xs">
        <strong>Example snippet:</strong>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiCodeBlock language="jsx">{snippet}</EuiCodeBlock>
    </>
  );
};
