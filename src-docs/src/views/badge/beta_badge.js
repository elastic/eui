import React from 'react';

import {
  EuiBetaBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBetaBadge label="Beta" description="This module is not GA. Please help us by reporting any bugs." />
    &emsp;
    <EuiBetaBadge label="Lab" description="This module is not GA. Please help us by reporting any bugs." />
  </div>
);
