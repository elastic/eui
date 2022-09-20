import React from 'react';

import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs">
    <EuiFlexItem grow={false}>
      <EuiBadge color="success">Healthy</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="warning">Warning</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="danger">Critical</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="default">Unknown</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
