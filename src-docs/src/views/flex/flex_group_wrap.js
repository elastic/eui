import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup wrap>
    <EuiFlexItem style={{ minWidth: 300 }}>
      Min-width 300px
    </EuiFlexItem>

    <EuiFlexItem style={{ minWidth: 300 }}>
      Min-width 300px
    </EuiFlexItem>

    <EuiFlexItem style={{ minWidth: 300 }}>
      Min-width 300px
    </EuiFlexItem>
  </EuiFlexGroup>
);
