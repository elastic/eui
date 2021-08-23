import React, { FunctionComponent, ReactNode } from 'react';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
import { EuiText } from '../../../../src/components/text';
import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiText
      css={{
        background: euiTheme.colors.highlight,
        padding: euiTheme.size.xl,
        color: euiTheme.colors.primaryText,
      }}
    >
      <p>
        <EuiIcon type="stopFilled" color={euiTheme.colors.primary} /> {children}
      </p>
    </EuiText>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      LIGHT: {
        primary: '#db1dde',
      },
      DARK: {
        primary: '#e378e4',
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={primaryOverrides}>
        <Box>
          The <EuiCode>colors.primary</EuiCode> value has been changed to{' '}
          <EuiCode>#db1dde</EuiCode> (<EuiCode>#e378e4</EuiCode> for dark mode)
          and so the calculated value of <EuiCode>colors.primaryText</EuiCode>{' '}
          has also been updated.
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
