import React, { FunctionComponent, ReactNode } from 'react';
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiThemeProvider,
  useEuiTheme,
} from '../../../../../src';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiText
      css={{
        background: euiTheme.colors.lightShade,
        padding: euiTheme.size.xl,
        color: euiTheme.colors.text,
      }}
    >
      <p>{children}</p>
    </EuiText>
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
