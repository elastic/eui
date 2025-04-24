import React from 'react';
import { useEuiTheme, EuiPanel } from '../../../../../src';

export default () => {
  const { highContrastMode, euiTheme } = useEuiTheme();

  return (
    <EuiPanel
      hasBorder={!!highContrastMode}
      css={highContrastMode ? { border: euiTheme.border.thick } : {}}
    >
      This panel will have a thick border in high contrast mode.
    </EuiPanel>
  );
};
