import React from 'react';

import {
  EuiBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge iconType="check">
      Primary
    </EuiBadge>

    <EuiBadge color="primary" iconType="cross" iconSide="right">
      Secondary
    </EuiBadge>
  </div>
);
