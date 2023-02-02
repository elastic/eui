import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

import { EuiCodeBlockAnnotationButton } from '../../../../src/components/code/code_block_annotation_button';

export default () => (
  <>
    <EuiCodeBlockAnnotationButton />
    <EuiSpacer />
    <EuiCodeBlock
      language="json"
      fontSize="m"
      paddingSize="m"
      lineNumbers={{
        highlight: '7, 8, 9',
        annotations: {
          3: (
            <>
              The <strong>shard</strong> is the unit at which Elasticsearch
              distributes data around the cluster.
            </>
          ),
          5: 'Some quick popover text',
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
  </>
);
