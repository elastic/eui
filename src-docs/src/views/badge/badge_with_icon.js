import React from 'react';

import { EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge color="hollow" iconType="cross" iconSide="right">
      Hollow
    </EuiBadge>

    <EuiBadge iconType="check">Default</EuiBadge>

    <EuiBadge iconType="returnKey" />
  </div>
);
