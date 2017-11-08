import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>Group One</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <div>Group Two</div>
        <br/><br/>
        <EuiFlexGrid columns={3}>
          <EuiFlexItem>Nested Grid One</EuiFlexItem>
          <EuiFlexItem>Nested Grid Two</EuiFlexItem>
          <EuiFlexItem>Nested Grid Three</EuiFlexItem>
          <EuiFlexItem>Nested Grid Four</EuiFlexItem>
        </EuiFlexGrid>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
