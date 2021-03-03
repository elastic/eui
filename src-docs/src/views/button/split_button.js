import React from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <>
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton size="s" iconType="calendar">
          Last 15 min
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          size="s"
          iconType="boxesVertical"
          aria-label="More"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
