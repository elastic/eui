import React from 'react';

import { EuiToast } from '../../../../src/components';

export default () => (
  <EuiToast title="Icons should be rare" type="info" onClose={() => {}}>
    <p>
      Icons should be used rarely. They are good for warnings, but when paired
      with long titles they look out of place.
    </p>
  </EuiToast>
);
