import React from 'react';

import {
  EuiLoadingChart,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiLoadingChart size="medium"/>

    &nbsp;&nbsp;

    <EuiLoadingChart size="large"/>

    &nbsp;&nbsp;

    <EuiLoadingChart size="xLarge"/>

    <br/><br/>

    <EuiLoadingChart mono size="medium"/>

    &nbsp;&nbsp;

    <EuiLoadingChart mono size="large"/>

    &nbsp;&nbsp;

    <EuiLoadingChart mono size="xLarge"/>
  </div>
);

