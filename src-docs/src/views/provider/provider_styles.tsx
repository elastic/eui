import React from 'react';

import {
  EuiCodeBlock,
  EuiSpacer,
  useEuiTheme,
  isLegacyTheme,
} from '../../../../src';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const isLegacy = isLegacyTheme(euiTheme.themeName);

  return (
    <>
      <EuiCodeBlock language="html" fontSize="m" isCopyable>
        {!isLegacy
          ? `<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My App</title>
    <meta name="global-style-insert">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
          : `<!-- index.html -->
<!-- No template modifications necessary when using the Legacy theme -->`}
      </EuiCodeBlock>

      <EuiSpacer size="s" />

      <EuiCodeBlock language="jsx" fontSize="m" isCopyable>
        {`// App.js
import { EuiProvider } from '@elastic/eui'
${
  !isLegacy
    ? `import createCache from '@emotion/cache';

const cache = createCache({
  key: 'myApp',
  container: document.querySelector('meta[name="global-style-insert"]'),
});
`
    : ''
}
<EuiProvider${isLegacy ? ' theme={null}' : ''}${
          colorMode === 'DARK' ? ' colorMode="dark"' : ''
        }${!isLegacy ? ' cache={cache}' : ''}>
  {/* Content */}
</EuiProvider>
  `}
      </EuiCodeBlock>
    </>
  );
};
