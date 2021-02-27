import React, { useContext } from 'react';

import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src/components';
import { ThemeContext } from '../../components';

export default () => {
  const themeContext = useContext(ThemeContext);
  const isAmsterdamTheme = themeContext.theme.includes('amsterdam');

  return (
    <div>
      <EuiPanel hasShadow={false}>
        <EuiCode>{'hasShadow={false}'}</EuiCode>
      </EuiPanel>

      <EuiSpacer />

      {/* This example only works for the Amsterdam theme. The default theme has `hasBorder={true}` by default. */}
      {isAmsterdamTheme && (
        <>
          <EuiPanel hasBorder={true}>
            <EuiCode>{'hasBorder={true}'}</EuiCode>
          </EuiPanel>
          <EuiSpacer />
        </>
      )}

      <EuiPanel hasShadow={false} hasBorder={false}>
        <EuiCode>{'hasShadow={false} hasBorder={false}'}</EuiCode>
      </EuiPanel>
    </div>
  );
};
