import React from 'react';
import { EuiText, EuiResizableContainer } from '../../../../src/components';
import { faker } from '@faker-js/faker';

const text = (
  <>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
  </>
);
export default () => (
  <EuiResizableContainer style={{ height: '400px' }} direction="vertical">
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={60} minSize="40%" tabIndex={0}>
          <EuiText>
            <div>{text}</div>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={40} minSize="10%" tabIndex={0}>
          <EuiText>
            <div>{text}</div>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
