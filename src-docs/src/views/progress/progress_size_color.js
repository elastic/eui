import React from 'react';

import { EuiProgress, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiProgress value={20} max={100} color="subdued" size="xs" />
    <EuiSpacer size="l" />

    <EuiProgress value={40} max={100} color="accent" size="xs" />
    <EuiSpacer size="l" />

    <EuiProgress value={60} max={100} color="primary" size="s" />
    <EuiSpacer size="l" />

    <EuiProgress value={80} max={100} color="secondary" size="m" />
    <EuiSpacer size="l" />

    <EuiProgress value={90} max={100} color="danger" size="l" />
  </div>
);
