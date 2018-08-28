import React from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat
          title="1"
          description="Full color"
          titleColor="full"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="10"
          description="Dark color"
          titleColor="dark"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="100"
          description="Primary color"
          titleColor="primary"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="1,000"
          description="Secondary color"
          titleColor="secondary"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="10,000"
          description="Danger color"
          titleColor="danger"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title="100,000"
          description="Accent color"
          titleColor="accent"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
