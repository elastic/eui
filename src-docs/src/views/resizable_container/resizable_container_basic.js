import React from 'react';

import { EuiText, EuiResizableContainer } from '../../../../src';

const text = require('!!raw-loader!./lorem.txt');

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="30%">
          <EuiText>
            <p>{text}</p>
            <a href="">Hello world</a>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={50} minSize="200px">
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
