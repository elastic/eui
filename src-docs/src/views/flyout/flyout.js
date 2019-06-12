import React, { Component } from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
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
  };

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    let flyout;

    const htmlCode = `<EuiFlyout ...>
  <EuiFlyoutHeader hasBorder>
    <EuiTitle size="m">
      <h2></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    ...
  </EuiFlyoutBody>
</EuiFlyout>
`;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout onClose={this.closeFlyout} aria-labelledby="flyoutTitle">
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutTitle">A typical flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                For consistency across the many flyouts, please utilize the
                following code for implementing the flyout with a header.
              </p>
            </EuiText>
            <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>
          </EuiFlyoutBody>
        </EuiFlyout>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.showFlyout}>Show flyout</EuiButton>

        {flyout}
      </div>
    );
  }
}
