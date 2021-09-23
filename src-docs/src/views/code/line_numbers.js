import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

export default () => (
  <>
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

    <EuiSpacer />

    <EuiCodeBlock
      language="json"
      fontSize="m"
      paddingSize="m"
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
  </>
);
