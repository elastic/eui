import React from 'react';

import { EuiHealth, EuiSpacer, EuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <EuiHealth textSize="xs" color="success">
      Extra small
    </EuiHealth>

    <EuiSpacer />

    <EuiHealth textSize="s" color="success">
      Small (Default)
    </EuiHealth>

    <EuiSpacer />

    <EuiHealth textSize="m" color="success">
      Medium
    </EuiHealth>

    <EuiSpacer />

    <EuiTitle size="s">
      <h3>
        <EuiHealth textSize="inherit" color="success">
          Inherit
        </EuiHealth>
      </h3>
    </EuiTitle>
  </div>
);
