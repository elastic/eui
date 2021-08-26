import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <div>
    <EuiCodeBlock
      language="jsx"
      fontSize="m"
      paddingSize="m"
      color="dark"
      overflowHeight={300}
      whiteSpace="pre"
      isCopyable
    >
      {`export default () => (
  <div>In this example, the whiteSpace property is set to pre. All the whitespaces will be kept as is and the text only wraps when line breaks are in the content.</div>
);`}
    </EuiCodeBlock>
  </div>
);
