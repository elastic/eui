import React, { useState, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
  OnRefreshProps,
  OnTimeChangeProps,
  useEuiTheme,
} from '../../../../src';

export default () => {
  const { euiTheme } = useEuiTheme();
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [showIconOnly, setShowIconOnly] = useState(false);
  const [showFill, setShowFill] = useState(true);

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

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };

  const toggleShowApplyButton = () => {
    setShowUpdateButton(!showUpdateButton);
  };
  const toggleShowIconOnly = () => {
    setShowIconOnly(!showIconOnly);
  };
  const toggleShowFill = () => {
    setShowFill(!showFill);
  };

  return (
    <Fragment>
      <EuiSwitch
        label="Show update button"
        onChange={toggleShowApplyButton}
        checked={showUpdateButton}
      />
      <EuiSwitch
        label="Fill"
        onChange={toggleShowFill}
        checked={showFill}
        disabled={!showUpdateButton}
        style={{ marginLeft: euiTheme.size.xl }}
      />
      <EuiSwitch
        label="Icon only"
        onChange={toggleShowIconOnly}
        checked={showIconOnly}
        disabled={!showUpdateButton}
        style={{ marginLeft: euiTheme.size.xl }}
      />
      <EuiSpacer />
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        showUpdateButton={
          showUpdateButton && showIconOnly ? 'iconOnly' : showUpdateButton
        }
        updateButtonProps={{ fill: showFill }}
      />
      <EuiSpacer />
    </Fragment>
  );
};
