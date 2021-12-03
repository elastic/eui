import React, { useState } from 'react';

import { EuiAutoRefreshButton, OnRefreshChangeProps } from '../../../../src';

export default () => {
  const [refreshInterval, setRefreshInterval] = useState(3000);
  const [isPaused, setIsPaused] = useState(false);

  const onRefreshChange = ({
    isPaused,
    refreshInterval,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  return (
    <EuiAutoRefreshButton
      isPaused={isPaused}
      refreshInterval={refreshInterval}
      onRefreshChange={onRefreshChange}
      shortHand
    />
  );
};
