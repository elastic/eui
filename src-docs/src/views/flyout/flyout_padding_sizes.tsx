import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutProps,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiButtonGroup,
  EuiButton,
  EuiFormRow,
  EuiTitle,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [paddingSize, setPaddingSize] = useState('l');
  const [paddingSizeName, setPaddingSizeName] = useState('large');
  const mediumPaddingFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'mediumPaddingFlyoutTitle',
  });
  const mediumPaddingFlyoutId = useGeneratedHtmlId({
    prefix: 'mediumPaddingFlyout',
  });

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
        paddingSize={paddingSize as EuiFlyoutProps['paddingSize']}
        id={mediumPaddingFlyoutId}
        aria-labelledby={mediumPaddingFlyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={mediumPaddingFlyoutTitleId}>
              A flyout with a {paddingSizeName} padding
            </h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={callOut}>
          <EuiFormRow label="Change the paddingSize">
            {/* @ts-ignore - EuiButtonGroup is not correctly detecting type="single" */}
            <EuiButtonGroup
              legend="Flyout paddingSize"
              color="primary"
              buttonSize="s"
              options={sizes}
              idSelected={paddingSize}
              onChange={(id: string) => {
                const newName = sizes
                  .find((size) => size.id === id)!
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
