import React from 'react';

import { EuiEmptyPrompt, EuiLoadingLogo } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    icon={<EuiLoadingLogo logo="logoKibana" size="xl" />}
    title={<h2>Loading Dashboards</h2>}
  />
);
