import React, { Component } from 'react';

import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
} from '../../../../src/components';

import HeaderAppMenu from './header_app_menu';
import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  renderLogo() {
    return (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#"
        aria-label="Go to home page"
      />
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked management');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked truncation test');
        },
      },
      {
        text: 'hidden',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked hidden');
        },
      },
      {
        text: 'Users',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked users');
        },
      },
      {
        text: 'Create',
      },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  renderSearch() {
    return (
      <EuiHeaderSectionItemButton aria-label="Search">
        <EuiIcon type="search" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  render() {
    return (
      <EuiHeader
        sections={{
          left: [
            {
              children: this.renderLogo(),
              border: 'none',
            },
            { children: <HeaderSpacesMenu /> },
            { children: this.renderBreadcrumbs() },
          ],
          right: [
            { children: this.renderSearch() },
            { children: <HeaderUserMenu /> },
            { children: <HeaderAppMenu /> },
          ],
        }}>
        Child here
      </EuiHeader>
    );
  }
}
