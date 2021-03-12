import React, { FunctionComponent, ReactNode } from 'react';
import { EuiCode } from '../../../../src/components/code';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';
import { COLOR_MODE_KEY } from '../../../../src/services/theme/utils';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={{
        background: euiTheme.colors.lightShade,
        padding: euiTheme[COLOR_MODE_KEY].size.xl,
      }}>
      <p>{children}</p>
    </div>
  );
};

export default () => {
  const overrides = {
    colors: {
      light: { lightShade: '#d3e6df' },
      dark: { lightShade: '#394c4b' },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={overrides}>
        <Box>
          The background of this box is using the locally overridden value of{' '}
          <EuiCode>euiTheme.colors.lightShade</EuiCode>
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
