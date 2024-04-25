import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <EuiCodeBlock language="json" fontSize="m" paddingSize="m" lineNumbers>
    {`{
  "id": "1",
  "rawResponse": {
    "took": 19,
    "timed_out": false,
    "_shards": {
      "total": 1,
      "successful": 1,
      "skipped": 0,
      "failed": 0
    }
  }
}`}
  </EuiCodeBlock>
);
