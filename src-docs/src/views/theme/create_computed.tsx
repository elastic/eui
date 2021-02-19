import React, { FunctionComponent, ReactNode } from 'react';
import { tint, shade } from '../../../../src/services/theme/theme';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
import { EuiText } from '../../../../src/components/text';
import {
  computed,
  EuiThemeProvider,
  useEuiTheme,
} from '../../../../src/services';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [theme] = useEuiTheme();

  return (
    <EuiText
      css={{
        background: theme.colors.euiColorHighlight,
        padding: theme.sizes.euiSizeXL,
        color: theme.colors.euiColorPrimaryText,
      }}>
      <p>
        <EuiIcon type="faceSad" color={theme.colors.euiColorPrimary} />{' '}
        {children}
      </p>
    </EuiText>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      light: {
        euiColorPrimary: 'rgb(29, 222, 204)',
        // Just waiting for this ability to be merged first
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => tint(euiColorPrimary, 0.8)
        ),
        // Need a global contrast function
        customColorPrimaryText: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => shade(euiColorPrimary, 0.8)
        ),
      },
      dark: {
        euiColorPrimary: 'rgb(29, 222, 204)',
        // Just waiting for this ability to be merged first
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => shade(euiColorPrimary, 0.8)
        ),
        // Need a global contrast function
        customColorPrimaryText: computed(
          ['colors.euiColorPrimary'],
          ([euiColorPrimary]) => tint(euiColorPrimary, 0.8)
        ),
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider overrides={primaryOverrides}>
        <Box>
          A new key of <EuiCode>customColorPrimary</EuiCode> has been added as
          <EuiCode>rgb(29, 222, 204)</EuiCode>.
          <br />
          <br />
          There is also two new computed color keys create off of this for
          better contrast.
        </Box>
      </EuiThemeProvider>
    </div>
  );
};
