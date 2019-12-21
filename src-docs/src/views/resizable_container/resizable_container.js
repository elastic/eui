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
  <EuiResizableContainer style={{ height: '400px' }}>
    {(Panel, Resizer) => (
      <>
        <Panel
          initialSize={50}
          style={{
            minWidth: '30%',
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

        <Panel initialSize={50} style={{ minWidth: '35%' }} scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
