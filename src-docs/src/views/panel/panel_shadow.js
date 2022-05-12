import React from 'react';
import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src';

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
    </div>
  );
};
