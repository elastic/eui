import React from 'react';

import {
  EuiSkeletonTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup direction="column">
    <EuiFlexItem>
      <EuiSkeletonTitle size="xxxs" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonTitle size="xxs" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonTitle size="xs" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonTitle size="s" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonTitle size="m" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiSkeletonTitle size="l" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
