import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>This item won&rsquo;t grow</EuiFlexItem>
      <EuiFlexItem>But this item will.</EuiFlexItem>
    </EuiFlexGroup>
    <EuiFlexGroup>
      <EuiFlexItem shrink={false}>
        <div style={{ width: 400 }}>This item won&rsquo;t shrink</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div style={{ width: 400 }}>But this item will.</div>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
