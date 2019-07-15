import React, { Component } from 'react';

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

export class FlyoutMaxWidth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
      flyoutSize: 'm',
      flyoutMaxWidth: false,
    };

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout = (size = 'm', maxWidth = false) => {
    this.setState({
      flyoutSize: size,
      flyoutMaxWidth: maxWidth,
      isFlyoutVisible: true,
    });
  };

  render() {
    let flyout;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          aria-labelledby="flyoutMaxWidthTitle"
          size={this.state.flyoutSize}
          maxWidth={this.state.flyoutMaxWidth}>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutMaxWidthTitle">448px wide flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                In many cases, you&rsquo;ll want to set a custom width
                that&rsquo;s tailored to your content. In this case, the flyout
                is an ideal width for form elements.
              </p>
            </EuiText>

            <EuiSpacer />

            <EuiForm>
              <EuiFormRow
                label="Text field"
                helpText="I am some friendly help text.">
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
        <EuiLink color="secondary" onClick={() => this.showFlyout('s')}>
          Show <strong>small</strong> flyout with <strong>no max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('s', true)}>
          Show <strong>small</strong> flyout with{' '}
          <strong>default max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('s', 448)}>
          Show <strong>small</strong> flyout with{' '}
          <strong>larger custom max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="danger" onClick={() => this.showFlyout('s', 200)}>
          Show <strong>small</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth beats out except
          for on small screens
        </EuiLink>

        <EuiSpacer />

        <EuiLink color="secondary" onClick={() => this.showFlyout('m')}>
          Show <strong>medium</strong> flyout with <strong>no max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('m', true)}>
          Show <strong>medium</strong> flyout with{' '}
          <strong>default max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('m', 900)}>
          Show <strong>medium</strong> flyout with{' '}
          <strong>larger custom max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="danger" onClick={() => this.showFlyout('m', 200)}>
          Show <strong>medium</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth beats out
        </EuiLink>

        <EuiSpacer />

        <EuiLink color="secondary" onClick={() => this.showFlyout('l')}>
          Show <strong>large</strong> flyout with <strong>no max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('l', true)}>
          Show <strong>large</strong> flyout with{' '}
          <strong>default max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('l', 1600)}>
          Show <strong>large</strong> flyout with{' '}
          <strong>larger custom max-width</strong>
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="danger" onClick={() => this.showFlyout('l', 200)}>
          Show <strong>large</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth beats out
        </EuiLink>

        {flyout}
      </div>
    );
  }
}
