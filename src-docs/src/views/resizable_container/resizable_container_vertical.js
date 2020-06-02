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
  <EuiResizableContainer style={{ height: '600px' }} direction="vertical">
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={60} minSize="40%">
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="xl" />

        <EuiResizablePanel initialSize={40} minSize="10%">
          <EuiText>
            <p>{text}</p>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
