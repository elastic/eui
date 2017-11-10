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
    <EuiCodeBlock language="html">
      {htmlCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock language="js" fontSize="l" paddingSize="s" color="dark" overflowHeight={300}>
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <div>
      {/* You should probably vertically align your content against the code block for centering. */}
      <span style={{ verticalAlign: 'middle'}}>Inline code with a transparent background: </span>
      <EuiCodeBlock language="html" fontSize="m" inline transparentBackground>
        {htmlCode}
      </EuiCodeBlock>
    </div>

  </div>
);
