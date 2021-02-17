import React from 'react';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiSplitPanel } from '../../../../src/components/panel';
import { EuiText } from '../../../../src/components/text';
import { EuiCode } from '../../../../src/components/code';

export default () => (
  <>
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiSplitPanel.Outer grow={false}>
          <EuiSplitPanel.Inner>
            <EuiText>
              <p>
                Outer panel has <EuiCode>{'grow={false}'}</EuiCode>
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner grow={false} color="subdued">
            <EuiText>
              <p>Bottom panel</p>
            </EuiText>
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiSplitPanel.Outer grow>
          <EuiSplitPanel.Inner>
            <EuiText>
              <p>Top panel</p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner grow={false} color="subdued">
            <EuiText>
              <p>
                Bottom panel has <EuiCode>{'grow={false}'}</EuiCode>
              </p>
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
    <EuiSpacer />
    <EuiSplitPanel.Outer direction="row">
      <EuiSplitPanel.Inner>
        <EuiText>
          <p>Left panel</p>
          <p>Has more content</p>
        </EuiText>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued">
        <EuiText>
          <p>Right panel</p>
        </EuiText>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  </>
);
