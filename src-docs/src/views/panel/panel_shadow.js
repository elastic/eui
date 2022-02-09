import React, { useContext } from 'react';
import { EuiPanel, EuiCode, EuiSpacer, LEGACY_NAME_KEY } from '../../../../src';

import { ThemeContext } from '../../components';

export default () => {
  const themeContext = useContext(ThemeContext);
  const isLegacyTheme = themeContext.theme.includes(LEGACY_NAME_KEY);

  return (
    <div>
      <EuiPanel hasShadow={false}>
        <EuiCode>{'hasShadow={false}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      {/* This example only works for the default theme. The legacy theme has `hasBorder={true}` by default. */}
      {!isLegacyTheme && (
        <>
          <EuiPanel hasBorder={true}>
            <EuiCode>{'hasBorder={true}'}</EuiCode>
          </EuiPanel>
          <EuiSpacer />
        </>
      )}

      <EuiPanel hasBorder={3}>
        <EuiCode>{'hasBorder={3}'}</EuiCode>
      </EuiPanel>

      {/* This example only matters for the legacy theme. The default theme has `hasBorder={false}` by default. */}
      {isLegacyTheme && (
        <>
          <EuiSpacer />

          <EuiPanel hasShadow={false} hasBorder={false}>
            <EuiCode>{'hasShadow={false} hasBorder={false}'}</EuiCode>
          </EuiPanel>
        </>
      )}
    </div>
  );
};
