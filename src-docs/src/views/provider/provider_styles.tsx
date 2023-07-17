import React from 'react';

import { EuiCodeBlock, EuiSpacer, useEuiTheme } from '../../../../src';

export default () => {
  const { colorMode } = useEuiTheme();

  return (
    <>
      <EuiCodeBlock language="html" fontSize="m" isCopyable>
        {`<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My App</title>
    <meta name="eui-style-insert">
    <link name="compiled-css-here" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`}
      </EuiCodeBlock>

      <EuiSpacer size="s" />

      <EuiCodeBlock language="jsx" fontSize="m" isCopyable>
        {`// App.js
import { EuiProvider } from '@elastic/eui'
import createCache from '@emotion/cache';

const euiCache = createCache({
  key: 'eui',
  container: document.querySelector('meta[name="eui-style-insert"]'),
});
cache.compat = true;

<EuiProvider${colorMode === 'DARK' ? ' colorMode="dark"' : ''} cache={euiCache}>
  {/* Content */}
</EuiProvider>
  `}
      </EuiCodeBlock>
    </>
  );
};
