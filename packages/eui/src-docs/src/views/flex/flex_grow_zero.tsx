import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>This item won&rsquo;t grow</EuiFlexItem>
    <EuiFlexItem>But this item will.</EuiFlexItem>
  </EuiFlexGroup>
);
