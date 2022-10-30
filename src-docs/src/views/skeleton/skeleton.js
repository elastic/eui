import React from 'react';

import {
  EuiSkeleton,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiCode>xs</EuiCode>
      <EuiSkeleton size="xs" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>s</EuiCode>
      <EuiSkeleton size="s" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>m</EuiCode>
      <EuiSkeleton size="m" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>l (default)</EuiCode>
      <EuiSkeleton />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>xl</EuiCode>
      <EuiSkeleton size="xl" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>xxl</EuiCode>
      <EuiSkeleton size="xxl" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
