import React from 'react';

import { EuiCodeBlock, EuiCode } from '../../../../src/components';

export default () => (
  <EuiCodeBlock
    language="json"
    fontSize="m"
    paddingSize="m"
    lineNumbers={{
      start: 32,
      highlight: '32, 34-37, 40',
      annotations: {
        34: 'Coordinates can be obtained from Elastic Maps',
        38: (
          <>
            Allowed types: <EuiCode>Point</EuiCode>, <EuiCode>Area</EuiCode>
          </>
        ),
      },
    }}
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
);
