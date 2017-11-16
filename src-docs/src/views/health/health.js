import React from 'react';

import {
  EuiHealth,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiHealth color="subdued">
      Unknown
    </EuiHealth>

    <EuiHealth color="success">
      Healthy
    </EuiHealth>

    <EuiHealth color="warning">
      Warning
    </EuiHealth>

    <EuiHealth color="danger">
      Failure
    </EuiHealth>
  </div>
);
