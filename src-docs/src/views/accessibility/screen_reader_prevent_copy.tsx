import React from 'react';

import { EuiScreenReaderOnly, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <p>This is the first paragraph. It is visible and copyable.</p>
    <EuiScreenReaderOnly preventCopy>
      <p>
        This is the second paragraph. It is hidden for sighted users, and is not
        selectable or copyable by users, but remains visible to screen readers.
      </p>
    </EuiScreenReaderOnly>
    <p>This is the third paragraph. It is visible and copyable.</p>
  </EuiText>
);
