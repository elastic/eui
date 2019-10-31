import React, { Component, Fragment } from 'react';

import {
  EuiIcon,
  EuiHeaderAlert,
  EuiHeaderSectionItemButton,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiNotificationBadge,
  EuiLink,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiText,
  EuiBadge,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
      showBadge: true,
    };
  }

  closeFlyout = () => {
    this.setState({ isFlyoutVisible: false });
  };

  showFlyout = () => {
    this.setState({ showBadge: false });
    this.setState(prevState => ({
      isFlyoutVisible: !prevState.isFlyoutVisible,
    }));
  };

  render() {
    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="keyPadMenu"
        aria-expanded={this.state.isFlyoutVisible}
        aria-haspopup="true"
        aria-label="Apps menu"
        onClick={this.showFlyout}>
        <EuiIcon type="email" size="m" />

        {this.state.showBadge ? (
          <EuiNotificationBadge className="euiHeaderNotification">
            &#9642;
          </EuiNotificationBadge>
        ) : null}
      </EuiHeaderSectionItemButton>
    );

    let flyout;
    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          size="s"
          className="guideDemo__alertsFlyout"
          aria-labelledby="flyoutSmallTitle"
          style={{ top: '49px' }}>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="s">
              <h2 id="flyoutSmallTitle">What&apos;s new</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiHeaderAlert
              title="Control access to features"
              text="Show or hide applications and features per space in Kibana."
              action={
                <EuiLink href="/guides/feature-controls">
                  Learn about feature controls
                </EuiLink>
              }
              date="1 May 2019"
              badge={<EuiBadge>7.1</EuiBadge>}
            />
            <EuiHeaderAlert
              title="Kibana 7.0 is turning heads"
              text="Simplified navigation, responsive dashboards, dark mode… pick your favorite."
              action={
                <EuiLink
                  target="_blank"
                  href="https://www.elastic.co/blog/kibana-7-0-0-released">
                  Read the blog <EuiIcon type="popout" size="s" />
                </EuiLink>
              }
              date="10 April 2019"
              badge={<EuiBadge color="hollow">7.0</EuiBadge>}
            />
            <EuiHeaderAlert
              title="Enter dark mode"
              text="Kibana now supports the easy-on-the-eyes theme across the entire UI."
              action={<EuiLink href="#">Go to Advanced Settings</EuiLink>}
              date="10 April 2019"
              badge={<EuiBadge color="hollow">7.0</EuiBadge>}
            />
            <EuiHeaderAlert
              title="Pixel-perfect Canvas is production ready"
              text="Your creative space for visualizing data awaits."
              action={
                <EuiLink
                  target="_blank"
                  href="https://www.elastic.co/webinars/intro-to-canvas-a-new-way-to-tell-visual-stories-in-kibana">
                  Watch the webinar <EuiIcon type="popout" size="s" />
                </EuiLink>
              }
              date="26 March 2019"
              badge={<EuiBadge color="hollow">6.7</EuiBadge>}
            />
            <EuiHeaderAlert
              title="6.7 release notes"
              text="Stay up-to-date on the latest and greatest features."
              action={
                <EuiLink
                  target="_blank"
                  href="https://www.elastic.co/guide/en/kibana/6.7/release-notes-6.7.0.html">
                  Check out the docs <EuiIcon type="popout" size="s" />
                </EuiLink>
              }
              date="26 March 2019"
              badge={<EuiBadge color="hollow">6.7</EuiBadge>}
            />
            <EuiHeaderAlert
              title="Rollups made simple in Kibana"
              text="Save space and preserve the integrity of your data directly in the UI."
              action={
                <EuiLink
                  target="_blank"
                  href="https://www.elastic.co/blog/how-to-create-manage-and-visualize-elasticsearch-rollup-data-in-kibana">
                  Read the blog <EuiIcon type="popout" size="s" />
                </EuiLink>
              }
              date="10 January 2019"
              badge={<EuiBadge color="hollow">6.5</EuiBadge>}
            />
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  iconType="cross"
                  onClick={this.closeFlyout}
                  flush="left">
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText color="subdued" size="s">
                  <p>Version 7.0</p>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      );
    }

    return (
      <Fragment>
        {button}
        {flyout}
      </Fragment>
    );
  }
}
