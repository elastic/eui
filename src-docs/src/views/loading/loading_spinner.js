import React from 'react';

import {
  EuiLoadingSpinner,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiLoadingSpinner size="s"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="m"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="l"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="xl"/>
  </div>
);

