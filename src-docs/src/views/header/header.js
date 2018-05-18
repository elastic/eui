import React, {
  Component,
} from 'react';

import {
  EuiHeader,
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
      <EuiHeaderLogo href="#" aria-label="Go to home page" />
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [{
      text: 'Management',
      href: '#',
      onClick: (e) => { e.preventDefault(); console.log('You clicked management'); },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass',
    }, {
      text: 'Truncation test is here for a really long item',
      href: '#',
      onClick: (e) => { e.preventDefault(); console.log('You clicked truncation test'); },
    }, {
      text: 'hidden',
      href: '#',
      onClick: (e) => { e.preventDefault(); console.log('You clicked hidden'); },
    }, {
      text: 'Users',
      href: '#',
      onClick: (e) => { e.preventDefault(); console.log('You clicked users'); },
    }, {
      text: 'Create',
    }];

    return (
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
    );
  }

  renderSearch() {
    return (
      <EuiHeaderSectionItemButton aria-label="Search">
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
