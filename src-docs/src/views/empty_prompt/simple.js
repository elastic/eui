import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    title={<h2>You have no spice</h2>}
    actions={[
      <EuiButtonEmpty color="danger">Sabotage all spice fields</EuiButtonEmpty>,
      <EuiButton color="primary" fill>Harvest spice</EuiButton>,
    ]}
  />
);
