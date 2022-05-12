import React from 'react';

import { EuiCodeBlock, useEuiTheme } from '../../../../src';

export default () => {
  const { colorMode } = useEuiTheme();

  return (
    <EuiCodeBlock language="tsx" fontSize="m" isCopyable>
      {`import { EuiProvider } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider${colorMode === 'DARK' ? ' colorMode="dark"' : ''}>
    {/* Content */}
  </EuiProvider>
);`}
    </EuiCodeBlock>
  );
};
