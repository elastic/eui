import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCodeBlock,
  useEuiTheme,
  isLegacyTheme,
  EuiCode,
  EuiSpacer,
  EuiText,
} from '../../../../../src';

type AppSetup = {};

export const AppSetup: FunctionComponent<AppSetup> = ({}) => {
  const {
    euiTheme: { themeName },
    colorMode,
  } = useEuiTheme();
  const legacyTheme = isLegacyTheme(themeName);

  const appSetup = legacyTheme ? (
    <EuiCodeBlock language="jsx" isCopyable fontSize="m">
      {`import React from 'react';
// This is the legacy theme and will be deprecated
import '@elastic/eui/dist/eui_legacy_${colorMode.toLowerCase()}.css';

const MyApp = ({ Page }) => ( <Page /> );`}
    </EuiCodeBlock>
  ) : (
    <EuiCodeBlock language="jsx" isCopyable fontSize="m">
      {`import React from 'react';
import '@elastic/eui/dist/eui_theme_${colorMode.toLowerCase()}.css';

import { EuiProvider } from '@elastic/eui';

const MyApp = ({ Page }) => (
  <EuiProvider colorMode="${colorMode.toLowerCase()}">
    <Page />
  </EuiProvider>
);`}
    </EuiCodeBlock>
  );

  return (
    <>
      <EuiText grow={false}>
        {!legacyTheme && (
          <p>
            EUI provides a general context provider to handle global aspects
            like theming. While EUI is in the process of converting from a Sass
            based theme to CSS-in-JS via Emotion. We require that both the{' '}
            <Link to="/utilities/provider">
              <strong>EuiProvider</strong>
            </Link>{' '}
            <strong>and</strong> the compiled CSS (or raw Sass) files be
            imported during this transition.
          </p>
        )}
        <p>
          EUI builds with both a light and dark theme. You can import these
          default themes through their respective compiled CSS files. Use the{' '}
          <EuiCode>.min.css</EuiCode> file extension for the minified version.
        </p>
      </EuiText>

      <EuiSpacer />
      {appSetup}
      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          For the dark theme, you can swap the words <EuiCode>light</EuiCode>{' '}
          for <EuiCode>dark</EuiCode>.{' '}
          {!legacyTheme && (
            <>
              For more configuration options of the provider, see the{' '}
              <Link to="/utilities/provider">EuiProvider documentation</Link>.
            </>
          )}
        </p>
      </EuiText>
    </>
  );
};
