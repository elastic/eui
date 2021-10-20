import React, { FunctionComponent } from 'react';
import { EuiCodeBlock, useEuiTheme, isLegacyTheme } from '../../../../../src';

type AppSetup = {};

export const AppSetup: FunctionComponent<AppSetup> = ({}) => {
  const {
    euiTheme: { themeName },
    colorMode,
  } = useEuiTheme();
  const legacyTheme = isLegacyTheme(themeName);

  return legacyTheme ? (
    <EuiCodeBlock language="jsx" isCopyable fontSize="m">
      {`import React from 'react';
// This is the legacy theme and will be deprecated
import '@elastic/eui/dist/eui_legacy_${colorMode.toLowerCase()}.css';

const MyApp = () => ();`}
    </EuiCodeBlock>
  ) : (
    <EuiCodeBlock language="jsx" isCopyable fontSize="m">
      {`import React from 'react';
import '@elastic/eui/dist/eui_theme_${colorMode.toLowerCase()}.css';

import { EuiProvider } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider colorMode="${colorMode.toLowerCase()}">
    {app}
  </EuiProvider>
);`}
    </EuiCodeBlock>
  );
};
