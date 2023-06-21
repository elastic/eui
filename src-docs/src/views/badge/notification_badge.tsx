import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiNotificationBadge,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s">
    <EuiFlexItem grow={false}>
      <EuiNotificationBadge>3</EuiNotificationBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiNotificationBadge color="success">3</EuiNotificationBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
