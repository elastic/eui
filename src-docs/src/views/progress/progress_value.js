import React, { useState, useEffect } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiProgress,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  let timer;
  const progress = value => {
    if (value > 100) {
      setValue(100);
    } else {
      setValue(value);
      const diff = Math.round(Math.random() * 10);
      timer = setTimeout(() => progress(value + diff), 250);
    }
  };
  const toggleProgress = () => {
    const currentState = showProgress;

    if (!currentState) {
      timer = setTimeout(() => progress(0), 250);
    } else {
      clearTimeout(timer);
      setValue(0);
    }
    setShowProgress(!showProgress);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton size="s" onClick={toggleProgress}>
          Toggle progress
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText>
          <p>{value}</p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiProgress value={value} max={100} size="xs" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
