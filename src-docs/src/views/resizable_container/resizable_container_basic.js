import React from 'react';
import { EuiText, EuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

export default () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="30%">
          <EuiText>
            <div>{text}</div>
            <a href="">Hello world</a>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={50} minSize="200px">
          <EuiText>{text}</EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
