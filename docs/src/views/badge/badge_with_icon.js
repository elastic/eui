import React from 'react';

import {
  KuiBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <KuiBadge iconType="help">
      Primary
    </KuiBadge>

    &nbsp;&nbsp;

    <KuiBadge type="primary" iconType="user" iconSide="right">
      Secondary
    </KuiBadge>
  </div>
);
