import React from 'react';

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGroup,
  EuiResizableContainer,
} from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '600px' }} direction="vertical">
    {(Panel, Resizer) => (
      <>
        <Panel
          initialSize={80}
          style={{
            minHeight: '40%',
            padding: '10px',
          }}>
          <EuiFlexGroup direction="column" gutterSize="none">
            <EuiPanel paddingSize="none">
              <EuiCode>paddingSize=&quot;none&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="s">
              <EuiCode>paddingSize=&quot;s&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="m">
              <EuiCode>paddingSize=&quot;m&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="l">
              <EuiCode>paddingSize=&quot;l&quot;</EuiCode>
            </EuiPanel>
          </EuiFlexGroup>
        </Panel>

        <Resizer />

        <Panel initialSize={20} style={{ minHeight: '10%' }} scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
