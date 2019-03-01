import React from 'react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <EuiFlexGrid columns={3}>
      <EuiFlexItem>
        <div>One</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Two</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Three</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Four</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Five</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Six</div>
      </EuiFlexItem>
      <EuiFlexItem>
        <div>Seven</div>
      </EuiFlexItem>
    </EuiFlexGrid>
  </div>
);
