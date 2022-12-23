import React from 'react';

import {
  EuiSkeletonHeading,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup direction="column">
    <EuiFlexItem>
      <EuiSkeletonHeading size="h3" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonHeading size="h2" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonHeading size="h1" />
    </EuiFlexItem>

  </EuiFlexGroup>
);
