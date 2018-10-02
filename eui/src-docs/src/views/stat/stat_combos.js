import React from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="8,888"
            description="Total widgets"
            textAlign="right"
          >
            <EuiIcon type="empty" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="2,000"
            description="Pending widgets"
            titleColor="accent"
            textAlign="right"
          >
            <EuiIcon type="clock" color="accent" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="6,800"
            description="Success widgets"
            titleColor="secondary"
            textAlign="right"
          >
            <EuiIcon type="check" color="secondary" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel>
          <EuiStat
            title="88"
            description="Error widgets"
            titleColor="danger"
            textAlign="right"
          >
            <EuiIcon type="alert" color="danger" />
          </EuiStat>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
