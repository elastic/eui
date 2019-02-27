import React from 'react';

import { EuiScreenReaderOnly } from '../../../../src/components/accessibility/screen_reader';

export default () => (
  <div>
    <p>This is the first paragraph. It is visible to all.</p>
    <EuiScreenReaderOnly>
      <p>
        This is the second paragraph. It is hidden for sighted users but visible
        to screen readers.
      </p>
    </EuiScreenReaderOnly>
    <p>This is the third paragraph. It is visible to all.</p>
  </div>
);
