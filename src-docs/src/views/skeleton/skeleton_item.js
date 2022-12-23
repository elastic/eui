import React from 'react';

import {
  EuiSkeletonItem,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (

      <EuiFlexGroup>
        {/* <EuiFlexItem grow={false}>
          <EuiSkeletonItem width="12px" height="24px" radius="none" />
        </EuiFlexItem> */}

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem width="18px" height="18px" radius="s" />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem width="86px" height="32px" radius="m" />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem width="130px" height="130px" radius="none" />
        </EuiFlexItem>
      </EuiFlexGroup>

);
