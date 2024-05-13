import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components';

export default () => (
  <EuiFlexGroup justifyContent="spaceEvenly">
    <EuiFlexItem grow={false}>Spaced evenly between this one.</EuiFlexItem>
    <EuiFlexItem grow={false}>And this one here on the right.</EuiFlexItem>
  </EuiFlexGroup>
);
