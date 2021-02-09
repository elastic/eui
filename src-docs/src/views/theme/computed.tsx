import React, { FunctionComponent, ReactNode } from 'react';
import { tint, shade } from '../../../../src/services/theme/theme';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
import {
  computed,
  EuiThemeProvider,
  useEuiTheme,
} from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [theme] = useEuiTheme();

  return (
    <div
      css={{
        background: theme.colors.euiColorHighlight,
        padding: theme.sizes.euiSizeXL,
        color: theme.colors.euiColorPrimaryText,
      }}>
      <p>
        <EuiIcon type="stopFilled" color={theme.colors.euiColorPrimary} />{' '}
        {children}
      </p>
    </div>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      light: {
        euiColorPrimary: '#db1dde',
        euiColorHighlight: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => tint(euiColorPrimary, 0.8)
        ),
        // Hmm, can't add a custom key?
        euiColorPrimaryBackground: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => tint(euiColorPrimary, 0.8)
        ),
      },
      dark: {
        euiColorPrimary: '#e378e4',
        euiColorHighlight: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => shade(euiColorPrimary, 0.8)
        ),
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider overrides={primaryOverrides}>
        <Box>
          The <EuiCode>euiColorPrimary</EuiCode> color has been changed to{' '}
          <EuiCode>#db1dde</EuiCode> and so in turn has{' '}
          <EuiCode>euiColorPrimaryText</EuiCode>.
          <br />
          <br />
          The background of this div is an adjustment to the{' '}
          <EuiCode>euiColorHighlight</EuiCode> key and is a computed value made
          from the new <EuiCode>euiColorPrimary</EuiCode>.
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
