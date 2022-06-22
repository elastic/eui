import React from 'react';

import { EuiScreenReaderStatus, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <p>This is the first paragraph. It is visible to all.</p>
    <EuiScreenReaderStatus statusMessage="User-defined status message" />
    <p>
      This is the third paragraph. If you turn on a screen reader, there is a
      status message between the paragraphs.
    </p>
  </EuiText>
);
