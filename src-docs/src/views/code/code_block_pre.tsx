import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <EuiCodeBlock
    language="jsx"
    fontSize="m"
    paddingSize="m"
    overflowHeight={300}
    isCopyable
    whiteSpace="pre"
  >
    {`export default () => (
  <div>In this example, the whiteSpace property is set to pre. All the whitespaces will be kept as is and the text only wraps when line breaks are in the content.</div>
);`}
  </EuiCodeBlock>
);
