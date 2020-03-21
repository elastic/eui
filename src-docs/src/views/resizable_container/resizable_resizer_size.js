import React from 'react';

import { EuiText, EuiCode, EuiResizableContainer } from '../../../../src';

export default () => (
  <EuiResizableContainer style={{ height: '200px' }}>
    {(Panel, Resizer) => (
      <>
        <Panel initialSize={35} minSize="100px" scrollable>
          <EuiText size="s">
            <p>
              The <EuiCode>Resizer</EuiCode> to the right of this{' '}
              <EuiCode>Panel</EuiCode> uses size <EuiCode>xl</EuiCode>
            </p>
          </EuiText>
        </Panel>

        <Resizer size="xl" />

        <Panel initialSize={25} scrollable>
          <EuiText size="s">
            <p>
              The <EuiCode>Resizer</EuiCode> to the right of this{' '}
              <EuiCode>Panel</EuiCode> uses size <EuiCode>l</EuiCode>
            </p>
          </EuiText>
        </Panel>

        <Resizer size="l" />

        <Panel initialSize={15} scrollable>
          <EuiText size="s">
            <p>
              The <EuiCode>Resizer</EuiCode> to the right of this{' '}
              <EuiCode>Panel</EuiCode> uses size <EuiCode>m</EuiCode>, which is
              the <strong>default</strong> size.
            </p>
          </EuiText>
        </Panel>

        <Resizer size="m" />

        <Panel initialSize={15} scrollable>
          <EuiText size="s">
            <p>
              The <EuiCode>Resizer</EuiCode> to the right of this{' '}
              <EuiCode>Panel</EuiCode> uses size <EuiCode>s</EuiCode>
            </p>
          </EuiText>
        </Panel>

        <Resizer size="s" />

        <Panel initialSize={10} minSize="100px" scrollable>
          <EuiText size="s">
            <p>
              This is the last <EuiCode>Panel</EuiCode>, so it is not followed
              by a <EuiCode>Resizer</EuiCode>
            </p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
