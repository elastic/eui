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
        <EuiResizablePanel
          initialSize={15}
          color="subdued"
          minSize="1%"
          maxSize="150px">
          <EuiText size="s">
            <p>
              This <strong>EuiResizablePanel</strong> is set to a small
              <EuiCode>{'maxSize'}</EuiCode>.
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel
          initialSize="grow"
          color="plain"
          hasShadow
          borderRadius="m"
          wrapperPadding="m"
          minSize="20%">
          <EuiText size="s">
            <p>
              This <strong>EuiResizablePanel</strong> is set to
              <EuiCode>{'initialSize="grow"'}</EuiCode>.
            </p>
            <p>
              It will occupy all remaining space left by its sibling panels.
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton />

        <EuiResizablePanel
          initialSize="300px"
          color="subdued"
          minSize="100px"
          maxSize="50%">
          <EuiPanel>
            <EuiText size="s">
              <p>
                This <strong>EuiResizablePanel</strong> sets its{' '}
                <EuiCode>{'initialSize'}</EuiCode> in pixels.
              </p>
            </EuiText>
          </EuiPanel>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
