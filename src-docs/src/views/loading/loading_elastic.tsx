import React from 'react';

import { EuiLoadingElastic } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingElastic />
    &emsp;
    <EuiLoadingElastic size="l" />
    &emsp;
    <EuiLoadingElastic size="xl" />
    &emsp;
    <EuiLoadingElastic size="xxl" />
  </div>
);
