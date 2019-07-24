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
      let maxWidthTitle;
      switch (this.state.flyoutMaxWidth) {
        case true:
          maxWidthTitle = 'Default';
          break;
        case false:
          maxWidthTitle = 'No';
          break;
        default:
          maxWidthTitle = `${this.state.flyoutMaxWidth}px`;
          break;
      }

      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          aria-labelledby="flyoutMaxWidthTitle"
          size={this.state.flyoutSize}
          maxWidth={this.state.flyoutMaxWidth}>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutMaxWidthTitle">{maxWidthTitle} maxWidth</h2>
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
        <EuiLink color="danger" onClick={() => this.showFlyout('s', 200)}>
          Show <strong>small</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth wins except for
          on small screens
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="danger" onClick={() => this.showFlyout('s', 448)}>
          Show <strong>small</strong> flyout with{' '}
          <strong>larger custom max-width</strong> -- minWidth wins except for
          on small screens
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
        <EuiLink color="danger" onClick={() => this.showFlyout('m', 448)}>
          Show <strong>medium</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth wins and full
          100vw wins on small screens
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('m', 900)}>
          Show <strong>medium</strong> flyout with{' '}
          <strong>larger custom max-width</strong>
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
        <EuiLink color="danger" onClick={() => this.showFlyout('l', 448)}>
          Show <strong>large</strong> flyout with{' '}
          <strong>smaller custom max-width</strong> -- minWidth wins and full
          100vw wins on small screens
        </EuiLink>
        <EuiSpacer size="s" />
        <EuiLink color="secondary" onClick={() => this.showFlyout('l', 1600)}>
          Show <strong>large</strong> flyout with{' '}
          <strong>larger custom max-width</strong>
        </EuiLink>

        <EuiSpacer />

        <EuiLink color="primary" onClick={() => this.showFlyout('m', 0)}>
          Trick for forms: <strong>Medium</strong> flyout with{' '}
          <strong>0 as max-width</strong>
        </EuiLink>

        {flyout}
      </div>
    );
  }
}
