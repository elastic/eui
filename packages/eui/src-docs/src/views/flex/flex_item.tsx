import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiButton fill>Buttons will widen</EuiButton>
    </EuiFlexItem>
    <EuiFlexItem>
      <div>
        <EuiButton fill>Unless you wrap them</EuiButton>
      </div>
    </EuiFlexItem>
  </EuiFlexGroup>
);
