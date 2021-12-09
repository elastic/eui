import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

const htmlCode = `<!-- I'm an example of HTML -->
<h1>Hello world!</h1>
<p>Lorem ipsum dolor sit amet.</p>`;

export default () => (
  <EuiCodeBlock language="html" isCopyable>
    {htmlCode}
  </EuiCodeBlock>
);
