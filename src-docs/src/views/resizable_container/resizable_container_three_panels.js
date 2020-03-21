import React from 'react';

import { EuiText, EuiResizableContainer } from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(Panel, Resizer) => (
      <>
        <Panel initialSize={100 / 3} minSize="50px" scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>

        <Resizer size="l" />

        <Panel initialSize={100 / 3} scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>

        <Resizer size="l" />

        <Panel initialSize={100 / 3} minSize="10%" scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
