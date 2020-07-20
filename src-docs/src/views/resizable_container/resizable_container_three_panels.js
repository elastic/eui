import React from 'react';
import { EuiText, EuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = fake('{{lorem.paragraphs}}');

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={100 / 3} minSize="50px">
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="l" />

        <EuiResizablePanel initialSize={100 / 3}>
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="l" />

        <EuiResizablePanel initialSize={100 / 3} minSize="10%">
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
