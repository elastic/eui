import React from 'react';

import {
  EuiSkeletonAvatar,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiSkeletonAvatar type="avatar" size="s" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonAvatar type="avatar" size="m" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonAvatar type="avatar" size="l" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonAvatar type="avatar" size="xl" />
    </EuiFlexItem>

  </EuiFlexGroup>
);
