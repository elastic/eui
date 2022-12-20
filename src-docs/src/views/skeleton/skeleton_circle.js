import React from 'react';

import {
  EuiSkeletonCircle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle type="circle" size="s" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle type="circle" size="m" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle type="circle" size="l" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonCircle type="circle" size="xl" />
    </EuiFlexItem>

  </EuiFlexGroup>
);
