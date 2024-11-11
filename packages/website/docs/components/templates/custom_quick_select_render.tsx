import React, { useState } from 'react';

import {
  EuiPanel,
  EuiSwitch,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
} from '@elastic/eui';

import { EuiQuickSelectPanels } from '@elastic/eui/es/components/date_picker/super_date_picker/quick_select_popover/quick_select_popover';
import { useI18nTimeOptions } from '@elastic/eui/es/components/date_picker/super_date_picker/time_options';

// Since we're only demoing how the popover panels render, and not
// actual EuiSuperDatePicker functionality, use noops for brevity
const noop = () => {};

export default () => {
  const timeOptions = useI18nTimeOptions();

  const [showQuickSelectPanel, setShowQuickSelectPanel] = useState(true);
  const [showCustomPanels, setShowCustomPanels] = useState(true);
  const [showRecentlyUsed, setShowRecentlyUsed] = useState(true);
  const [showCommonlyUsed, setShowCommonlyUsed] = useState(true);
  const [showRefreshInterval, setShowRefreshInterval] = useState(true);
  const [showCustomContent, setShowCustomContent] = useState(false);

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
    showCustomPanels
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
      <EuiFlexGrid columns={2} gutterSize="s">
        <EuiSwitch
          label={
            <>
              Show <EuiCode>quickSelect</EuiCode> panel
            </>
          }
          onChange={() => setShowQuickSelectPanel(!showQuickSelectPanel)}
          checked={showQuickSelectPanel}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>commonlyUsedRanges</EuiCode> panel
            </>
          }
          onChange={() => setShowCommonlyUsed(!showCommonlyUsed)}
          checked={showCommonlyUsed}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>recentlyUsedRanges</EuiCode> panel
            </>
          }
          onChange={() => setShowRecentlyUsed(!showRecentlyUsed)}
          checked={showRecentlyUsed}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>customQuickSelectPanels</EuiCode>
            </>
          }
          onChange={() => setShowCustomPanels(!showCustomPanels)}
          checked={showCustomPanels}
        />
        <EuiSwitch
          label={
            <>
              Show <EuiCode>refreshInterval</EuiCode> panel
            </>
          }
          onChange={() => setShowRefreshInterval(!showRefreshInterval)}
          checked={showRefreshInterval}
        />
        <EuiSwitch
          label="Show completely custom content"
          onChange={() => setShowCustomContent(!showCustomContent)}
          checked={showCustomContent}
        />
      </EuiFlexGrid>
      <EuiSpacer />
      <EuiPanel style={{ width: 'fit-content' }}>
        <EuiQuickSelectPanels
          start="now-30m"
          end="now"
          dateFormat="MMM D, YYYY @ HH:mm:ss.SSS"
          timeOptions={timeOptions}
          commonlyUsedRanges={timeOptions.commonDurationRanges}
          recentlyUsedRanges={[
            { start: 'now-30m', end: 'now', label: 'Last 30 minutes' },
            { start: 'now/d', end: 'now/d', label: 'Today' },
          ]}
          customQuickSelectPanels={[
            {
              title: 'Custom quick select panel',
              content: (
                <EuiLink onClick={noop}>Entire dataset timerange</EuiLink>
              ),
            },
          ]}
          isPaused={false}
          refreshInterval={1000}
          applyRefreshInterval={noop}
          applyTime={noop}
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
              {showCustomPanels && customQuickSelectPanels}
              {showCommonlyUsed && commonlyUsedRanges}
              {showRecentlyUsed && recentlyUsedRanges}
              {showQuickSelectPanel && quickSelect}
              {showRefreshInterval && refreshInterval}
            </>
          )}
        />
      </EuiPanel>
      <EuiSpacer />
      <EuiTitle size="xs">
        <strong>Example snippet:</strong>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiCodeBlock language="jsx">{snippet}</EuiCodeBlock>
    </>
  );
};
