import React from 'react';

import { EuiLoadingKibana } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingKibana size="m" />
    <EuiLoadingKibana size="l" />
    <EuiLoadingKibana size="xl" />
  </div>
);
