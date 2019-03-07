import React from 'react';

import { EuiLoadingChart } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingChart size="m" />
    &nbsp;&nbsp;
    <EuiLoadingChart size="l" />
    &nbsp;&nbsp;
    <EuiLoadingChart size="xl" />
    <br />
    <br />
    <EuiLoadingChart size="m" mono />
    &nbsp;&nbsp;
    <EuiLoadingChart size="l" mono />
    &nbsp;&nbsp;
    <EuiLoadingChart size="xl" mono />
  </div>
);
