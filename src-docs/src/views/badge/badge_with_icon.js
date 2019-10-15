import React from 'react';

import { EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge iconType="check">Default</EuiBadge>

    <EuiBadge isDisabled color="primary" iconType="cross" iconSide="right">
      Primary
    </EuiBadge>
  </div>
);
