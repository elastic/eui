import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    title={<h2>Upgrade your license to use Machine Learning</h2>}
    actions={[
      <EuiButton color="primary" fill>
        Upgrade
      </EuiButton>,
      <EuiButtonEmpty color="primary">Start a trial</EuiButtonEmpty>,
    ]}
  />
);
