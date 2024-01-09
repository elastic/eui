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
  <EuiResizableContainer style={{ height: '300px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={50} minSize="50px" tabIndex={0}>
          <EuiText>{text}</EuiText>
        </EuiResizablePanel>

        <EuiResizableButton showIndicator={false} />

        <EuiResizablePanel
          initialSize={50}
          minSize="50px"
          tabIndex={0}
          paddingSize="none"
        >
          <EuiResizableContainer
            direction="vertical"
            style={{ height: '100%', overflow: 'hidden' }}
          >
            {(EuiResizablePanel, EuiResizableButton) => (
              <>
                <EuiResizablePanel initialSize={50} minSize="50px" tabIndex={0}>
                  <EuiText>{text}</EuiText>
                </EuiResizablePanel>

                <EuiResizableButton showIndicator={false} />

                <EuiResizablePanel initialSize={50} minSize="50px" tabIndex={0}>
                  <EuiText>{text}</EuiText>
                </EuiResizablePanel>
              </>
            )}
          </EuiResizableContainer>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
