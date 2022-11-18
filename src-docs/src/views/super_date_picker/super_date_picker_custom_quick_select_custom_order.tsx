import React, { useState, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSpacer,
  EuiLink,
  OnTimeChangeProps,
  OnRefreshProps,
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
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        recentlyUsedRanges={recentlyUsedRanges}
        customQuickSelectPanels={customQuickSelectPanels}
        customQuickSelectRender={({
          quickSelect,
          commonlyUsedTimes,
          recentlyUsedTimes,
          customQuickSelectPanels,
        }) => (
          <>
            {customQuickSelectPanels}
            {quickSelect}
            {commonlyUsedTimes}
            {recentlyUsedTimes}
          </>
        )}
      />
      <EuiSpacer />
    </Fragment>
  );
};
