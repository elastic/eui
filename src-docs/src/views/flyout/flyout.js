import React, {
  Component,
} from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiButton,
  EuiText,
} from '../../../../src/components';

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

    let flyout;
    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
        >
          <EuiFlyoutBody>
            <EuiText>
              <p>You can use ESC to close this panel, but we could also pass in a close button like so.</p>

              <EuiButton
                iconType="cross"
                onClick={this.closeFlyout}
              >
                Close me
              </EuiButton>
            </EuiText>
          </EuiFlyoutBody>
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
