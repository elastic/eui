import React, {
  Component,
} from 'react';

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiButton,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

export class FlyoutSize extends Component {
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
          ownFocus
          onClose={this.closeFlyout}
          size="s"
          aria-labelledby="flyoutSizeTitle"
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="s">
              <h1 id="flyoutSizeTitle">
                A small flyout
              </h1>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                In small flyouts, it is ok to reduce the header size to <code>s</code>.
              </p>
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
