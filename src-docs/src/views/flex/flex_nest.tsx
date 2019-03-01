import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/flex';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <div>Flex Group</div>
        <EuiSpacer />
        <EuiFlexGroup>
          <EuiFlexItem>Nested Grid One</EuiFlexItem>
          <EuiFlexItem>Nested Grid Two</EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <div>Flex Grid</div>
        <EuiSpacer />
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
