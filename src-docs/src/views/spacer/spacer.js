import React from 'react';

import {
  EuiSpacer,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>
      <EuiCode>xs</EuiCode>
      <EuiSpacer size="xs" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>s</EuiCode>
      <EuiSpacer size="s" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>m</EuiCode>
      <EuiSpacer size="m" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>l (default)</EuiCode>
      <EuiSpacer />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>xl</EuiCode>
      <EuiSpacer size="xl" />
    </EuiFlexItem>

    <EuiFlexItem>
      <EuiCode>xxl</EuiCode>
      <EuiSpacer size="xxl" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
