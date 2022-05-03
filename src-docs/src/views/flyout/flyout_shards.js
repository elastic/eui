import React, { useState, useRef } from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiTitle,
  EuiFlyoutFooter,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isFlyoutVisible2, setIsFlyoutVisible2] = useState(false);
  const shardsFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'shardsFlyoutTitle',
  });

  const buttonRef = useRef();

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        size="s"
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby={shardsFlyoutTitleId}
        ownFocus={false}
        outsideClickCloses
        focusTrapProps={{ shards: [buttonRef], closeOnMouseup: false }}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={shardsFlyoutTitleId}>focusTrapProps.shards</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody />
        <EuiFlyoutFooter>
          <EuiButton onClick={() => setIsFlyoutVisible(false)}>Close</EuiButton>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  let flyout2;

  if (isFlyoutVisible2) {
    flyout = (
      <EuiFlyout
        size="s"
        onClose={() => setIsFlyoutVisible2(false)}
        aria-labelledby={shardsFlyoutTitleId}
        ownFocus={false}
        outsideClickCloses
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={shardsFlyoutTitleId}>closeOnMouseup</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody />
        <EuiFlyoutFooter>
          <EuiButton onClick={() => setIsFlyoutVisible2(false)}>
            Close
          </EuiButton>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  return (
    <div>
      <EuiButton
        buttonRef={buttonRef}
        onClick={() => setIsFlyoutVisible(!isFlyoutVisible)}
      >
        Toggle flyout with shards
      </EuiButton>
      {flyout}
      <EuiButton onClick={() => setIsFlyoutVisible2(!isFlyoutVisible2)}>
        Toggle flyout using closeOnMouseup
      </EuiButton>
      {flyout2}
    </div>
  );
};
