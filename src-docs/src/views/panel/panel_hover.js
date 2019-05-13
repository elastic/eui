import React from 'react';

import { EuiPanel } from '../../../../src/components';

export default () => (
  <EuiPanel onClick={() => window.alert('Panel clicked')}>
    <p>Hover me to see my hover state.</p>
  </EuiPanel>
);
