import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode } from '../../../../src/components/code';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={{
        background: euiTheme.colors.euiColorLightShade,
        padding: euiTheme.sizes.euiSizeXL,
      }}>
      <p>{children}</p>
    </div>
  );
};

export default () => {
  const overrides = {
    colors: {
      light: { euiColorLightShade: '#d3e6df' },
      dark: { euiColorLightShade: '#394c4b' },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={overrides}>
        <Box>
          The background of this box is using the locally overridden value of{' '}
          <EuiCode>theme.colors.euiColorLightShade</EuiCode>
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
