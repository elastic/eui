import React from 'react';

import { EuiCard, EuiIcon } from '../../../../src/components';

export default () => (
  <div style={{ maxWidth: 350 }}>
    <EuiCard
      layout="horizontal"
      icon={<EuiIcon size="xl" type="logoLogging" />}
      title="Logs"
      display="plain"
      description="The Elastic Stack is the most popular open source logging platform."
    />
  </div>
);
