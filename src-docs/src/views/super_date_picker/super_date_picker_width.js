import React, { useState } from 'react';

import { EuiSuperDatePicker } from '../../../../src/components';

export default ({ width, compressed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }) => {
    setStart(start);
    setEnd(end);
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

  return (
    <EuiSuperDatePicker
      isLoading={isLoading}
      start={start}
      end={end}
      onTimeChange={onTimeChange}
      onRefresh={onRefresh}
      width={width}
      compressed={compressed}
    />
  );
};
