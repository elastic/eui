import React from 'react';

import { EuiToast } from '../../../../src/components';

export default () => (
  <div>
    <EuiToast
      title="Example of a good toast"
      onClose={() => window.alert('Dismiss toast')}>
      <p>
        A good toast message is short and to the point. It should very rarely
        include multiple paragraphs.
      </p>
    </EuiToast>
  </div>
);
