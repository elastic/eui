import React, { FunctionComponent, ReactNode } from 'react';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiText } from '../../../../src/components/text';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';

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
