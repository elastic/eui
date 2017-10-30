import React, {
  Component,
} from 'react';

import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderBreadcrumb,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiPopover,
  EuiSideNav,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiSpacer,
  EuiTitle,
  EuiCallOut,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiBottomBar,
  EuiButtonEmpty,
  EuiText,
  EuiTextColor,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      isAppMenuOpen: false,
      isSideNavOpenOnMobile: false,
      showBar: false,
    };
  }

  handleFormChange() {
    this.setState({
      showBar: !this.state.showBar,
    });
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

  toggleOpenOnMobile() {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
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

        <EuiHeaderBreadcrumb href="#" isActive>
          Advanced settings
        </EuiHeaderBreadcrumb>
      </EuiHeaderBreadcrumbs>
    );
  }

  renderSearch() {
    return (
      <EuiHeaderSectionItemButton>
        <EuiIcon type="search" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderUserMenu() {
    const button = (
      <EuiHeaderSectionItemButton onClick={this.onUserMenuButtonClick.bind(this)}>
        <EuiIcon type="user" size="m" />
        <span className="euiHeader__notification">3</span>
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

  renderHeader() {
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

  renderForm() {
    return (
      <EuiForm>
        <EuiFormRow
          id="blargh1"
          label="query:queryString:options"
          helpText={
            <div>
              <span>Options for the lucene query string parser. </span>
              <EuiLink href="">
                Reset
              </EuiLink>
            </div>
          }
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="analyze_wildcard: true" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh2"
          label="sort:options"
          helpText="Options for the Elasticsearch sort parameter"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="unmapped_type: boolean" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat"
          helpText="When displaying a pretty formatted date, use this format"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="MMMM Do YYYY, HH:mm:ss.SSS" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat:tz"
          helpText="Which timezone should be used. 'Browser' will use the timezone detected by your browser."
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="Browser" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="dateFormat:dow"
          helpText="What day should weeks start on?"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="Sunday" />
        </EuiFormRow>

        <EuiFormRow
          id="blargh3"
          label="defaultIndex (Default: null) "
          helpText="The index to access if no index is set"
        >
          <EuiFieldText onChange={this.handleFormChange.bind(this)} value="null" />
        </EuiFormRow>
      </EuiForm>
    );
  }
  renderSideNav() {
    return (
      <EuiPageSideBar>
        <EuiSideNav
          mobileTitle="Navigate within Management"
          toggleOpenOnMobile={this.toggleOpenOnMobile.bind(this)}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        >
          {/* Elasticsearch section */}

          <EuiSideNavTitle>
            Elasticsearch
          </EuiSideNavTitle>

          <EuiSideNavItem>
            <button onClick={() => window.alert('Button clicked')}>
              Data sources
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <a href="http://www.elastic.co">
              Users
            </a>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Roles
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Watches
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Extremely long title will become truncated when the browser is narrow enough
            </button>
          </EuiSideNavItem>

          {/* Kibana section */}

          <EuiSideNavTitle>
            Kibana
          </EuiSideNavTitle>

          <EuiSideNavItem isSelected>
            <button>
              Advanced settings
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem indent isSelected>
            <button>
              General
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem indent>
            <button>
              Notifications
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem indent>
            <button>
              Timelion
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem indent>
            <button>
              Visualizations
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Index Patterns
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Saved Objects
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Reporting
            </button>
          </EuiSideNavItem>

          {/* Logstash section */}

          <EuiSideNavTitle>
            Logstash
          </EuiSideNavTitle>

          <EuiSideNavItem>
            <button>
              Pipeline Viewer
            </button>
          </EuiSideNavItem>
        </EuiSideNav>
      </EuiPageSideBar>
    );
  }

  renderPage() {

    return (
      <EuiPage>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Management</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageBody>
          {this.renderSideNav()}
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Advanced settings &raquo; General</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiCallOut
                title="Proceed with caution!"
                type="warning"
              >
                <p>
                  Tweaks you make here can break Kibana if you do not know what you are doing.
                </p>
              </EuiCallOut>
              <EuiSpacer size="l" />
              {this.renderForm()}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }


  render() {

    let bottomBar;
    if (this.state.showBar) {
      bottomBar = (
        <EuiBottomBar>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>
                <p>
                  <EuiTextColor color="ghost">
                    You have unsaved changes in your form.
                  </EuiTextColor>
                </p>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty color="ghost" size="s" iconType="check">Save</EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty color="ghost" size="s" iconType="cross">Discard</EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      );
    }

    return (
      <div>
        {this.renderHeader()}
        {this.renderPage()}
        {bottomBar}
      </div>
    );
  }
}
