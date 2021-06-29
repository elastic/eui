import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const htmlCode = require('!!raw-loader!./code_examples/example.html').default;

const jsCode = require('!!raw-loader!./code_examples/example.js').default;

const sqlCode = require('!!raw-loader!./code_examples/example.sql').default;

export default () => (
  <div>
    <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="html"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {'<div data-src="kbn_canvas.js"></div>'}
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
