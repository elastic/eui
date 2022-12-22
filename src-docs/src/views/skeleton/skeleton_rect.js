import React from 'react';

import {
  EuiSkeletonRect,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiSkeletonRect width="400px" height="200px" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonRect width="200px" height="100px" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonRect width="50px" height="50px" />
    </EuiFlexItem>

  </EuiFlexGroup>
);
