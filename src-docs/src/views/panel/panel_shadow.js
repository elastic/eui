import React from 'react';
import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src';

export default () => {
  return (
    <div>
      <EuiPanel>
        <EuiCode>{`default for current theme`}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      <EuiPanel hasBorder={false}>
        <EuiCode>{'hasBorder={false}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      <EuiPanel hasBorder={false} hasShadow={true}>
        <EuiCode>{`hasBorder={false} hasShadow={true}`}</EuiCode>
      </EuiPanel>
    </div>
  );
};
