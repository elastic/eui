import React from 'react';

import { EuiStat, EuiFlexItem, EuiFlexGroup } from '../../../../src/components';

export default () => (
  <EuiFlexGroup wrap>
    <EuiFlexItem grow={false}>
      <EuiStat title="1" description="Default color" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="10" description="Subdued color" titleColor="subdued" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="100" description="Primary color" titleColor="primary" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="100,000" description="Accent color" titleColor="accent" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="1,000" description="Success color" titleColor="success" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="1,000" description="Warning color" titleColor="warning" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiStat title="10,000" description="Danger color" titleColor="danger" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
