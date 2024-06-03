import React from 'react';

import { EuiStat, EuiFlexItem, EuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat title="$ 1,000.00" description="Left align" textAlign="left" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="99.9999"
          description="Center align"
          textAlign="center"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="1,000.00 €"
          description="Right align"
          textAlign="right"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
