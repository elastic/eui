import React, { Component } from 'react';

import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderAlert,
  EuiHeaderSectionItemButton,
  EuiNotificationBadge,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const button = (
      <EuiHeaderSectionItemButton
        aria-controls="headerUserMenu"
        aria-expanded={this.state.isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={this.onMenuButtonClick}>
        <EuiAvatar name="John Username" size="s" />

        <EuiNotificationBadge className="euiHeaderNotification">
          3
        </EuiNotificationBadge>
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id="headerUserMenu"
        ownFocus
        button={button}
        isOpen={this.state.isOpen}
        anchorPosition="downRight"
        closePopover={this.closeMenu}
        panelPaddingSize="none">
        <div style={{ width: 320 }}>
          <EuiFlexGroup
            gutterSize="m"
            className="euiHeaderProfile"
            responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiAvatar name="John Username" size="xl" />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiText>
                <p>John Username</p>
              </EuiText>

              <EuiSpacer size="m" />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink href="">Edit profile</EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      <EuiLink href="">Log out</EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiHeaderAlert
            title="Here&rsquo;s a notification title"
            text="I am the hat judge. Show me a hat and I will tell you if it&rsquo;s a good hat or bad hat."
            date="Nov. 14, 02:14PM."
          />

          <EuiHeaderAlert
            title="Here&rsquo;s a notification title that is extremely long and will wrap"
            text="I am the hat judge. Show me a hat and I will tell you if it&rsquo;s a good hat or bad hat."
            action={<EuiLink href="#">Download your thing here</EuiLink>}
            date="Nov. 14, 02:14PM."
          />

          <EuiHeaderAlert
            title="Here&rsquo;s a notification title"
            text="I am the hat judge. Show me a hat and I will tell you if it&rsquo;s a good hat or bad hat."
            action={<EuiLink href="#">Download your thing here</EuiLink>}
            date="Nov. 14, 02:14PM."
          />
        </div>
      </EuiPopover>
    );
  }
}
