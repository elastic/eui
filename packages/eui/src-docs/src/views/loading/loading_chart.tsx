import React from 'react';

import { EuiLoadingChart } from '../../../../src';

export default () => (
  <div>
    <EuiLoadingChart size="m" />
    &nbsp;&nbsp;
    <EuiLoadingChart size="l" />
    &nbsp;&nbsp;
    <EuiLoadingChart size="xl" />
  </div>
);
