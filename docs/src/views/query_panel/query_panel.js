import React from 'react';

import {
  EuiQueryPanel,
  EuiQueryPanelBar,
  EuiQueryPanelSearchInput,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiTogglePill,
} from '../../../../src/components';

export default () => (
  <EuiQueryPanel>
    <EuiQueryPanelBar>
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiIcon type="search" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiQueryPanelSearchInput />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiQueryPanelBar>
    <EuiQueryPanelBar>
      <EuiTogglePill active toggleText="on">
        Something
      </EuiTogglePill>
      <EuiTogglePill toggleText="off">
        Something else
      </EuiTogglePill>
    </EuiQueryPanelBar>
  </EuiQueryPanel>
);
