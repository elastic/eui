import React from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButtonEmpty flush="left">Flush left</EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty flush="right">Flush right</EuiButtonEmpty>
    </EuiFlexItem>
  </EuiFlexGroup>
);
