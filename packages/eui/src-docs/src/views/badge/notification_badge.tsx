import React from 'react';

import { EuiFlexGroup, EuiNotificationBadge } from '../../../../src/components';

export default () => (
  <EuiFlexGroup responsive={false} gutterSize="s">
    <EuiNotificationBadge>1</EuiNotificationBadge>
    <EuiNotificationBadge color="success">2</EuiNotificationBadge>
    <EuiNotificationBadge color="subdued">3</EuiNotificationBadge>
  </EuiFlexGroup>
);
