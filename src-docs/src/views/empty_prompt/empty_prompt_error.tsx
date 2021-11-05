import React from 'react';

import { EuiEmptyPrompt } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="alert"
    color="danger"
    title={<h2>Error loading Dashboards</h2>}
    body={
      <p>
        There was an error loading the Dashboard application. Contact your
        administrator for help.
      </p>
    }
  />
);
