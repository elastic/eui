import React from 'react';

import {
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

const jsCode = require('!!raw-loader!./code_block');

export default () => (
  <div>
    <EuiCodeBlock language="html" fontSize="l">
      {htmlCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock language="js" color="light" overflowHeight={300}>
      {jsCode}
    </EuiCodeBlock>
  </div>
);
