import React from 'react';

import { EuiText, EuiResizableContainer } from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel
          initialSize={100 / 3}
          minSize="50px"
          scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="l" />

        <EuiResizablePanel initialSize={100 / 3} scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="l" />

        <EuiResizablePanel
          initialSize={100 / 3}
          minSize="10%"
          scrollable={true}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
