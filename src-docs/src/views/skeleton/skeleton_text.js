import React from 'react';

import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiSkeletonText,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup direction='column'>
    <EuiFlexItem>
      <EuiSkeletonText lines={3} />
    </EuiFlexItem>
  </EuiFlexGroup>
);
