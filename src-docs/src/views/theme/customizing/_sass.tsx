import React, { useContext } from 'react';
import {
  EuiSpacer,
  EuiCallOut,
  EuiText,
  EuiLink,
  EuiCodeBlock,
} from '../../../../../src';

// @ts-ignore Importing from JS
import { ThemeContext } from '../../../components/with_theme';

export const SassAlert = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext.theme.includes('legacy') ? (
    <></>
  ) : (
    <EuiCallOut color="warning">
      <p>
        EUI is transitioning to a CSS-in-JS solution for theming and so this
        method of overriding the theme will only affect components that are
        still Sass-based. To track this effort, subscribe to the{' '}
        <EuiLink href="https://github.com/elastic/eui/issues/3912">
          Meta ticket
        </EuiLink>
        .
      </p>
    </EuiCallOut>
  );
};

const ImportCustomizableExample = () => {
  const themeContext = useContext(ThemeContext);
  let files;
  switch (themeContext.theme) {
    case 'light':
      files = "@import '@elastic/eui/src/themes/legacy/legacy_light';";
      break;
    case 'dark':
      files = "@import '@elastic/eui/src/themes/legacy/legacy_dark';";
      break;
    case 'amsterdam-dark':
      files = "@import '@elastic/eui/src/themes/amsterdam/theme_dark';";
      break;
    default:
      files = "@import '@elastic/eui/src/themes/amsterdam/theme_light';";
      break;
  }

  return (
    <>
      <EuiCodeBlock language="scss" paddingSize="m" fontSize="m" isCopyable>
        {`// mytheme.scss
$euiColorPrimary: #7B61FF;

${files}`}
      </EuiCodeBlock>
    </>
  );
};

export default () => {
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
      <ImportCustomizableExample />
    </>
  );
};
