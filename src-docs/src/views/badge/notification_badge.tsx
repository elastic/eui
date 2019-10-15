import React from 'react';

import { EuiNotificationBadge } from '../../../../src/components/badge/notification_badge';

export default () => (
  <div>
    <EuiNotificationBadge>3</EuiNotificationBadge>
    &emsp;
    <EuiNotificationBadge isDisabled>3</EuiNotificationBadge>
  </div>
);
