import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiCodeBlock language="json" fontSize="m" paddingSize="m" lineNumbers>
      {`{
"id": "1",
"rawResponse": {
  "took": 19,
  "timed_out": false and a longer sentence so the line will break,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  }
}`}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="json"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable
      lineNumbers={{ start: 32 }}
    >
      {`"OriginLocation": [
  {
    "coordinates": [
      -97.43309784,
      37.64989853
    ],
    "type": "Point"
  }
],`}
    </EuiCodeBlock>
  </div>
);
