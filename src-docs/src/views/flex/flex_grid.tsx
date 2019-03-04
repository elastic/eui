import React from 'react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';

const ITEM_STYLE = { width: '300px' };

export default () => (
  <div>
    <EuiFlexGrid>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>One</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Two</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Three</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Four</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Five</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Six</div>
      </EuiFlexItem>
      <EuiFlexItem style={ITEM_STYLE}>
        <div>Seven</div>
      </EuiFlexItem>
    </EuiFlexGrid>
  </div>
);
