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
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="30%" tabIndex={0}>
          <EuiText>
            <div>{text}</div>
            <a href="">Hello world</a>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={50} minSize="200px" tabIndex={0}>
          <EuiText>{text}</EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
