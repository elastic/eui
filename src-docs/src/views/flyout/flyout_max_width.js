import React, { useState } from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiLink,
  EuiText,
  EuiTitle,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutSize, setFlyoutSize] = useState('m');
  const [flyoutMaxWidth, setFlyoutMaxWidth] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = (size = 'm', maxWidth = false) => {
    setFlyoutSize(size);
    setFlyoutMaxWidth(maxWidth);
    setIsFlyoutVisible(true);
  };

  let flyout;

  if (isFlyoutVisible) {
    let maxWidthTitle;
    switch (flyoutMaxWidth) {
      case true:
        maxWidthTitle = 'Default';
        break;
      case false:
        maxWidthTitle = 'No';
        break;
      default:
        maxWidthTitle = `${flyoutMaxWidth}px`;
        break;
    }

    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        aria-labelledby="flyoutMaxWidthTitle"
        size={flyoutSize}
        maxWidth={flyoutMaxWidth}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutMaxWidthTitle">{maxWidthTitle} maxWidth</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              In many cases, you&rsquo;ll want to set a custom width
              that&rsquo;s tailored to your content. In this case, the flyout is
              an ideal width for form elements.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiForm component="form">
            <EuiFormRow
              label="Text field"
              helpText="I am some friendly help text."
            >
              <EuiFieldText name="first" />
            </EuiFormRow>

            <EuiFormRow label="Select (with no initial selection)">
              <EuiSelect
                hasNoInitialSelection
                options={[
                  { value: 'option_one', text: 'Option one' },
                  { value: 'option_two', text: 'Option two' },
                  { value: 'option_three', text: 'Option three' },
                ]}
              />
            </EuiFormRow>

            <EuiFormRow label="File picker">
              <EuiFilePicker />
            </EuiFormRow>

            <EuiFormRow label="Range">
              <EuiRange min={0} max={100} name="range" id="range" />
            </EuiFormRow>
          </EuiForm>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiLink color="success" onClick={() => showFlyout('s')}>
        Show <strong>small</strong> flyout with <strong>no max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout('s', true)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>default max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="danger" onClick={() => showFlyout('s', 200)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins except for on
        small screens
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="danger" onClick={() => showFlyout('s', 448)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>larger custom max-width</strong> -- minWidth wins except for on
        small screens
      </EuiLink>

      <EuiSpacer />

      <EuiLink color="success" onClick={() => showFlyout('m')}>
        Show <strong>medium</strong> flyout with <strong>no max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout('m', true)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>default max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="danger" onClick={() => showFlyout('m', 448)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout('m', 900)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </EuiLink>

      <EuiSpacer />

      <EuiLink color="success" onClick={() => showFlyout('l')}>
        Show <strong>large</strong> flyout with <strong>no max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout('l', true)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>default max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="danger" onClick={() => showFlyout('l', 448)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout('l', 1600)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </EuiLink>

      <EuiSpacer />

      <EuiLink color="success" onClick={() => showFlyout(240)}>
        Show <strong>240</strong> flyout with <strong>no max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout(240, true)}>
        Show <strong>240</strong> flyout with <strong>default max-width</strong>
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="danger" onClick={() => showFlyout(240, 110)}>
        Show <strong>240</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- max-width wins but width
        wins on small screens
      </EuiLink>
      <EuiSpacer size="s" />
      <EuiLink color="success" onClick={() => showFlyout(240, 1600)}>
        Show <strong>240</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </EuiLink>

      <EuiSpacer />

      <EuiLink color="primary" onClick={() => showFlyout('m', 0)}>
        Trick for forms: <strong>Medium</strong> flyout with{' '}
        <strong>0 as max-width</strong>
      </EuiLink>

      {flyout}
    </div>
  );
};
