import React from 'react';

import { EuiEmptyPrompt } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="error"
    color="danger"
    title={<h2>Unable to load your dashboards</h2>}
    body={
      <p>
        There was an error loading the Dashboard application. Contact your
        administrator for help.
      </p>
    }
  />
);
