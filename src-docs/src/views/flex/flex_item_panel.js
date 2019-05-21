import React from 'react';

import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiCode,
  EuiText,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiText>
        <p>
          <EuiCode>FlexItem</EuiCode>
        </p>
        <p>A side nav might be in this one.</p>
        <p>And you would want the panel on the right to expand with it.</p>
      </EuiText>
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiPanel>
        <EuiCode>EuiPanel</EuiCode>
      </EuiPanel>
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiPanel grow={false}>
        Another <EuiCode>EuiPanel</EuiCode>, with{' '}
        <EuiCode>grow=&#123;false&#125;</EuiCode>.
      </EuiPanel>
    </EuiFlexItem>
  </EuiFlexGroup>
);
