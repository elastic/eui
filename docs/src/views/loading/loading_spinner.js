import React from 'react';

import {
  EuiLoadingSpinner,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiLoadingSpinner size="small"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="medium"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="large"/>

    &nbsp;&nbsp;

    <EuiLoadingSpinner size="xLarge"/>
  </div>
);

