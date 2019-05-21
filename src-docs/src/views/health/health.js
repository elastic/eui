import React from 'react';

import { EuiHealth, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiHealth color="subdued">Unknown</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="success">Healthy</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="warning">Warning</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="danger">Failure</EuiHealth>
  </div>
);
