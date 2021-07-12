import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components';

export default () => (
  <EuiFlexGroup justifyContent="spaceBetween">
    <EuiFlexItem grow={false}>One here on the left.</EuiFlexItem>
    <EuiFlexItem grow={false}>The other over here on the right.</EuiFlexItem>
  </EuiFlexGroup>
);
