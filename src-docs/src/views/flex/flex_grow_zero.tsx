import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>This item wont grow</EuiFlexItem>
      <EuiFlexItem>But this item will.</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
