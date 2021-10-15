import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    title={
      <h2>
        Ready to try Kibana?
        <br />
        First you need data.
      </h2>
    }
    actions={[
      <EuiButton color="primary" fill iconType="database">
        Add integration
      </EuiButton>,
      <EuiButtonEmpty color="text" iconType="document">
        Upload a file
      </EuiButtonEmpty>,
      <EuiButtonEmpty color="text" iconType="heatmap">
        Add sample data
      </EuiButtonEmpty>,
    ]}
  />
);
