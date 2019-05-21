import React from 'react';

import { EuiToast } from '../../../../src/components';

export default () => (
  <EuiToast
    title="Icons should be rare"
    onClose={() => window.alert('Dismiss toast')}>
    <p>
      Icons should be used rarely. They are good for warnings, but when paired
      with long titles they look out of place.
    </p>
  </EuiToast>
);
