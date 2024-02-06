import React, { useState } from 'react';

import {
  EuiSuperDatePicker,
  EuiSpacer,
  EuiFormControlLayoutDelimited,
  EuiFormLabel,
  EuiPanel,
  EuiText,
  OnRefreshProps,
  OnTimeChangeProps,
} from '../../../../src/components';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
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

  const onStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const renderTimeRange = () => {
    return (
      <EuiPanel color="subdued" paddingSize="m">
        <EuiText size="s">
          EuiSuperDatePicker should be resilient to invalid date values. You can
          try to break it with unexpected values here.
        </EuiText>
        <EuiSpacer />
        <EuiFormControlLayoutDelimited
          prepend={<EuiFormLabel>Dates</EuiFormLabel>}
          startControl={
            <input
              onChange={onStartInputChange}
              type="text"
              value={start}
              placeholder="start"
              className="euiFieldText"
            />
          }
          endControl={
            <input
              onChange={onEndInputChange}
              type="text"
              placeholder="end"
              value={end}
              className="euiFieldText"
            />
          }
        />
      </EuiPanel>
    );
  };

  return (
    <>
      {renderTimeRange()}
      <EuiSpacer />
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
      />
    </>
  );
};
