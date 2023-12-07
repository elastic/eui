import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCodeBlock,
  useEuiTheme,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiCallOut,
} from '../../../../../src';

type AppSetup = {};

export const AppSetup: FunctionComponent<AppSetup> = ({}) => {
  const { colorMode } = useEuiTheme();

  const appSetup = (
    <EuiCodeBlock language="jsx" isCopyable fontSize="m">
      {`import React from 'react';
import '@elastic/eui/dist/eui_theme_${colorMode.toLowerCase()}.css';

import { EuiProvider, EuiText } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider colorMode="${colorMode.toLowerCase()}">
    <EuiText><p>Hello World!</p></EuiText>
  </EuiProvider>
);

export default MyApp;`}
    </EuiCodeBlock>
  );

  return (
    <>
      <EuiCallOut color="warning">
        <p>
          While EUI is in the process of converting from a Sass based theme to
          CSS-in-JS via Emotion. We require that both the{' '}
          <Link to="/utilities/provider">
            <strong>EuiProvider</strong>
          </Link>{' '}
          <strong>and</strong> the compiled CSS (or raw Sass) files be imported
          during this transition.
        </p>
      </EuiCallOut>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          EUI provides a general context provider to handle global aspects like
          light and dark theme. You can import these default themes through
          their respective compiled CSS files. Use the{' '}
          <EuiCode>.min.css</EuiCode> file extension for the minified version.
        </p>
      </EuiText>

      <EuiSpacer />
      {appSetup}
      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          For the dark theme, you can swap the words <EuiCode>light</EuiCode>{' '}
          for <EuiCode>dark</EuiCode>. <br />
          For more configuration options of the provider, see the{' '}
          <Link to="/utilities/provider">EuiProvider documentation</Link>.
        </p>
      </EuiText>
    </>
  );
};
