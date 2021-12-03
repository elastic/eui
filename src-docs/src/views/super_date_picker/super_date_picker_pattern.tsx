import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuggest,
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  OnRefreshChangeProps,
  OnRefreshProps,
  OnTimeChangeProps,
  EuiOutsideClickDetector,
} from '../../../../src';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
  },
];

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<
    EuiSuperDatePickerProps['recentlyUsedRanges']
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [isPaused, setIsPaused] = useState(true);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [showQuickSelectOnly, setShowQuickSelectOnly] = useState(false);

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

  const onRefreshChange = ({
    isPaused,
    refreshInterval,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem style={{ minWidth: '50%' }}>
          <EuiOutsideClickDetector
            onOutsideClick={() => setShowQuickSelectOnly(false)}
            isDisabled={!showQuickSelectOnly}
          >
            <EuiSuggest
              onFocus={() => setShowQuickSelectOnly(true)}
              onBlur={() => setShowQuickSelectOnly(false)}
              prepend={
                <EuiButtonIcon aria-label="Saved searches" iconType="save" />
              }
              append={<EuiButtonEmpty>KQL</EuiButtonEmpty>}
              aria-label="Filter using KQL"
              suggestions={sampleItems}
            />
          </EuiOutsideClickDetector>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div>
            <EuiSuperDatePicker
              start={start}
              end={end}
              onTimeChange={onTimeChange}
              onRefresh={onRefresh}
              isPaused={isPaused}
              isLoading={isLoading}
              refreshInterval={refreshInterval}
              onRefreshChange={onRefreshChange}
              recentlyUsedRanges={recentlyUsedRanges}
              width="auto"
              isQuickSelectOnly={showQuickSelectOnly}
            />
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
