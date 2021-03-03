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
        // @ts-ignore Needs to be fixed in types
        background: theme.colors.customColorPrimaryHighlight,
        padding: theme.sizes.euiSizeXL,
        // @ts-ignore Needs to be fixed in types
        color: theme.colors.customColorPrimaryText,
      }}>
      <p>
        <EuiIcon
          type="stopFilled"
          // @ts-ignore Needs to be fixed in types
          color={theme.colors.customColorPrimary}
        />{' '}
        {children}
      </p>
    </EuiText>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      light: {
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          ['colors.customColorPrimary'],
          ([customColorPrimary]) => tint(customColorPrimary, 0.8)
        ),
        // Need a global contrast function
        customColorPrimaryText: computed(
          ['colors.customColorPrimary'],
          ([customColorPrimary]) => shade(customColorPrimary, 0.8)
        ),
      },
      dark: {
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          ['colors.customColorPrimary'],
          ([customColorPrimary]) => shade(customColorPrimary, 0.8)
        ),
        // Need a global contrast function
        customColorPrimaryText: computed(
          ['colors.customColorPrimary'],
          ([customColorPrimary]) => tint(customColorPrimary, 0.8)
        ),
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={primaryOverrides}>
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
