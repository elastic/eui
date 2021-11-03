import React, { FunctionComponent, ReactNode } from 'react';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiCode } from '../../../../src/components/code';
import { EuiText } from '../../../../src/components/text';
import {
  computed,
  EuiThemeProvider,
  useEuiTheme,
} from '../../../../src/services';
import { shade, tint } from '../../../../src/services/color';

interface ThemeExtensions {
  colors: {
    customColorPrimary: string;
    customColorPrimaryHighlight: string;
    customColorPrimaryText: string;
  };
}

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme<ThemeExtensions>();

  return (
    <EuiText
      css={{
        background: euiTheme.colors.customColorPrimaryHighlight,
        padding: euiTheme.size.xl,
        color: euiTheme.colors.customColorPrimaryText,
      }}
    >
      <p>
        <EuiIcon type="stopFilled" color={euiTheme.colors.customColorPrimary} />{' '}
        {children}
      </p>
    </EuiText>
  );
};

export default () => {
  const primaryOverrides = {
    colors: {
      LIGHT: {
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          (customColorPrimary) => tint(customColorPrimary, 0.8),
          'colors.customColorPrimary'
        ),
        customColorPrimaryText: computed(
          (customColorPrimary) => shade(customColorPrimary, 0.8),
          'colors.customColorPrimary'
        ),
      },
      DARK: {
        customColorPrimary: 'rgb(29, 222, 204)',
        customColorPrimaryHighlight: computed(
          ([customColorPrimary]) => shade(customColorPrimary, 0.8),
          ['colors.customColorPrimary']
        ),
        customColorPrimaryText: computed(
          ([customColorPrimary]) => tint(customColorPrimary, 0.8),
          ['colors.customColorPrimary']
        ),
      },
    },
  };

  return (
    <div>
      <EuiThemeProvider modify={primaryOverrides}>
        <Box>
          A new key of <EuiCode>customColorPrimary</EuiCode> has been added as{' '}
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
