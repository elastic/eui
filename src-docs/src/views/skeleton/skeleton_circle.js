import React from 'react';

import {
  EuiSkeletonCircle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle size="s" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle size="m" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle size="l" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle size="xl" />
    </EuiFlexItem>

  </EuiFlexGroup>
);
