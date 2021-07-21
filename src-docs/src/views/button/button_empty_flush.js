import React from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButtonEmpty flush="left">Flush left</EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty flush="right">Flush right</EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty flush="both">Flush both</EuiButtonEmpty>
    </EuiFlexItem>
  </EuiFlexGroup>
);
