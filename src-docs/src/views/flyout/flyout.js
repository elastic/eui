import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
  EuiRange,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

export class Flyout extends Component {
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
  }

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    const formSample = (
      <EuiForm>
        <EuiFormRow>
          <EuiSwitch
            id={makeId()}
            name="popswitch"
            label="Isn't this flyout form cool?"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="A text field"
        >
          <EuiFieldText name="popfirst" />
        </EuiFormRow>

        <EuiFormRow
          id={makeId()}
          label="Range"
          helpText="Some help text for the range"
        >
          <EuiRange
            min={0}
            max={100}
            name="poprange"
          />
        </EuiFormRow>
      </EuiForm>
    );


    let flyout;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          ownFocus
          onClose={this.closeFlyout}
        >
          <EuiFlyoutHeader>
            <EuiTitle>
              <h2>
                Flyout header
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {formSample}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  iconType="cross"
                  onClick={this.closeFlyout}
                >
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  onClick={this.closeFlyout}
                  fill
                >
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showFlyout}>
          Show Flyout
        </EuiButton>

        {flyout}
      </div>
    );
  }
}
