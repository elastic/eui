import React from 'react';

import { EuiLoadingElastic } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingElastic size="m" />
    <EuiLoadingElastic size="l" />
    <EuiLoadingElastic size="xl" />
    <EuiLoadingElastic size="xxl" />
  </div>
);
