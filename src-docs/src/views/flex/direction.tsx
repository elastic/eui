import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <EuiFlexGroup direction="column">
    <EuiFlexItem grow={false}>Content grid item</EuiFlexItem>
    <EuiFlexItem grow={false}>Another content grid item</EuiFlexItem>
    <EuiFlexItem grow={false}>Using the column direction</EuiFlexItem>
  </EuiFlexGroup>
);
