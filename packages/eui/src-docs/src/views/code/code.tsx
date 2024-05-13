import React from 'react';

import { EuiCode, EuiText } from '../../../../src/components';

const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

export default () => (
  <EuiText>
    <p>
      Sometimes you need to emphasize <EuiCode>code</EuiCode> like this.
    </p>
    <p>
      You can also pass a language in like{' '}
      <EuiCode language="html">{htmlCode.trim()}</EuiCode>.
    </p>
    <p>
      Make the background transparent like this{' '}
      <EuiCode language="html" transparentBackground>
        {htmlCode.trim()}
      </EuiCode>
      .
    </p>
  </EuiText>
);
