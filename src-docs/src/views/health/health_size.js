import React from 'react';

import { EuiHealth, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiHealth size="xs" color="success">
      Extra small
    </EuiHealth>

    <EuiSpacer />

    <EuiHealth color="success">Small (default)</EuiHealth>

    <EuiSpacer />

    <EuiHealth size="m" color="success">
      Medium
    </EuiHealth>
  </div>
);
