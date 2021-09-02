import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiResizableContainer,
  EuiPanel,
} from '../../../../src/components';

export default () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={20} color="subdued">
          <EuiText size="s">
            <p>
              This <strong>EuiResizablePanel</strong> changes the background
              with <EuiCode>{'color="subdued"'}</EuiCode>.
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel
          initialSize={40}
          color="plain"
          hasShadow
          borderRadius="m"
          wrapperPadding="m"
          minSize="20%"
        >
          <EuiText size="s">
            <p>
              This <strong>EuiResizablePanel</strong> resets most of the{' '}
              <strong>EuiPanel</strong> props back to default with{' '}
              <EuiCode>{'color="plain" hasShadow borderRadius="m"'}</EuiCode>.
            </p>
            <p>
              It also adds padding to the wrapping div with{' '}
              <EuiCode>{'wrapperPadding="m"'}</EuiCode> to maintain the scroll{' '}
              <strong>inside</strong> the panel.
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel initialSize={40} color="subdued">
          <EuiPanel>
            <EuiText size="s">
              <p>
                This <strong>EuiResizablePanel</strong> also changes the
                background color but adds an internal <strong>EuiPanel</strong>{' '}
                that will not stretch and will scroll within the{' '}
                <strong>EuiResizablePanel</strong>.
              </p>
            </EuiText>
          </EuiPanel>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
