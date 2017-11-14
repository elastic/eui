import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={1}>1</EuiFlexItem>
      <EuiFlexItem grow={2}>2</EuiFlexItem>
      <EuiFlexItem grow={3}>3</EuiFlexItem>
      <EuiFlexItem grow={4}>4</EuiFlexItem>
    </EuiFlexGroup>

    <br/><br/>

    <EuiFlexGroup>
      <EuiFlexItem grow={6}>6</EuiFlexItem>
      <EuiFlexItem grow={3}>3</EuiFlexItem>
      <EuiFlexItem grow={1}>1</EuiFlexItem>
      <EuiFlexItem grow={3}>3</EuiFlexItem>
      <EuiFlexItem grow={6}>6</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
