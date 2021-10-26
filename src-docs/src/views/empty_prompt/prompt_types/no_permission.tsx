import React from 'react';

import { EuiEmptyPrompt, EuiButton } from '../../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="lock"
    title={<h2>Contact your administrator for access</h2>}
    body={<p>To view cases in this space, you need additional privileges.</p>}
    actions={
      <EuiButton color="primary" fill>
        Go home
      </EuiButton>
    }
  />
);
