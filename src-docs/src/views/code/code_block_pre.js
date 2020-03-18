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
            isCopyable>
              <div>
              Phasellus posuere quam neque, ac tristique ipsum pulvinar non. Sed ultricies enim nibh, vel ullamcorper tortor commodo sed. Nam ut egestas enim. Pellentesque commodo tempus sapien nec lobortis. Suspendisse suscipit quis lacus quis tincidunt. Aenean pulvinar eros vel felis maximus tristique. Sed rutrum enim quis vestibulum dapibus. Aenean rhoncus iaculis justo, et dapibus magna ultricies non. Etiam non lacus condimentum, commodo erat ut, ultrices ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              </div>
            </EuiCodeBlock>

            <EuiSpacer />
          </div>
        );`}
    </EuiCodeBlock>

    <EuiSpacer />
  </div>
);
