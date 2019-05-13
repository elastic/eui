import React, { Component } from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
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
      isSwitchChecked: true,
    };

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    let flyout;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          aria-labelledby="flyoutMaxWidthTitle"
          maxWidth={448}>
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
        <EuiButton onClick={this.showFlyout}>Show max-width flyout</EuiButton>

        {flyout}
      </div>
    );
  }
}
