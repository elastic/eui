import React, {
  Component,
} from 'react';

import {
  EuiHeaderAlert,
  EuiFlexGroup,
  EuiFlexItem,
  EuiAvatar,
  EuiHeader,
  EuiHeaderBreadcrumb,
  EuiHeaderBreadcrumbCollapsed,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      isAppMenuOpen: false,
    };
  }

  onUserMenuButtonClick() {
    this.setState({
      isUserMenuOpen: !this.state.isUserMenuOpen,
    });
  }

  onAppMenuButtonClick() {
    this.setState({
      isAppMenuOpen: !this.state.isAppMenuOpen,
    });
  }

  closeUserMenu() {
    this.setState({
      isUserMenuOpen: false,
    });
  }

  closeAppMenu() {
    this.setState({
      isAppMenuOpen: false,
    });
  }

  renderLogo() {
    return (
      <EuiHeaderLogo href="#" />
    );
  }

  renderBreadcrumbs() {
    return (
      <EuiHeaderBreadcrumbs>
        <EuiHeaderBreadcrumb href="#">
          Management
        </EuiHeaderBreadcrumb>

        <EuiHeaderBreadcrumb href="#">
          Truncation test is here
        </EuiHeaderBreadcrumb>

        <EuiHeaderBreadcrumbCollapsed />

        <EuiHeaderBreadcrumb href="#">
          Users
        </EuiHeaderBreadcrumb>

        <EuiHeaderBreadcrumb href="#" isActive>
          Create
        </EuiHeaderBreadcrumb>
      </EuiHeaderBreadcrumbs>
    );
  }

  renderSearch() {
    return (
      <EuiHeaderSectionItemButton>
        <EuiIcon
          type="search"
          size="m"
        />
      </EuiHeaderSectionItemButton>
    );
  }

  renderUserMenu() {
    const button = (
      <EuiHeaderSectionItemButton onClick={this.onUserMenuButtonClick.bind(this)}>
        <EuiIcon
          type="user"
          size="m"
        />
        <span className="euiHeader__notification">
          3
        </span>
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={this.state.isUserMenuOpen}
        anchorPosition="downRight"
        closePopover={this.closeUserMenu.bind(this)}
        panelClassName="euiHeaderPopover"
      >
        <EuiFlexGroup gutterSize="m" className="euiHeaderProfile eui--flexRow eui--flexAlignItemsCenter">
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
      </EuiPopover>
    );
  }

  renderAppMenu() {
    const button = (
      <EuiHeaderSectionItemButton onClick={this.onAppMenuButtonClick.bind(this)}>
        <EuiIcon type="apps" size="m" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={this.state.isAppMenuOpen}
        anchorPosition="downRight"
        closePopover={this.closeAppMenu.bind(this)}
        panelClassName="euiHeaderPopover"
      >
        <EuiKeyPadMenu>
          <EuiKeyPadMenuItem
            label="Discover"
            href="#"
          >
            <EuiIcon type="discoverApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Dashboard"
            href="#"
          >
            <EuiIcon type="dashboardApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Dev Tools"
            href="#"
          >
            <EuiIcon type="devToolsApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Machine Learning"
            href="#"
          >
            <EuiIcon type="machineLearningApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Graph"
            href="#"
          >
            <EuiIcon type="graphApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Visualize"
            href="#"
          >
            <EuiIcon type="visualizeApp" size="l" />
          </EuiKeyPadMenuItem>

          <EuiKeyPadMenuItem
            label="Timelion"
            href="#"
          >
            <EuiIcon type="timelionApp" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </EuiPopover>
    );
  }

  render() {
    return (
      <EuiHeader>
        <EuiHeaderSection>
          <EuiHeaderSectionItem border="right">
            {this.renderLogo()}
          </EuiHeaderSectionItem>

          {this.renderBreadcrumbs()}
        </EuiHeaderSection>

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            {this.renderSearch()}
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
            {this.renderUserMenu()}
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
            {this.renderAppMenu()}
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    );
  }
}
