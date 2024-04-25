import React, { useState } from 'react';

import {
  EuiFlyoutResizable,
  EuiFlyoutProps,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiButtonGroup,
  EuiText,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutType, setFlyoutType] = useState('overlay');
  const [flyoutSide, setFlyoutSide] = useState('right');

  const flyoutTitleId = useGeneratedHtmlId({
    prefix: 'simpleFlyoutTitle',
  });

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyoutResizable
        type={flyoutType as EuiFlyoutProps['type']}
        side={flyoutSide as EuiFlyoutProps['side']}
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby={flyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={flyoutTitleId}>A resizable flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This flyout is resizable by both mouse drag and arrow keys (when
              the resizable edge is focused). Both push and overlay flyouts can
              be resizable, on either side.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiTitle size="xxs">
            <h3>Flyout type</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiButtonGroup
            legend="Flyout type"
            options={[
              { id: 'overlay', label: 'Overlay' },
              { id: 'push', label: 'Push' },
            ]}
            idSelected={flyoutType}
            onChange={(id) => setFlyoutType(id)}
          />
          <EuiSpacer />
          <EuiTitle size="xxs">
            <h3>Flyout side</h3>
          </EuiTitle>
          <EuiButtonGroup
            legend="Flyout side"
            options={[
              { id: 'right', label: 'Right' },
              { id: 'left', label: 'Left' },
            ]}
            idSelected={flyoutSide}
            onChange={(id) => setFlyoutSide(id)}
          />
        </EuiFlyoutBody>
      </EuiFlyoutResizable>
    );
  }

  return (
    <>
      <EuiButton onClick={() => setIsFlyoutVisible(true)}>
        Show resizable flyout
      </EuiButton>
      {flyout}
    </>
  );
};
