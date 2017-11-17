import React from 'react';

import {
  EuiBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge iconType="help">
      Primary
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="primary" iconType="user" iconSide="right">
      Secondary
    </EuiBadge>
  </div>
);
