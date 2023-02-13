import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const jsCode = `/* I'm an example of JS */
const myObj = {
  key1: 1,
  key2: 'string value'
  key3: ['val', 'val2', 'val3']
};`;

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
