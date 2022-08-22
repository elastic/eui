import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';
import { EuiThemeProvider } from '../../../../src/services';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);

  const onToggle0Change = () => {
    setToggle0On((isOn) => !isOn);
  };

  return (
    <EuiThemeProvider colorMode="dark">
      <EuiPanel borderRadius="none" hasShadow={false} color="subdued">
        <EuiFlexGroup wrap gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton color="text" onClick={() => {}}>
              Ghost
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton
              fill
              color="text"
              size="s"
              iconType="check"
              onClick={() => {}}
            >
              Filled
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonEmpty size="s" color="text" onClick={() => {}}>
              small
            </EuiButtonEmpty>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              size="s"
              color="text"
              iconType="user"
              onClick={() => {}}
              aria-label="Your account"
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton color="text" isLoading fill size="s">
              Loading&hellip;
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton color="text" isLoading>
              Loading&hellip;
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton
              color="text"
              isSelected={toggle0On}
              fill={toggle0On}
              onClick={onToggle0Change}
            >
              Toggle me
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiThemeProvider>
  );
};
