import React, { useState } from 'react';

import { EuiAutoRefresh, OnRefreshChangeProps } from '../../../../src';

export default () => {
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [isPaused, setIsPaused] = useState(true);

  const onRefreshChange = ({
    isPaused,
    refreshInterval,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  return (
    <EuiAutoRefresh
      isPaused={isPaused}
      refreshInterval={refreshInterval}
      onRefreshChange={onRefreshChange}
    />
  );
};
