import React from 'react';

import {
  EuiSkeletonRectangle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    {/* <EuiFlexItem grow={false}>
      <EuiSkeletonRectangle width="12px" height="24px" borderRadius="none" />
    </EuiFlexItem> */}

    <EuiFlexItem grow={false}>
      <EuiSkeletonRectangle width="18px" height="18px" borderRadius="s" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonRectangle width="86px" height="32px" borderRadius="m" />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiSkeletonRectangle width="130px" height="130px" borderRadius="none" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
