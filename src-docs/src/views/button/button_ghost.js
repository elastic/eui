import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);

  const onToggle0Change = () => {
    setToggle0On((isOn) => !isOn);
  };

  return (
    <EuiFlexGroup wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton color="ghost" onClick={() => {}}>
          Ghost
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          fill
          color="ghost"
          size="s"
          iconType="check"
          onClick={() => {}}
        >
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty size="s" color="ghost" onClick={() => {}}>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          size="s"
          color="ghost"
          iconType="user"
          onClick={() => {}}
          aria-label="Your account"
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="ghost" isLoading fill size="s">
          Loading&hellip;
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton color="ghost" isLoading>
          Loading&hellip;
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="ghost"
          isSelected={toggle0On}
          fill={toggle0On}
          onClick={onToggle0Change}
        >
          Toggle me
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
