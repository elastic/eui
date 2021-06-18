import React, { useState } from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiIcon,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(false);

  const onToggleChange = (e) => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title="8,888"
              description="Total widgets"
              textAlign="right"
              isLoading={isLoading}>
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
              isLoading={isLoading}>
              <EuiIcon type="clock" color="accent" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title="6,800"
              description="Success widgets"
              titleColor="success"
              textAlign="right"
              isLoading={isLoading}>
              <EuiIcon type="check" color="success" />
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
              isLoading={isLoading}>
              <EuiIcon type="alert" color="danger" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
