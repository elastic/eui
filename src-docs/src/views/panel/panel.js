import React from 'react';

import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiPanel paddingSize="none">
      <EuiCode>paddingSize=&quot;none&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l" />

    <EuiPanel paddingSize="s">
      <EuiCode>paddingSize=&quot;s&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l" />

    <EuiPanel paddingSize="m">
      <EuiCode>paddingSize=&quot;m&quot; (default)</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l" />

    <EuiPanel paddingSize="l">
      <EuiCode>paddingSize=&quot;l&quot;</EuiCode>
    </EuiPanel>
  </div>
);
