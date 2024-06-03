import React from 'react';

import { EuiCodeBlock } from '../../../../src';

export default () => {
  return (
    <>
      <EuiCodeBlock language="jsx" fontSize="m" isCopyable>
        {`import { setEuiDevProviderWarning } from '@elastic/eui';

setEuiDevProviderWarning('warn');`}
      </EuiCodeBlock>

      <p>Examples of apps that would cause warnings:</p>

      <EuiCodeBlock language="jsx" fontSize="m" isCopyable>
        {`const AppWithMissingProvider = () => (
  <EuiPageTemplate>
    {/* Will render, but will warn about missing EuiProvider */}
  </EuiPageTemplate>
);

const App = () => (
  <EuiProvider>
    {/* Content */}
  </EuiProvider>
);
const AppWithDuplicateProvider = () => (
  <EuiProvider>
    {/* Will warn about multiple providers */}
    <App />
  </EuiProvider>
)`}
      </EuiCodeBlock>
    </>
  );
};
