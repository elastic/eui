import React from 'react';

import { EuiCodeBlock, useEuiTheme } from '../../../../src';

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

      <EuiCodeBlock language="jsx" fontSize="m" isCopyable>
        {`// App.js
import { EuiProvider, euiStylisPrefixer } from '@elastic/eui'
import createCache from '@emotion/cache';

const euiCache = createCache({
  key: 'eui',
  stylisPlugins: [euiStylisPrefixer],
  container: document.querySelector('meta[name="eui-style-insert"]'),
});
euiCache.compat = true;

<EuiProvider${colorMode === 'DARK' ? ' colorMode="dark"' : ''} cache={euiCache}>
  {/* Content */}
</EuiProvider>
  `}
      </EuiCodeBlock>
    </>
  );
};
