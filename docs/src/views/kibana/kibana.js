import React, {
  cloneElement,
  Component,
} from 'react';

import {
  EuiAvatar,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumb,
  EuiHeaderBreadcrumbCollapsed,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiGlobalToastList,
  EuiGlobalToastListItem,
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
  EuiToast,
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiHeaderAlert,
} from '../../../../src/components';

import {
  Table,
} from '../../views/table/table';

const TOAST_LIFE_TIME_MS = 4000;
const TOAST_FADE_OUT_MS = 250;
let toastIdCounter = 0;
const timeoutIds = [];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      isAppMenuOpen: false,
      isSideNavOpenOnMobile: false,
      toasts: [],
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

  onAddToastClick() {
    const {
      toast,
      toastId,
    } = this.renderRandomToast();

    this.setState({
      toasts: this.state.toasts.concat(toast),
    });

    this.scheduleToastForDismissal(toastId);
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

  scheduleToastForDismissal(toastId, isImmediate = false) {
    const lifeTime = isImmediate ? TOAST_FADE_OUT_MS : TOAST_LIFE_TIME_MS;

    timeoutIds.push(setTimeout(() => {
      this.dismissToast(toastId);
    }, lifeTime));

    timeoutIds.push(setTimeout(() => {
      this.startDismissingToast(toastId);
    }, lifeTime - TOAST_FADE_OUT_MS));
  }

  startDismissingToast(toastId) {
    this.setState({
      toasts: this.state.toasts.map(toast => {
        if (toast.key === toastId) {
          return cloneElement(toast, {
            isDismissed: true,
          });
        }

        return toast;
      }),
    });
  }

  dismissToast(toastId) {
    this.setState({
      toasts: this.state.toasts.filter(toast => toast.key !== toastId),
    });
  }

  onDeleteAllToasts() {
    this.setState({
      toasts: [],
    });
  }

  componentWillUnmount() {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
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

          <EuiSideNavItem isSelected>
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
                  <h2>Watches</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="m">
                  <EuiFlexItem>
                    <EuiButton
                      onClick={this.onAddToastClick.bind(this)}
                      size="s"
                    >
                      Add toast
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton
                      color="danger"
                      onClick={this.onDeleteAllToasts.bind(this)}
                      size="s"
                    >
                      Clear toasts
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <Table />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }

  renderRandomToast() {
    const toastId = (toastIdCounter++).toString();
    const dismissToast = this.scheduleToastForDismissal.bind(this, toastId, true);

    const toasts = [(
      <EuiToast
        title="Check it out, here's a really long title that will wrap within a narrower browser"
        onClose={dismissToast}
      >
        <p>
          Here&rsquo;s some stuff that you need to know. We can make this text really long so that,
          when viewed within a browser that&rsquo;s fairly narrow, it will wrap, too.
        </p>
        <p>
          And some other stuff on another line, just for kicks. And <EuiLink href="#">here&rsquo;s a link</EuiLink>.
        </p>
      </EuiToast>
    ), (
      <EuiToast
        title="Download complete!"
        color="success"
        onClose={dismissToast}
      >
        <p>
          Thanks for your patience!
        </p>
      </EuiToast>
    ), (
      <EuiToast
        title="Logging you out soon, due to inactivity"
        color="warning"
        iconType="user"
        onClose={dismissToast}
      >
        <p>
          This is a security measure.
        </p>
        <p>
          Please move your mouse to show that you&rsquo;re still using Kibana.
        </p>
      </EuiToast>
    ), (
      <EuiToast
        title="Oops, there was an error"
        color="danger"
        iconType="help"
        onClose={dismissToast}
      >
        <p>
          Sorry. We&rsquo;ll try not to let it happen it again.
        </p>
      </EuiToast>
    )];

    const toast = (
      <EuiGlobalToastListItem key={toastId}>
        {toasts[Math.floor(Math.random() * toasts.length)]}
      </EuiGlobalToastListItem>
    );

    return { toast, toastId };
  }

  renderToasts() {
    return (
      <EuiGlobalToastList>
        {this.state.toasts}
      </EuiGlobalToastList>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderPage()}
        {this.renderToasts()}
      </div>
    );
  }
}
