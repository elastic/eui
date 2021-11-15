import React, { useState, Fragment } from 'react';

import {
  EuiSuperDatePicker,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [showIconOnly, setShowIconOnly] = useState(false);
  const [showFill, setShowFill] = useState(true);

  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }) => {
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
      &emsp;
      <EuiSwitch
        label="Fill"
        onChange={toggleShowFill}
        checked={showFill}
        disabled={!showUpdateButton}
      />
      &emsp;
      <EuiSwitch
        label="Icon only"
        onChange={toggleShowIconOnly}
        checked={showIconOnly}
        disabled={!showUpdateButton}
      />
      <EuiSpacer />
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        recentlyUsedRanges={recentlyUsedRanges}
        showUpdateButton={
          showUpdateButton && showIconOnly ? 'iconOnly' : showUpdateButton
        }
        updateButtonProps={{ fill: showFill }}
      />
      <EuiSpacer />
    </Fragment>
  );
};
