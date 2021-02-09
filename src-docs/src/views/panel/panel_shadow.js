import React from 'react';

import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src/components';

export default () => {
  return (
    <div>
      <EuiPanel hasShadow={false}>
        <EuiCode>{'hasShadow={false}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      <EuiPanel hasBorder={true}>
        <EuiCode>{'hasBorder={true}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      <EuiPanel hasShadow={false} hasBorder={false}>
        <EuiCode>{'hasShadow={false} hasBorder={false}'}</EuiCode>
      </EuiPanel>
    </div>
  );
};
