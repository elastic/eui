import React from 'react';

import { EuiCodeBlock, useEuiTheme, isLegacyTheme } from '../../../../src';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const isLegacy = isLegacyTheme(euiTheme.themeName);

  return (
    <EuiCodeBlock language="tsx" fontSize="m" isCopyable>
      {`import { EuiProvider } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider${isLegacy ? ' theme={null}' : ''}${
        colorMode === 'DARK' ? ' colorMode="dark"' : ''
      }>
    {/* Content */}
  </EuiProvider>
);`}
    </EuiCodeBlock>
  );
};
