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
        background: euiTheme.colors.euiFocusBackgroundColor,
        padding: euiTheme.sizes.euiSizeXL,
        color: euiTheme.colors.euiColorPrimaryText,
      }}>
      <p>
        <EuiIcon type="stopFilled" color={euiTheme.colors.euiColorPrimary} />{' '}
        {children}
      </p>
    </EuiText>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      light: {
        euiColorPrimary: '#db1dde',
      },
      dark: {
        euiColorPrimary: '#e378e4',
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={primaryOverrides}>
        <Box>
          The <EuiCode>euiColorPrimary</EuiCode> color has been changed to{' '}
          <EuiCode>#db1dde</EuiCode> (<EuiCode>#e378e4</EuiCode> for dark mode)
          and so the calculated values of <EuiCode>euiColorPrimaryText</EuiCode>{' '}
          and <EuiCode>euiFocusBackgroundColor</EuiCode> have also been updated.
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
