import React from 'react';
import {
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
  useEuiTheme,
} from '../../../../../src';

export default () => {
  const { colorMode } = useEuiTheme();
  return (
    <>
      <EuiText>
        <p>
          EUI&apos;s Sass themes are token based, which can be altered to suit
          your theming needs like changing the primary color. Simply declare
          your token overrides before importing the whole EUI theme.
        </p>
        <p>
          You no longer need to import the compiled CSS or Sass globals
          seperately when using this import method; but{' '}
          <strong>it will re-compile all of the EUI components</strong>.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiCodeBlock language="scss" fontSize="m" isCopyable>
        {`// mytheme.scss
$euiColorPrimary: #7B61FF;

// The following rebuilds the entire EUI component styles
${
  colorMode === 'DARK'
    ? "@import '@elastic/eui/src/themes/amsterdam/theme_dark';"
    : "@import '@elastic/eui/src/themes/amsterdam/theme_light';"
}

@import 'your/custom/styles';`}
      </EuiCodeBlock>
    </>
  );
};
