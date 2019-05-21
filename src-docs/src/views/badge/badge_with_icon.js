import React from 'react';

import { EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge iconType="check">Default</EuiBadge>

    <EuiBadge color="primary" iconType="cross" iconSide="right">
      Primary
    </EuiBadge>
  </div>
);
