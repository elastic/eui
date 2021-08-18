import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiButtonGroup,
  EuiButton,
  EuiFormRow,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [paddingSize, setPaddingSize] = useState('l');
  const [paddingSizeName, setPaddingSizeName] = useState('large');

  const sizes = [
    {
      id: 'none',
      label: 'None',
    },
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
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  const callOut = (
    <EuiCallOut
      title={`The banner left and right padding is ${paddingSizeName} to match that of flyout`}
    />
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        paddingSize={paddingSize}
        id="flyoutMediumPadding"
        aria-labelledby="flyoutMediumPaddingTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutMediumPaddingTitle">
              A flyout with a {paddingSizeName} padding
            </h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={callOut}>
          <EuiFormRow label="Change the paddingSize">
            <EuiButtonGroup
              legend="Flyout paddingSize"
              color="primary"
              size="s"
              options={sizes}
              idSelected={paddingSize}
              onChange={(id) => {
                const newName = sizes
                  .find((size) => size.id === id)
                  .label.toLowerCase();
                setPaddingSize(id);
                setPaddingSizeName(newName);
              }}
            />
          </EuiFormRow>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={closeFlyout} fill>
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }
  return (
    <>
      <EuiButton
        onClick={showFlyout}
        aria-controls="flyoutMediumPadding"
        aria-expanded={isFlyoutVisible}
        aria-haspopup="true"
        aria-label="Show padding size flyout"
      >
        Show flyout to test padding sizes
      </EuiButton>
      {flyout}
    </>
  );
};
