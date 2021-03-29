import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components';

export default () => (
  <EuiFlexGroup alignItems="center">
    <EuiFlexItem grow={false}>
      <p>I</p>
      <p>am</p>
      <p>a</p>
      <p>tall</p>
      <p>item</p>
    </EuiFlexItem>
    <EuiFlexItem>I am vertically centered!</EuiFlexItem>
  </EuiFlexGroup>
);
