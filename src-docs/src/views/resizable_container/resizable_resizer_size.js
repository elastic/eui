import React from 'react';

import { EuiText, EuiCode, EuiResizableContainer } from '../../../../src';

export default () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(EuiResizablePanel, EuiResizableButton) => (
      <>
        <EuiResizablePanel initialSize={35} minSize="100px">
          <EuiText size="s">
            <p>
              The <strong>EuiResizableButton</strong> to the right of this{' '}
              <strong>EuiResizablePanel</strong> uses size <EuiCode>xl</EuiCode>
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="xl" />

        <EuiResizablePanel initialSize={25}>
          <EuiText size="s">
            <p>
              The <strong>EuiResizableButton</strong> to the right of this{' '}
              <strong>EuiResizablePanel</strong> uses size <EuiCode>l</EuiCode>
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="l" />

        <EuiResizablePanel initialSize={15}>
          <EuiText size="s">
            <p>
              The <strong>EuiResizableButton</strong> to the right of this{' '}
              <strong>EuiResizablePanel</strong> uses size <EuiCode>m</EuiCode>,
              which is the <strong>default</strong> size.
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="m" />

        <EuiResizablePanel initialSize={15}>
          <EuiText size="s">
            <p>
              The <strong>EuiResizableButton</strong> to the right of this{' '}
              <strong>EuiResizablePanel</strong> uses size <EuiCode>s</EuiCode>
            </p>
          </EuiText>
        </EuiResizablePanel>

        <EuiResizableButton size="s" />

        <EuiResizablePanel initialSize={10} minSize="100px">
          <EuiText size="s">
            <p>
              This is the last <strong>EuiResizablePanel</strong>, so it is not
              followed by a <strong>EuiResizableButton</strong>
            </p>
          </EuiText>
        </EuiResizablePanel>
      </>
    )}
  </EuiResizableContainer>
);
