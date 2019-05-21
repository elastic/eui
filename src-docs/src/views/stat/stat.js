import React from 'react';

import { EuiStat, EuiFlexItem, EuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat title="7,600 mm" description="Total people" />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
