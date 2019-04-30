import React from 'react';

import { EuiStat, EuiFlexItem, EuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat title="10,000" description="Description underneath" reverse />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
