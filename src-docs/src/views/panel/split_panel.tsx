import React from 'react';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

import { EuiSplitPanel } from '../../../../src/components/panel';
import { EuiText } from '../../../../src/components/text';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiSplitPanel.Outer grow>
        <EuiSplitPanel.Inner>
          <EuiText>
            <p>Top panel</p>
          </EuiText>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner grow color="subdued">
          <EuiText>
            <p>Bottom panel</p>
          </EuiText>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiSplitPanel.Outer>
        <EuiSplitPanel.Inner>
          <EuiText>
            <p>Top panel</p>
          </EuiText>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner color="subdued">
          <EuiText>
            <p>Middle panel</p>
          </EuiText>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner color="danger">
          <EuiText>
            <p>Danger panel</p>
          </EuiText>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </EuiFlexItem>
  </EuiFlexGroup>
);
