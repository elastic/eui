import React, { FunctionComponent, ReactNode } from 'react';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={{
        background: euiTheme.colors.euiColorLightShade,
        padding: euiTheme.sizes.euiSizeXL,
        color: euiTheme.colors.euiTextColor,
      }}>
      <p>{children}</p>
    </div>
  );
};

export default () => {
  return (
    <div>
      <EuiThemeProvider colorMode="light">
        <Box>
          <EuiIcon type="faceHappy" /> The colors of this box are will always be
          in <strong>light</strong> mode
        </Box>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="dark">
        <Box>
          <EuiIcon type="faceHappy" /> The colors of this box are will always be
          in <strong>dark</strong> mode
        </Box>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="inverse">
        <Box>
          <EuiIcon type="faceHappy" /> The colors of this box are the opposite (
          <strong>inverse</strong>) of the current color mode
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
