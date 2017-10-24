import React from 'react';

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiPanel paddingSize="none">
      <EuiCode>sizePadding=&quot;none&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l"/>

    <EuiPanel paddingSize="s">
      <EuiCode>sizePadding=&quot;s&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l"/>

    <EuiPanel paddingSize="m">
      <EuiCode>sizePadding=&quot;m&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l"/>

    <EuiPanel paddingSize="l">
      <EuiCode>sizePadding=&quot;l&quot;</EuiCode>
    </EuiPanel>

    <EuiSpacer size="l"/>

    <EuiPanel paddingSize="l" hasShadow>
      <EuiCode>sizePadding=&quot;l&quot;</EuiCode>, <EuiCode>hasShadow</EuiCode>
    </EuiPanel>
  </div>
);
