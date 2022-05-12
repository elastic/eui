import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <EuiCodeBlock
    language="json"
    fontSize="m"
    paddingSize="m"
    lineNumbers={{ start: 32, highlight: '32, 34-37, 40' }}
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
