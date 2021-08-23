import React, { useState } from 'react';

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiButton,
  EuiTitle,
  EuiFormRow,
  EuiButtonGroup,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [size, setSize] = useState('l');
  const [sizeName, setSizeName] = useState('large');

  const sizes = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
    {
      id: 'l',
      label: 'Large',
    },
    {
      id: '400px',
      label: 'Fixed (400)',
    },
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        size={size}
        aria-labelledby="flyoutLargeTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutLargeTitle">A {sizeName.toLowerCase()} flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiFormRow label="Change the paddingSize">
            <EuiButtonGroup
              legend="Flyout size"
              color="primary"
              size="s"
              options={sizes}
              idSelected={size}
              onChange={(id) => {
                const newName = sizes
                  .find((size) => size.id === id)
                  .label.toLowerCase();
                setSize(id);
                setSizeName(newName);
              }}
            />
          </EuiFormRow>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiButton onClick={showFlyout}>Show flyout to test widths</EuiButton>
      {flyout}
    </div>
  );
};
