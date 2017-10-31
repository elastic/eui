import React, {
  Component,
} from 'react';

import {
  EuiHeader,
  EuiHeaderBreadcrumb,
  EuiHeaderBreadcrumbCollapsed,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
} from '../../../../src/components';

import HeaderAppMenu from './header_app_menu';
import HeaderUserMenu from './header_user_menu';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAppMenuOpen: false,
    };
  }

  onAppMenuButtonClick() {
    this.setState({
      isAppMenuOpen: !this.state.isAppMenuOpen,
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
            <HeaderUserMenu />
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem>
            <HeaderAppMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    );
  }
}
