import React from 'react';

import { EuiStat, EuiFlexItem, EuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat title="1,000,000" description="Large size" titleSize="l" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat title="1,000,000" description="Medium size" titleSize="m" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat title="1,000,000" description="Small size" titleSize="s" />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat
          title="1,000,000"
          description="Extra small size"
          titleSize="xs"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="1,000,000"
          description="Extra extra small size"
          titleSize="xxs"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="1,000,000"
          description="Extra extra extra small size"
          titleSize="xxxs"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
