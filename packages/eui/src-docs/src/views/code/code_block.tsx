import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const jsCode = `/* I'm an example of JS */
import React from 'react';`;

export default () => (
  <>
    <EuiCodeBlock language="jsx" fontSize="m" paddingSize="m">
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock language="jsx" paddingSize="none" transparentBackground>
      {jsCode}
    </EuiCodeBlock>
  </>
);
