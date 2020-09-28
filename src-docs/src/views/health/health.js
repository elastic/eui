import React from 'react';

import { EuiHealth, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiHealth color="subdued">Inactive</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="primary">Active</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="success">Healthy</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="warning">Warning</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="danger">Failure</EuiHealth>

    <EuiSpacer />

    <EuiHealth color="#000000">Custom color as hex</EuiHealth>
  </div>
);
