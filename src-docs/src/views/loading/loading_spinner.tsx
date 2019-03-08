import React from 'react';

import { EuiLoadingSpinner } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingSpinner size="s" />
    &nbsp;&nbsp;
    <EuiLoadingSpinner size="m" />
    &nbsp;&nbsp;
    <EuiLoadingSpinner size="l" />
    &nbsp;&nbsp;
    <EuiLoadingSpinner size="xl" />
  </div>
);
