import React, { useState } from 'react';

import {
  EuiSuperDatePicker,
  OnRefreshChangeProps,
  OnRefreshProps,
  OnTimeChangeProps,
  RefreshUnitsOptions,
  EuiSwitch,
} from '../../../../src';

export default () => {
  const [doNotRoundUnits, setDoNotRoundUnits] = useState(false);
  const [intervalUnits, setIntervalUnits] = useState<RefreshUnitsOptions>();

  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [isPaused, setIsPaused] = useState(true);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
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
    intervalUnits,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
    setIntervalUnits(intervalUnits);
  };

  return (
    <EuiSuperDatePicker
      start={start}
      end={end}
      onTimeChange={onTimeChange}
      onRefresh={onRefresh}
      isPaused={isPaused}
      onRefreshChange={onRefreshChange}
      refreshInterval={refreshInterval}
      refreshIntervalUnits={doNotRoundUnits ? intervalUnits : undefined}
      customQuickSelectRender={({ refreshInterval }) => (
        <>
          <EuiSwitch
            label="Round refresh interval up to the next largest unit"
            checked={!doNotRoundUnits}
            onChange={() => setDoNotRoundUnits(!doNotRoundUnits)}
            compressed
          />
          {refreshInterval}
        </>
      )}
    />
  );
};
