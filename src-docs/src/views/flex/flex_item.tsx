import React from 'react';
import { EuiButton } from '../../../../src/components/button';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiButton>Buttons will widen</EuiButton>
    </EuiFlexItem>
    <EuiFlexItem>
      <div>
        <EuiButton>Unless you wrap them</EuiButton>
      </div>
    </EuiFlexItem>
  </EuiFlexGroup>
);
