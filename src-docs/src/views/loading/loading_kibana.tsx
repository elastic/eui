import React from 'react';

import { EuiLoadingLogo } from '../../../../src/components/loading';

export default () => (
  <div>
    <EuiLoadingLogo />
    &emsp;
    <EuiLoadingLogo logo="logoObservability" size="l" />
    &emsp;
    <EuiLoadingLogo logo="logoSecurity" size="xl" />
  </div>
);
