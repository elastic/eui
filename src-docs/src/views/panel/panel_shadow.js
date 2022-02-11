import React from 'react';
import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  LEGACY_NAME_KEY,
  useEuiTheme,
} from '../../../../src';

export default () => {
  const { euiTheme } = useEuiTheme();
  const isLegacyTheme = euiTheme.themeName.includes(LEGACY_NAME_KEY);

  return (
    <div>
      <EuiPanel hasShadow={false}>
        <EuiCode>{'hasShadow={false}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      {/* This example only works for the default theme. The legacy theme has `hasBorder={true}` by default. */}
      {!isLegacyTheme && (
        <EuiPanel hasBorder={true}>
          <EuiCode>{'hasBorder={true}'}</EuiCode>
        </EuiPanel>
      )}

      {/* This example only matters for the legacy theme. The default theme has `hasBorder={false}` by default. */}
      {isLegacyTheme && (
        <EuiPanel hasShadow={false} hasBorder={false}>
          <EuiCode>{'hasShadow={false} hasBorder={false}'}</EuiCode>
        </EuiPanel>
      )}
    </div>
  );
};
