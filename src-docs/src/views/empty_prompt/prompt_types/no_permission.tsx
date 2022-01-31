import React from 'react';

import { EuiEmptyPrompt } from '../../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="lock"
    color="subdued"
    title={<h2>Contact your administrator for access</h2>}
    body={<p>To view cases in this space, you need additional privileges.</p>}
  />
);
