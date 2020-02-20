import React from 'react';

import { EuiText, EuiResizableContainer } from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(Panel, Resizer) => (
      <>
        <Panel initialSize={50} minSize="30%" scrollable>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>

        <Resizer />

        <Panel initialSize={50} minSize="200px" scrollable>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
