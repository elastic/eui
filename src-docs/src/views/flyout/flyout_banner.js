import React, { Component } from 'react';

import {
  EuiCallOut,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiIcon,
  EuiLink,
  EuiButton,
  EuiText,
  EuiTextColor,
  EuiTitle,
} from '../../../../src/components';

export class FlyoutWithBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
    };

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    let flyout;

    const callOut = (
      <EuiCallOut>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiIcon type="help" />
          </EuiFlexItem>
          <EuiFlexItem>
            {' '}
            <EuiTextColor color="subdued">
              Here&rsquo;s some stuff that you need to know. This banner helps
              highlight important information.
            </EuiTextColor>
            <EuiLink href="#">View docs</EuiLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiCallOut>
    );

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          aria-labelledby="flyoutWithBannerTitle">
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutWithBannerTitle">A flyout with a banner</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody banner={callOut}>
            <EuiText>
              <p>
                This flyout is using the banner prop in{' '}
                <EuiCode>EuiFlyoutBody</EuiCode>.
              </p>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showFlyout}>Show flyout with banner</EuiButton>
        {flyout}
      </div>
    );
  }
}
