import React from 'react';

import {
  EuiSkeletonRect,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiSkeletonRect width="400px" height="200px" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonRect />
    </EuiFlexItem>

  </EuiFlexGroup>
);
