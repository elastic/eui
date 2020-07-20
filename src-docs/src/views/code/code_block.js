import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const htmlCode = require('!!raw-loader!./code_examples/example.html');

const jsCode = require('!!raw-loader!./code_examples/example.js');

const sqlCode = require('!!raw-loader!./code_examples/example.sql');

export default () => (
  <div>
    <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="js"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="sql"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {sqlCode}
    </EuiCodeBlock>
  </div>
);
