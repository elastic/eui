import React from 'react';

import { EuiText, EuiResizableContainer } from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '600px' }} direction="vertical">
    {(Panel, Resizer) => (
      <>
        <Panel initialSize={60} minSize="40%" scrollable>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>

        <Resizer size="xl" />

        <Panel initialSize={40} minSize="10%" scrollable>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
