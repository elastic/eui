import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiCodeBlock
      language="js"
      fontSize="m"
      paddingSize="m"
      color="dark"
      overflowHeight={300}
      whiteSpace="pre"
      isCopyable>
      {`export default () => (
        <div>
          <EuiCodeBlock
            language="js"
            fontSize="m"
            paddingSize="m"
            color="dark"
            overflowHeight={300}
            whiteSpace="pre"
            isCopyable>
              <div>
                In this example, the whiteSpace property is set to pre. All the whitespaces will be kept as is and the text only wraps when line breaks are in the content.
              </div>
            </EuiCodeBlock>

            <EuiSpacer />
          </div>
        );`}
    </EuiCodeBlock>

    <EuiSpacer />
  </div>
);
