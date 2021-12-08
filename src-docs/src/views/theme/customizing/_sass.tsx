import React, { useContext } from 'react';
import { EuiSpacer, EuiCallOut, EuiText, EuiLink } from '../../../../../src';

// @ts-ignore Importing from JS
import { ThemeContext } from '../../../components/with_theme';
import { CustomizeTokens } from '../../guidelines/getting_started/_customize_tokens';

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
      <CustomizeTokens />
    </>
  );
};
