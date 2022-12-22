import React from 'react';

import {
  EuiSkeletonItem,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup direction='column'>
    <EuiFlexItem>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="xxs" squared />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="xs" squared />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="s" squared />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="m" squared />
        </EuiFlexItem>

      </EuiFlexGroup>
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="xxs" />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="xs" />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="s" />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="m" />
        </EuiFlexItem>

      </EuiFlexGroup>
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSkeletonItem size="customSize" width='36px' height='120px' />
        </EuiFlexItem>

      </EuiFlexGroup>
    </EuiFlexItem>
  </EuiFlexGroup>



);
